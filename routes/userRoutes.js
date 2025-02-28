const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL Database");
});

// Define routes
router.get("/", (req, res) => {
    db.query("SELECT * FROM userdata", (err, results) => {
        if (err) {
            console.error("❌ Database Query Failed:", err);
            return res.status(500).json({ error: "Database Query Failed" });
        }
        res.json(results);
    });
});

module.exports = router;
