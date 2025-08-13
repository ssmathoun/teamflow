import {
  createProject,
  getProjectById,
  getProjectsByOwner,
  updateProject,
  deleteProject,
} from "../models/projectModel.js";

/**
 * Handler to create a new project for the authenticated user.
 * @param {object} req - Express request object containing title and description.
 * @param {object} res - Express response object.
 */
export const createProjectHandler = async (req, res) => {
  const { title, description } = req.body;
  const ownerId = req.user.id; // From JWT auth middleware

  try {
    const newProject = await createProject(title, description, ownerId);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

/**
 * Handler to get a project by its ID.
 * @param {object} req - Express request object with project ID in params.
 * @param {object} res - Express response object.
 */
export const getProjectHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

/**
 * Handler to get all projects for the authenticated user.
 * @param {object} req - Express request object (user ID from JWT).
 * @param {object} res - Express response object.
 */
export const getUserProjectsHandler = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const projects = await getProjectsByOwner(ownerId);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

/**
 * Handler to update a project by its ID.
 * @param {object} req - Express request object with project ID in params.
 * @param {object} res - Express response object.
 */
export const updateProjectHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedProject = await updateProject(id, title, description);
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

/**
 * Handler to delete a project by its ID.
 * @param {object} req - Express request object with project ID in params.
 * @param {object} res - Express response object.
 */
export const deleteProjectHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProject(id);
    res.status(204).send(); // No content on successful delete
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
