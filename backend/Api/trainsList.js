const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {

        // Extract query parameters
        const { from_location, to_location } = req.query;

        // Check if both from_location and to_location are provided
        if (!from_location || !to_location) {
            return res.status(400).json({ message: 'Both from_location and to_location are required query parameters.' });
        }

        // Query to fetch train data based on from_location and to_location
        const query = 'SELECT * FROM trains WHERE from_location = ? AND to_location = ?';
        const params = [from_location, to_location];

        // Execute the query
        const trains = await db.query(query, params);

        // Send the train data as a response
        res.json(trains);

});

module.exports = router;
