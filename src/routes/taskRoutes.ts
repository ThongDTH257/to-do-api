import { Router, Request, Response } from "express";
import { AppDataSource } from "../database";
import { Task } from "../entity/Task";
import ApiResponse from "../utils/response/ApiResponse";

const router = Router();

// Create a task
router.post("/", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, startDate, endDate } = req.body;

    if (!name || name.length > 80) {
      return res.status(400).json(ApiResponse.error(400, "Invalid task name"));
    }
    if (endDate && !startDate) {
      return res.status(400).json(ApiResponse.error(400, "Start date is required if end date is provided"));
    }

    const task = new Task();
    task.name = name;
    task.startDate = startDate;
    task.endDate = endDate;

    await AppDataSource.manager.save(task);
    return res.status(201).json(ApiResponse.success(201, "Task created successfully", task));
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json(ApiResponse.error(500, "Internal server error"));
  }
});

// Get all tasks
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = await AppDataSource.manager.find(Task);
    return res.status(200).json(ApiResponse.success(200, "Tasks retrieved successfully", tasks));
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).json(ApiResponse.error(500, "Internal server error"));
  }
});

// Get a task by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const task = await AppDataSource.manager.findOneBy(Task, { id: parseInt(req.params.id) });
    if (!task) {
      return res.status(404).json(ApiResponse.error(404, "Task not found"));
    }
    return res.status(200).json(ApiResponse.success(200, "Task retrieved successfully", task));
  } catch (error) {
    console.error("Error retrieving task:", error);
    return res.status(500).json(ApiResponse.error(500, "Internal server error"));
  }
});

// Update a task
router.put("/:id", async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const { name, startDate, endDate } = req.body;
    const taskRepo = AppDataSource.manager.getRepository(Task);

    let task = await taskRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!task) {
      return res.status(404).json(ApiResponse.error(404, "Task not found"));
    }

    if (name) {
      if (name.length > 80) {
        return res.status(400).json(ApiResponse.error(400, "Name too long"));
      }
      task.name = name;
    }
    if (endDate && !startDate) {
      return res.status(400).json(ApiResponse.error(400, "Start date required"));
    }
    if(endDate && startDate && new Date(startDate) > new Date(endDate)) {
      return res.status(400).json(ApiResponse.error(400, "End date cannot be before start date"));
    }

    task.startDate = startDate || task.startDate;
    task.endDate = endDate || task.endDate;

    await taskRepo.save(task);
    return res.status(200).json(ApiResponse.success(200, "Task updated successfully", task));
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json(ApiResponse.error(500, "Internal server error"));
  }
});

// Delete a task
router.delete("/:id", async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const taskRepo = AppDataSource.manager.getRepository(Task);
    const task = await taskRepo.findOneBy({ id: parseInt(req.params.id) });

    if (!task) {
      return res.status(404).json(ApiResponse.error(404, "Task not found"));
    }

    await taskRepo.remove(task);
    return res.status(200).json(ApiResponse.success(200, "Task deleted successfully"));
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json(ApiResponse.error(500, "Internal server error"));
  }
});

export default router;
