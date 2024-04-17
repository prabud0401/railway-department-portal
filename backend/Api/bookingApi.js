const express = require('express');
const db = require('../db');

// Create an Express router
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// API endpoint to add a new booking
router.post('/book', (req, res) => {
    // Extract booking details from the request body
    const { train_id, full_name, nic_passport, contact_number, email, first_class_seats, second_class_seats, total_amount } = req.body;

    // Create a SQL query to insert the new booking into the database
    const query = `INSERT INTO bookings (train_id, full_name, nic_passport, contact_number, email, first_class_seats, second_class_seats, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query with the provided booking details
    db.query(query, [train_id, full_name, nic_passport, contact_number, email, first_class_seats, second_class_seats, total_amount], (err, result) => {
        if (err) {
            console.error('Error adding new booking:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send a success response with the ID of the newly added booking
            const bookingId = result.insertId;
            res.status(201).json({ booking_id: bookingId, message: 'Booking added successfully' });
        }
    });
});
// API endpoint to retrieve booking details by booking_id
router.get('/booking/:bookingId', (req, res) => {
    // Extract booking_id from the request parameters
    const bookingId = req.params.bookingId;

    // Create a SQL query to fetch booking details by booking_id
    const query = 'SELECT * FROM bookings WHERE booking_id = ?';

    // Execute the query with the provided booking_id
    db.query(query, [bookingId], (err, result) => {
        if (err) {
            console.error('Error fetching booking details:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Booking not found' });
            } else {
                res.status(200).json(result[0]); // Assuming there's only one booking with the given booking_id
            }
        }
    });
});


// Export the router
module.exports = router;
