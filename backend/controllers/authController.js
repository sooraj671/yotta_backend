// controllers/authController.js
const passport = require('passport');

// Controller function to handle Google Sign-In authentication
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Controller function to handle Google Sign-In callback
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/login' });

// Controller function to handle the successful login response
exports.googleCallbackSuccess = (req, res) => {
  // Successful authentication, redirect or respond with user data
  res.json({
    message: 'Google sign-in successful!',
    user: req.user,
  });
};
