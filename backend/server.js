const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authController = require('./controllers/authController');

// Import Passport configuration
require('./config/passport');

const app = express();

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Google Sign-In API!');
});

// Route to trigger Google Authentication using the controller
app.get('/auth/google', authController.googleAuth);

// Google Callback route
app.get('/auth/google/callback', 
  authController.googleCallback, 
  authController.googleCallbackSuccess
);

// Server listening
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
