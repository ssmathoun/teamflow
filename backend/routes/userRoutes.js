import express from "express";
import { register, login } from "../controllers/userController.js";

const router = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /login
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
router.post("/login", login);

export default router;
