const express = require('express');
const connectDB = require('./config/db');

// Initialize app variable with express
const app = express();

// Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

// Test endpoint
app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/exercises', require('./routes/api/exercises'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
