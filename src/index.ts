import express, { Router, ErrorRequestHandler } from "express"
import * as routes from "./controllers/index.controllers"
import crypto from "crypto"

// Configure middleware for parsing JSON and URL-encoded data
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define routes
app.get("/tasks", routes.getTasks)
app.get("/tasks/:id", routes.getTaskById)
app.post("/tasks", routes.createTask)
app.put("/tasks/:id", routes.updateTask)
app.delete("/tasks/:id", routes.deleteTask)
app.get("/ping", async (req, res) => res.json({ pong: true }))

// I'd like a generic error handler, and have yet to get this to work
const error: ErrorRequestHandler = async (err, req, res, next) => {
  const errorId = crypto
    .createHash("md5")
    .update(crypto.randomBytes(20))
    .digest("hex")
  console.error("Server error", errorId, req.url, err.stack)

  res.status(500).json({ errorId: errorId })
}
app.use(error)

// Start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
