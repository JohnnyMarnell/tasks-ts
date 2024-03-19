import { Request, Response } from "express"
import { QueryResult } from "pg"
import { pool } from "../database"

export const getTasks = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM tasks")
    return res.status(200).json(response.rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json("Internal Server error")
  }
}

export const getTaskById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  const response: QueryResult = await pool.query(
    "SELECT * FROM tasks WHERE task_id = $1",
    [id],
  )
  return res.json(response.rows)
}

export const createTask = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { title, description, completed } = req.body
  const dbResult = await pool.query(
    "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING task_id",
    [title, description, completed || false],
  )
  return res.status(201).json({ id: dbResult.rows[0].task_id })
}

// Update a task by ID
export const updateTask = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  // Extract task ID from request parameters
  const id = req.params.id

  // Extract updated task details from request body
  const { title, description, completed } = req.body

  try {
    // Execute a PostgreSQL query to update the task by ID
    await pool.query(
      "UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE task_id = $4",
      [title, description, completed, id],
    )

    // Return a JSON response with the updated task details
    return res.json({
      message: "Task updated successfully",
      task: {
        id,
        title,
        description,
        completed,
      },
    })
  } catch (error) {
    // Handle errors, log them, and return an internal server error response
    console.error(error)
    return res.status(500).json("Internal Server error")
  }
}

// Delete a task by ID
export const deleteTask = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  // Extract task ID from request parameters
  const id = req.params.id

  try {
    // Execute a PostgreSQL query to delete the task by ID
    await pool.query("DELETE FROM tasks WHERE id = $1", [id])

    // Return a JSON response indicating successful deletion
    return res.status(200).json(`Task ${id} deleted successfully`)
  } catch (error) {
    // Handle errors, log them, and return an internal server error response
    console.error(error)
    return res.status(500).json("Internal Server error")
  }
}
