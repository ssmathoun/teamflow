import { createUser, findUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Registers a new user.
 * - Checks if email already exists.
 * - Hashes the password securely using bcrypt.
 * - Creates a new user record in the database.
 * - Returns the created user info (excluding password).
 * 
 * @param {import('express').Request} req - Express request object containing username, email, password.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the email is already registered
        const emailExists = await findUserByEmail(email);
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists"});
        }

        // Hash the user's password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user record in DB
        const newUser = await createUser(username, email, hashedPassword);
        
        // Respond with the newly created user info (without password)
        res.status(201).json(newUser);
    } catch (error) {
        // Generic server error response
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Logs in an existing user.
 * - Finds user by email.
 * - Validates the password with bcrypt.
 * - Generates a JWT token with user info if valid.
 * - Returns the JWT token for authenticated access.
 * 
 * @param {import('express').Request} req - Express request object containing email, password.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Sign JWT token with user info and secret key
        const authToken = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
        );

        // Respond with JWT token
        res.json({ authToken })

    } catch (error) {
        // Generic server error response
        res.status(500).json({ error: "Internal server error" });
    }
};

