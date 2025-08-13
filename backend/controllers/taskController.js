import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} from "../models/taskModel.js";

/**
 * Handle creating a new task for a project.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const createTaskHandler = async (req, res) => {
  const { projectId, title, description, status } = req.body;

  try {
    // Create the task in DB
    const newTask = await createTask(projectId, title, description, status);
    // Return the created task with 201 status
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

/**
 * Retrieve all tasks for a specific project.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const getTasksHandler = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Fetch tasks linked to the project
    const tasks = await getTasksByProject(projectId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

/**
 * Update a task by its ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const updateTaskHandler = async (req, res) => {
  const { id } = req.params; // Task ID from URL
  const { title, description, status } = req.body;

  try {
    // Attempt to update the task
    const updated = await updateTask(id, title, description, status);
    if (!updated) {
      // If no task found
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

/**
 * Delete a task by its ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const deleteTaskHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the task in the DB
    await deleteTask(id);
    // Send 204 No Content on success
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
