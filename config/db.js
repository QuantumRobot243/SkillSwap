const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "243@arif",
  database: process.env.DB_NAME || "SkillSwap",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    process.exit(1); // Stop the server if DB fails to connect
  }
  console.log("✅ MySQL Database Connected...");
});

module.exports = db;
