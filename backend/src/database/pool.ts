import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config(); // Load environment variables

const DB_PORT = Number(process.env.DB_PORT); // Ensure DB_PORT is a number
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT || 5432, // With a default value of 5432
});

exports.pool = pool;
