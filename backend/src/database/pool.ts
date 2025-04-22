import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config(); // Load environment variables

const DB_PORT = Number(process.env.DB_PORT); // Ensure DB_PORT is a number
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const isProduction = process.env.NODE_ENV === "production";

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT || 5432, // With a default value of 5432
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? {
    rejectUnauthorized: false,
  }: false, // Disable SSL in development
  // Enable SSL in production
  // rejectUnauthorized: false is used to allow self-signed certificates
  // in production, but you should use a valid certificate in a real application
  // to avoid security risks.
  // For example, you can use Let's Encrypt to get a free SSL certificate
  // or purchase one from a trusted certificate authority.
  // For more information, see: https://letsencrypt.org/getting-started/
  // https://letsencrypt.org/docs/frequently-asked-questions/
  // https://letsencrypt.org/docs/certificate-identity/
  // https://letsencrypt.org/docs/certificate-transparency/
  // https://letsencrypt.org/docs/faq/#how-do-i-know-if-my-certificate-is-valid
  // https://letsencrypt.org/docs/faq/#how-do-i-know-if-my-certificate-is-revoked
  // https://letsencrypt.org/docs/faq/#how-do-i-know-if-my-certificate-is-expired
  // https://letsencrypt.org/docs/faq/#how-do-i-know-if-my-certificate-is-self-signed
  // https://letsencrypt.org/docs/faq/#how-do-i-know-if-my-certificate-is-trusted
  max: 20, // Set the maximum number of clients in the pool 
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

exports.pool = pool;
