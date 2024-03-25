import type { Handler } from "express"
import * as store from "../store/tasks.store"

export const getTasks: Handler = async (req, res) => {
  const tasks = await store.findAllTasks()
  return res.status(200).json({ tasks: tasks })
}

export const getTaskById: Handler = async (req, res) => {
  const { id } = req.params
  const tasks = await store.findTasksById([id])
  return tasks.length ? res.json(tasks[0]) : res.status(404).send()
}

export const createTask: Handler = async (req, res) => {
  const task: store.Task = req.body
  if (!task.title || !task.description) {
    return res.status(400).send()
  }

  const id = await store.createTask(task)
  return res.status(201).json({ task_id: id })
}

export const updateTask: Handler = async (req, res) => {
  const { id } = req.params
  const deleted = await store.updateTask(id, req.body as store.Task)
  return res.status(deleted ? 200 : 404).send()
}

export const deleteTask: Handler = async (req, res) => {
  const { id } = req.params
  const numDeleted = await store.deleteTasksById([id])
  return res.status(numDeleted ? 204 : 404).send()
}
