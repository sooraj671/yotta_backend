// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config(); // Load environment variables from .env

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,  // Use environment variable for Client ID
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Use environment variable for Client Secret
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {

    console.log("Display Name: ", profile.displayName)
    console.log("Family Name: ", profile.name.familyName)
    console.log("Given Name: ", profile.name.givenName)
    console.log("Email: ", profile.emails[0].value)
    console.log("Profile Photo: ", profile.photos[0].value)
    
    return done(null, profile);
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
