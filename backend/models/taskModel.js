import client from "../db/index.js";

/**
 * Create a new task for a specific project.
 * @param {number} projectId - The ID of the project this task belongs to.
 * @param {string} title - The title of the task.
 * @param {string} description - Task description (optional).
 * @param {string} status - Status of the task (default: 'todo').
 * @returns {Promise<Object>} The newly created task.
 */
export const createTask = async (
  projectId,
  title,
  description,
  status = "todo"
) => {
  try {
    // Insert a new task linked to the given project
    const result = await client.query(
      `INSERT INTO tasks (project_id, title, description, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [projectId, title, description, status]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Propagate error for upstream handling
  }
};

/**
 * Get all tasks for a specific project.
 * @param {number} projectId - The ID of the project.
 * @returns {Promise<Array>} Array of tasks.
 */
export const getTasksByProject = async (projectId) => {
  try {
    // Retrieve tasks for the project ordered by creation time
    const result = await client.query(
      `SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at ASC`,
      [projectId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Propagate error for upstream handling
  }
};

/**
 * Update a task's details.
 * @param {number} taskId - The ID of the task.
 * @param {string} title - New task title.
 * @param {string} description - New task description.
 * @param {string} status - New status (e.g., 'todo', 'in-progress', 'done').
 * @returns {Promise<Object|null>} Updated task or null if not found.
 */
export const updateTask = async (taskId, title, description, status) => {
  try {
    // Update the task fields in the database
    const result = await client.query(
      `UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *`,
      [title, description, status, taskId]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error; // Propagate error for upstream handling
  }
};

/**
 * Delete a task by ID.
 * @param {number} taskId - The ID of the task.
 * @returns {Promise<void>}
 */
export const deleteTask = async (taskId) => {
  try {
    // Delete the task row in the database
    await client.query(`DELETE FROM tasks WHERE id = $1`, [taskId]);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Propagate error for upstream handling
  }
};
