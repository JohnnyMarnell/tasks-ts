import db from "../store/database"

export const findAllTasks = async (): Promise<Task[]> => {
  const qr = await db.query("SELECT * FROM tasks")
  return qr.rows.map(mapTask)
}

export const findTasksById = async (ids: string[]): Promise<Task[]> => {
  const sql = `SELECT * FROM tasks WHERE task_id IN (${idx(ids)})`
  const qr = await db.query(sql, ids)
  return qr.rows.map(mapTask)
}

export const deleteTasksById = async (ids: string[]): Promise<number> => {
  const sql = `DELETE FROM tasks WHERE task_id IN (${idx(ids)})`
  const qr = await db.query(sql, ids)
  return qr.rowCount ?? 0
}

export const createTask = async (task: Task): Promise<string> => {
  const t = new TaskEntity(task)
  const qr = await db.query(
    "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING task_id",
    [t.title, t.description, t.completed],
  )
  return qr.rows[0].task_id
}

export const updateTask = async (id: string, task: Task): Promise<boolean> => {
  const [keys, vals] = [Object.keys(task).join(","), Object.values(task)]
  const qr = await db.query(
    `UPDATE tasks SET (${keys}) = ROW(${idx(vals)}) WHERE task_id = $${vals.length + 1}`,
    vals.concat([id]),
  )
  return qr.rowCount === 1
}

export interface Task {
  task_id: string | null
  title: string | null
  description: string | null
  completed: boolean
}

export class TaskEntity implements Task {
  readonly task_id: string | null
  readonly title: string | null
  readonly description: string | null
  readonly completed: boolean

  constructor(opts: TaskEntity) {
    this.task_id = opts.task_id
    this.title = opts.title
    this.description = opts.description
    this.completed = opts.completed ?? false
  }
}

const idx = (arr: any[]) => arr.map((v, i) => `$${i + 1}`).join(",")
const mapTask = (row: Task) => new TaskEntity(row)
