import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Create a new PostgreSQL client instance using environment variables.
 * Connects to the database immediately upon import.
 * 
 * @module db/index
 */

// Initialize new client with connection config from .env
const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Connect to the PostgreSQL database asynchronously
await client.connect()

export default client;