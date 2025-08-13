import express from "express";
import { authMiddleware } from "../middleware/auth.js";

import {
  createTaskHandler,
  getTasksHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/taskController.js";

const router = express.Router();

// All routes below require authentication (valid JWT token)
router.use(authMiddleware);

/**
 * @route POST /tasks
 * @desc Create a new task in a project
 * @access Protected
 */
router.post("/tasks", createTaskHandler);

/**
 * @route GET /projects/:projectId/tasks
 * @desc Get all tasks for a specific project
 * @access Protected
 */
router.get("/projects/:projectId/tasks", getTasksHandler);

/**
 * @route PATCH /tasks/:id
 * @desc Update task details (title, description, status)
 * @access Protected
 */
router.patch("/tasks/:id", updateTaskHandler);

/**
 * @route DELETE /tasks/:id
 * @desc Delete a task by ID
 * @access Protected
 */
router.delete("/tasks/:id", deleteTaskHandler);

export default router;
