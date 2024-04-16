// Import required modules
const express = require('express');
const db = require('../db');

// Create an Express router
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Extract query parameters
        const { from_location, to_location } = req.query;

        // Query to fetch train IDs based on from_location and to_location
        const query = 'SELECT id FROM trains WHERE from_location = ? AND to_location = ?';
        const params = [from_location, to_location];

        // Execute the query
        const trainIds = await db.query(query, params);

        // Extract train IDs from the query result
        const ids = trainIds.map(train => train.id);

        // Send the train IDs as a response
        res.json(ids);
    } catch (error) {
        console.error('Error fetching train IDs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// GET endpoint to fetch train details by ID
router.get('/:id', async (req, res) => {
    try {
        // Extract the train ID from the request parameters
        const { id } = req.params;

        // Query to fetch train details by ID
        const query = 'SELECT * FROM trains WHERE id = ?';
        const params = [id];

        // Execute the query
        const train = await db.query(query, params);

        // Check if the train exists
        if (train.length === 0) {
            // If no train found with the provided ID, send a 404 response
            return res.status(404).json({ message: 'Train not found' });
        }

        // Send the train details as a response
        res.json(train[0]); // Assuming there is only one train with the provided ID
    } catch (error) {
        console.error('Error fetching train details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
