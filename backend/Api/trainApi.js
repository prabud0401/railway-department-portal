const express = require('express');
const db = require('../db');

// Create an Express router
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// API endpoint to retrieve train details by ID
router.get('/searchID/:id', (req, res) => {
    const trainId = req.params.id;
    
    // SQL query to fetch train details by ID
    const query = 'SELECT * FROM trains WHERE id = ?';
    
    db.query(query, [trainId], (err, result) => {
        if (err) {
            console.error('Error searching for train by ID:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Train not found' });
            } else {
                res.status(200).json(result[0]); // Assuming there's only one train with the given ID
            }
        }
    });
});

// API endpoint to retrieve train details
router.get('/', (req, res) => {
    // Query to fetch all train details from the database
    const query = 'SELECT * FROM trains';

    // Execute the query
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching train details:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send the fetched train details as a response
            res.json(result);
        }
    });
});

// API endpoint to add a new train
router.post('/addTrain', (req, res) => {
    // Extract train details from the request body
    const { name, icon, fromLocation, toLocation, departureDate, departureTime, firstClassPrice, secondClassPrice } = req.body;

    // Create a SQL query to insert the new train into the database
    const query = `INSERT INTO trains (name, icon, from_location, to_location, departure_date, departure_time, first_class_price, second_class_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query with the provided train details
    db.query(query, [name, icon, fromLocation, toLocation, departureDate, departureTime, firstClassPrice, secondClassPrice], (err, result) => {
        if (err) {
            console.error('Error adding new train:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send a success response with the ID of the newly added train
            res.status(201).json({ id: result.insertId, message: 'Train added successfully' });
        }
    });
});

// API endpoint to update a train
router.put('/update/:id', (req, res) => {
    // Extract train details from the request body
    const { name, icon, fromLocation, toLocation, departureDate, departureTime, firstClassPrice, secondClassPrice } = req.body;
    const trainId = req.params.id; // Get the train ID from the request parameters

    // Create a SQL query to update the train in the database
    const query = `UPDATE trains SET name=?, icon=?, from_location=?, to_location=?, departure_date=?, departure_time=?, first_class_price=?, second_class_price=? WHERE id=?`;

    // Execute the query with the provided train details
    db.query(query, [name, icon, fromLocation, toLocation, departureDate, departureTime, firstClassPrice, secondClassPrice, trainId], (err, result) => {
        if (err) {
            console.error('Error updating train:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Check if any rows were affected by the update operation
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Train not found' });
            } else {
                // Send a success response with the ID of the updated train
                res.status(200).json({ id: trainId, message: 'Train updated successfully' });
            }
        }
    });
});

// API endpoint to delete a train
router.delete('/delete/:id', (req, res) => {
    const trainId = req.params.id; // Get the train ID from the request parameters

    // Create a SQL query to delete the train from the database
    const query = `DELETE FROM trains WHERE id = ?`;

    // Execute the query with the provided train ID
    db.query(query, [trainId], (err, result) => {
        if (err) {
            console.error('Error deleting train:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Check if any rows were affected by the delete operation
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Train not found' });
            } else {
                // Send a success response
                res.status(200).json({ id: trainId, message: 'Train deleted successfully' });
            }
        }
    });
});

// Export the router
module.exports = router;
