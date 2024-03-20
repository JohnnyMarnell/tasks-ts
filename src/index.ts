import express, { ErrorRequestHandler } from "express"
import * as tasks from "./controllers/tasks"
import crypto from "crypto"
import asyncHandler from "express-async-handler"

// Configure middleware for parsing JSON and URL-encoded data
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define routes
app.get("/tasks", asyncHandler(tasks.getTasks))
app.get("/tasks/:id", asyncHandler(tasks.getTaskById))
app.post("/tasks", asyncHandler(tasks.createTask))
app.put("/tasks/:id", asyncHandler(tasks.updateTask))
app.delete("/tasks/:id", asyncHandler(tasks.deleteTask))

app.get("/ping", async (req, res) => res.json({ pong: true }))

// Log bubbled up errors, with generated error ID
const errorLogger: ErrorRequestHandler = async (err, req, res, next) => {
  const errorId = crypto
    .createHash("md5")
    .update(crypto.randomBytes(20))
    .digest("hex")
  console.error("Server error", errorId, req.url, err.stack)

  res.status(500).json({ errorId: errorId })
}
app.use(errorLogger)

// Start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
