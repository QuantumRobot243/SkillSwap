require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err);
        process.exit(1);
    }
    console.log('✅ Connected to MySQL Database');
});

// API Route - Fetch User Data
app.get('/api/userdata', (req, res) => {
    db.query('SELECT user_id, name, email, bio, location, created_at FROM userdata', (err, results) => {
        if (err) {
            console.error('❌ Database Query Failed:', err);
            return res.status(500).json({ error: 'Database Query Failed' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
