import db from "../store/database"

export const findAllTasks = async (): Promise<Task[]> => {
  const qr = await db.query("SELECT * FROM tasks")
  return qr.rows
}

export const findTasksById = async (ids: uuid[]): Promise<Task[]> => {
  const sql = `SELECT * FROM tasks WHERE task_id IN (${idx(ids)})`
  const qr = await db.query(sql, ids)
  return qr.rows
}

export const deleteTasksById = async (ids: uuid[]): Promise<number> => {
  const sql = `DELETE FROM tasks WHERE task_id IN (${idx(ids)})`
  const qr = await db.query(sql, ids)
  return qr.rowCount ?? 0
}

export const createTask = async (task: Task): Promise<uuid> => {
  const qr = await db.query(
    "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING task_id",
    [task.title, task.description, task.completed ?? false],
  )
  return qr.rows[0].task_id
}

export const updateTask = async (id: uuid, task: Task): Promise<boolean> => {
  const [keys, vals] = [Object.keys(task).join(","), Object.values(task)]
  const qr = await db.query(
    `UPDATE tasks SET (${keys}) = ROW(${idx(vals)}) WHERE task_id = $${vals.length + 1}`,
    vals.concat([id]),
  )
  return qr.rowCount === 1
}

export interface Task {
  task_id: uuid
  title?: string
  description?: string
  completed: boolean
  created_at: Date
}

export type uuid = string
const idx = (arr: unknown[]) => arr.map((v, i) => `$${i + 1}`).join(",")
