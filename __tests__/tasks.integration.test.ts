import app from "../src/index"
import request from "supertest"

describe("tasks service", () => {
  test("handles basic CRUD", async () => {
    // Missing inputs
    let res = await request(app).post("/tasks")
    expect(res.statusCode).toBe(400)

    // Successful create
    const title = "Homework"
    res = await request(app)
      .post("/tasks")
      .send({ title, description: "Study" })
    expect(res.statusCode).toBe(201)
    const id = res.body.task_id
    expect(id).toBeTruthy()

    // Now look it up by ID
    res = await request(app).get(`/tasks/${id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.task_id).toBe(id)
    expect(res.body.title).toBe(title)

    // Find it in all
    res = await request(app).get(`/tasks`)
    expect(res.body.tasks.map((t: any) => t.task_id)).toContain(id)

    // Delete it
    res = await request(app).delete(`/tasks/${id}`)
    expect(res.statusCode).toBe(204)

    // Make sure it's gone with status 404
    res = await request(app).get(`/tasks/${id}`)
    expect(res.statusCode).toBe(404)
  })
})
