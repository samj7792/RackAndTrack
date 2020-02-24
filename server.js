const express = require('express');
const connectDB = require('./config/db');

// Initialize app variable with express
const app = express();

// Connect Database
connectDB();

// Test endpoint
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
