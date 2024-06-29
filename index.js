const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPath = path.resolve(__dirname, 'db', 'reviews.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello, this is the Brewery Review backend!');
});

// More routes for handling user authentication, brewery search, and reviews

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
