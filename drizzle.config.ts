import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "",  // Ensure this file exists and is correctly written
  out: "./drizzle",
  dialect: "mysql",  // ✅ Use 'mysql' instead of 'driver'
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "243@arif",
    database: process.env.DB_NAME || "skillswap",
  },
});
