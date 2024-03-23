import db from "../store/database"

export interface ITask {
  task_id: string | null
  title: string | null
  description: string | null
}

export class Task implements ITask {
  readonly task_id: string | null
  readonly title: string | null
  readonly description: string | null

  constructor(opts: Task) {
    this.task_id = opts.task_id
    this.title = opts.title
    this.description = opts.description
  }
}

const mapTask = (row: ITask): Task => {
  const task = new Task(row)
  return task
}

export const findAllTasks = async () => {
  return (await db.query("SELECT * FROM tasks")).rows.map(mapTask)
}
