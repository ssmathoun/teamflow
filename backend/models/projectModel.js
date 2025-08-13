import client from "../db/index.js";

/**
 * Create a new project.
 * @param {string} title - The project title.
 * @param {string} description - The project description.
 * @param {number} ownerId - The ID of the user who owns the project.
 * @returns {Promise<Object>} The newly created project.
 */
export const createProject = async (title, description, ownerId) => {
  try {
    const result = await client.query(
      `INSERT INTO projects (title, description, owner_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, description, ownerId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

/**
 * Retrieve a project by its ID.
 * @param {number} projectId - The project ID.
 * @returns {Promise<Object|null>} The project or null if not found.
 */
export const getProjectById = async (projectId) => {
  try {
    const result = await client.query(`SELECT * FROM projects WHERE id = $1`, [
      projectId,
    ]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

/**
 * Retrieve projects owned by a user.
 * @param {number} ownerId - The owner's user ID.
 * @returns {Promise<Array>} List of projects.
 */
export const getProjectsByOwner = async (ownerId) => {
  try {
    const result = await client.query(
      `SELECT * FROM projects WHERE owner_id = $1 ORDER BY created_at DESC`,
      [ownerId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving projects by owner:", error);
    throw error;
  }
};

/**
 * Update project details.
 * @param {number} projectId - The ID of the project to update.
 * @param {string} title - New project title.
 * @param {string} description - New project description.
 * @returns {Promise<Object|null>} Updated project or null if not found.
 */
export const updateProject = async (projectId, title, description) => {
  try {
    const result = await client.query(
      `UPDATE projects SET title = $1, description = $2 
       WHERE id = $3 RETURNING *`,
      [title, description, projectId]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

/**
 * Delete a project by ID.
 * @param {number} projectId - The ID of the project to delete.
 * @returns {Promise<void>}
 */
export const deleteProject = async (projectId) => {
  try {
    await client.query(`DELETE FROM projects WHERE id = $1`, [projectId]);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
