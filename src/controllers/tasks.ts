import { Handler } from "express"
import { db } from "../database"

export const getTasks: Handler = async (req, res) => {
  const qr = await db.query("SELECT * FROM tasks")
  return res.status(200).json(qr.rows)
}

export const getTaskById: Handler = async (req, res) => {
  const { id } = req.params
  const qr = await db.query("SELECT * FROM tasks WHERE task_id = $1", [id])
  return qr.rowCount ? res.json(qr.rows[0]) : res.status(404).send()
}

export const createTask: Handler = async (req, res) => {
  const { title, description, completed } = req.body
  if (!title || !description) {
    return res.status(400).send()
  }

  const qr = await db.query(
    "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING task_id",
    [title, description, completed || false],
  )
  return res.status(201).json({ task_id: qr.rows[0].task_id })
}

export const updateTask: Handler = async (req, res) => {
  const { id } = req.params
  const keys = Object.keys(req.body).join(",")
  const vals = Object.values(req.body)
  const idx = vals.map((v, i) => `$${i + 1}`).join(",")
  const qr = await db.query(
    `UPDATE tasks SET (${keys}) = (${idx}) WHERE task_id = $${vals.length + 1}`,
    vals.concat([id]),
  )
  return res.status(qr.rowCount ? 200 : 404).send()
}

export const deleteTask: Handler = async (req, res) => {
  const { id } = req.params
  const qr = await db.query("DELETE FROM tasks WHERE task_id = $1", [id])
  return res.status(qr.rowCount ? 204 : 404).send()
}
