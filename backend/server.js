const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const Parent = require('./models/Parent'); 
const Student = require('./models/Student');  
const documentRoutes = require('./routes/documents');


const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

// Import the routes

// Use the routes
app.use('/api', documentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

