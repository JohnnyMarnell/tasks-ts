import { Handler } from "express"
import { db } from "../database"

export const getTasks: Handler = async (req, res) => {
  const qr = await db.query("SELECT * FROM tasks")
  return res.status(200).json(qr.rows)
}

export const getTaskById: Handler = async (req, res) => {
  const { id } = req.params
  const qr = await db.query("SELECT * FROM tasks WHERE task_id = $1", [id])
  return qr.rowCount ? res.json(qr.rows) : res.status(404).send()
}

export const createTask: Handler = async (req, res) => {
  const { title, description, completed } = req.body
  const qr = await db.query(
    "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING task_id",
    [title, description, completed || false],
  )
  return res.status(201).json({ id: qr.rows[0].task_id })
}

// Todo handle selective updates
export const updateTask: Handler = async (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body
  const qr = await db.query(
    "UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE task_id = $4",
    [title, description, completed, id],
  )
  return res.status(qr.rowCount ? 200 : 404).send()
}

export const deleteTask: Handler = async (req, res) => {
  const { id } = req.params
  const qr = await db.query("DELETE FROM tasks WHERE task_id = $1", [id])

  return res.status(qr.rowCount ? 204 : 404).send()
}
