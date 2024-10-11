const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const Parent = require('./models/Parent'); 
const Student = require('./models/Student');  
const documentRoutes = require('./routes/documents');
const questionRoutes = require('./routes/questions');
const session = require('express-session');

const authController = require('./controllers/authController');
const passport = require('passport'); // Correct import of passport

require('./config/passport'); // Ensure passport is configured here

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
app.use('/questions', questionRoutes);


// Session middleware
app.use(session({
  secret: 'your_secret_key', resave: false, saveUninitialized: true,
}));

// Initialize Passport and sessions
app.use(passport.initialize());
app.use(passport.session());


// // Route to trigger Google Authentication using the controller
app.get('/auth/google', authController.googleAuth);

// // Google Callback route
app.get('/auth/google/callback', 
  authController.googleCallback, 
  authController.googleCallbackSuccess
);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

 