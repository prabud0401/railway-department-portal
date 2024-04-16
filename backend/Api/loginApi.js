// loginApi.js

const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection module

// Login route
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Query the database to check if the username and password are valid
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Check if the user exists and the password is correct
    if (results.length === 0) {
      // User not found or incorrect password
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      // User authenticated successfully
      res.status(200).json({ message: 'Login successful', user: results[0] });
    }
  });
});

module.exports = router;
