const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const connectDB = require('./config/db.js');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/todos', require('./routes/todoRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running!' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({
    success: false,
    error: error.message
  });
});

// Handle 404 - catch all unmatched routes (don't pass '*' to the router)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});