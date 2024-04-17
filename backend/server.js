const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const signupRouter = require('./Api/signupApi');
const loginRouter = require('./Api/loginApi');
const trainRouter = require('./Api/trainApi');
const trainsListRouter = require('./Api/trainsList');
const bookingRouter = require('./Api/bookingApi');
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
const db = require('./db');


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

// Use the signup and login routers
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.use('/train', trainRouter);
app.use('/trainList', trainsListRouter);
app.use('/booking', bookingRouter);

// Define your routes here

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
