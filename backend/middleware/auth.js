import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Middleware to authenticate requests using JWT.
 * 
 * Checks for the presence of a JWT in the Authorization header,
 * verifies the token, and attaches the decoded user information to req.user.
 * If token is missing or invalid, responds with 401 Unauthorized.
 * 
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
export const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header ("Bearer <token>")
    const authToken = req.headers.authorization?.split(' ')[1];

    // If no token, respond with 401 Unauthorized
    if (!authToken) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        // Verify JWT token using secret key from env
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        
        // Attach decoded user payload to request object for use in subsequent handlers
        req.user = decoded;
        next();
    } catch (error) {
        // If token verification fails, respond with 401 Unauthorized
        res.status(401).json({ error: 'Invalid token' });
    }
};