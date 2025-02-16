import request from "supertest";
import { seedDatabase } from "../src/seeder";
import app from "../src/server";
import { AppDataSourceTest } from "../src/database";


beforeAll(async () => {
  if (!AppDataSourceTest.isInitialized) {
    await AppDataSourceTest.initialize();
  }
});

afterAll(async () => {
  if (AppDataSourceTest.isInitialized) {
    await AppDataSourceTest.destroy();
  }
});

describe("Task API", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ name: "Test Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe("Test Task");
  });

  it("should return a list of tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should return a single task", async () => {
    const res = await request(app).get("/api/tasks/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it("should update a task", async () => {
    const res = await request(app)
      .put("/api/tasks/1")
      .send({ name: "Updated Task" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Updated Task");
  });

  it("should delete a task", async () => {
    const res = await request(app).delete("/api/tasks/1");
    expect(res.statusCode).toBe(200);
  });
});
