import client from '../db/index.js';

/**
 * Creates a new user in the database.
 * 
 * @param {string} username - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} hashedPassword - The hashed password of the new user.
 * @returns {Promise<Object>} The newly created user record (id, username, email, created_at).
 */
export const createUser = async (username, email, hashedPassword) => {
    try {
        const result = await client.query(
            `INSERT INTO users (username, email, password_hash) 
             VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
             [username, email, hashedPassword]
        );

        // Return the first (and only) row of the result which contains the user data
        return result.rows[0];
        
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Propagate error so caller can handle it
    }
}

/**
 * Finds a user in the database by their email.
 * 
 * @param {string} email - The email to search for.
 * @returns {Promise<Object|null>} The user record if found, otherwise null.
 */
export const findUserByEmail = async (email) => {
    try {
        const result = await client.query (
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        
        // Return the user if found, or undefined/null if not found
        return result.rows[0];

    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error; // Propagate error for upstream handling
    }
}