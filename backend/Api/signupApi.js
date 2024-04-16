// Import required modules
const express = require('express');
const db = require('../db');

// Create a router
const router = express.Router();

// Define a route for user signup
router.post('/', (req, res) => {
  // Extract user details from the request body
  const { nicOrPassport, phoneNumber, email, fullName, username, password } = req.body;

  // Check if all required fields are provided
  if (!nicOrPassport || !phoneNumber || !email || !fullName || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the username or email already exists in the database
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If username or email already exists, return an error
    if (results.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Insert the new user into the database
    db.query('INSERT INTO users (nic_or_passport, phone_number, email, full_name, username, password) VALUES (?, ?, ?, ?, ?, ?)', [nicOrPassport, phoneNumber, email, fullName, username, password], (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Return success message
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});

// Export the router
module.exports = router;
