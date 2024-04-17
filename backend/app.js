// Import required modules
const express = require('express');
const cors = require('cors');
const signupRouter = require('./Api/signupApi');
const loginRouter = require('./Api/loginApi');
const db = require('./db');
const trainRouter = require('./Api/trainApi');
const mysql = require('mysql');


// Create an Express application
const app = express();

// Enable CORS middleware
app.use(cors());

// Use JSON middleware
app.use(express.json());

// Use the signup and login routers
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/train', trainRouter);


// Set up a route to handle GET requests to the root URL
app.get('/', (req, res) => {
    // Send a response with the connected message
    res.send('Connected to MySQL database');
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  