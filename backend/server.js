import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount user-related routes at /api/users
app.use("/api/users", userRoutes);

// Define the port from environment variable or fallback to 5050
const PORT = process.env.PORT || 5050;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});