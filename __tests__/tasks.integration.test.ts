import request from "supertest"
import app from "../src/index"

describe("tasks service", () => {
  test("handles basic CRUD", async () => {
    // Missing inputs
    let res = await request(app).post("/tasks")
    expect(res.statusCode).toBe(400)

    // Successful create
    res = await request(app).post("/tasks").send({ title: "Homework 1", description: "Study" })
    expect(res.statusCode).toBe(201)
    const id = res.body.task_id
    expect(id).toBeTruthy()

    // Now look it up by ID
    const now = Date.now() - 60_000
    res = await request(app).get(`/tasks/${id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.task_id).toBe(id)
    expect(res.body.title).toBe("Homework 1")
    const created = new Date(res.body.created_at).getTime()
    const updated = new Date(res.body.updated_at).getTime()
    expect(created).toBeGreaterThan(now)
    expect(updated).toBeGreaterThan(now)

    // Find it in all
    res = await request(app).get("/tasks")
    expect(res.body.tasks.map((t: any) => t.task_id)).toContain(id)

    // Update title and verify change
    res = await request(app).put(`/tasks/${id}`).send({ title: "HW 2" })
    expect(res.statusCode).toBe(200)
    res = await request(app).get(`/tasks/${id}`)
    expect(res.body.title).toBe("HW 2")
    expect(res.body.description).toBe("Study")
    expect(new Date(res.body.updated_at).getTime()).toBeGreaterThan(updated)
    expect(new Date(res.body.created_at).getTime()).toEqual(created)

    // Delete it
    res = await request(app).delete(`/tasks/${id}`)
    expect(res.statusCode).toBe(204)

    // Make sure it's gone with status 404
    res = await request(app).get(`/tasks/${id}`)
    expect(res.statusCode).toBe(404)
  })
})
