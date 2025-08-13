import express from "express";
import { authMiddleware } from "../middleware/auth.js";

import {
  createProjectHandler,
  getProjectHandler,
  getUserProjectsHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from "../controllers/projectController.js";

const router = express.Router();

// All project routes require authentication
router.use(authMiddleware);

/**
 * @route POST /projects
 * @desc Create a new project
 * @access Protected
 */
router.post("/projects", createProjectHandler);

/**
 * @route GET /projects/:id
 * @desc Get a project by its ID
 * @access Protected
 */
router.get("/projects/:id", getProjectHandler);

/**
 * @route GET /projects
 * @desc Get all projects owned by the authenticated user
 * @access Protected
 */
router.get("/projects", getUserProjectsHandler);

/**
 * @route PATCH /projects/:id
 * @desc Update a project by ID
 * @access Protected
 */
router.patch("/projects/:id", updateProjectHandler);

/**
 * @route DELETE /projects/:id
 * @desc Delete a project by ID
 * @access Protected
 */
router.delete("/projects/:id", deleteProjectHandler);

export default router;
