import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * User-related routes (registration, login)
 * No authMiddleware here because register/login are public
 */
app.use("/api/users", userRoutes);

/**
 * Protected routes below require JWT auth:
 * Projects, Tasks, Comments routes
 */
app.use("/api", taskRoutes);
app.use("/api", projectRoutes);

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 5050;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
