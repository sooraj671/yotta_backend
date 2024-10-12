const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Tutor = require('../models/Tutor');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig'); // Assuming you have a cloudinary config file

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Register new user
const register = async (req, res) => {

  //TODO

  // const tutorData = req.body;
    
  // // Create a new student
  // const newTutor = new Tutor(tutorData);
  
  // // Save the student in the database
  // const savedStudent = await newStudent.save();

  
  const {userId, firstName, lastName, phoneNumber, postalCode, termsAccepted, expectations, timeSlots, dropDownData, educationDetails, 
    specialNeeds, preferredLocations, educationLevel, experiences, tutorCategory, race, gender, profilePicUrl, documentUrl
  } = req.body;

  try {
    // Create new user object
    tutor = new Tutor({
      userId,
      firstName,
      lastName,
      phoneNumber,
      postalCode,
      termsAccepted,
      // courses,
      expectations,
      timeSlots,
      dropDownData,
      educationDetails,
      specialNeeds,
      preferredLocations,
      educationLevel,
      experiences,
      tutorCategory,
      race,
      gender,
      profilePicUrl,
      documentUrl,
      // levels
    });

    
    
      // Upload profile picture to Cloudinary
      if (req.files && req.files['profilePhoto']) {
        const profilePhotoUpload = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'profile_pictures' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(req.files['profilePhoto'][0].buffer);
        });
  
        tutor.profilePicUrl = profilePhotoUpload;
        console.log('Profile Photo URL:', tutor.profilePicUrl);
      }

      // Upload profile picture to Cloudinary
      if (req.files && req.files['document']) {
        const documentUpload = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'documents' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(req.files['document'][0].buffer);
        });
  
        tutor.documentUrl = documentUpload;
        console.log('Document  URL:', documentUpload);
      }
    // Save the user
    console.log('tutor: ', tutor)
    try {
      await tutor.save();
      console.log("User Registered.");
    } catch (error) {
      console.error('Error saving tutor:', error.message);
      res.status(500).send('Server error');
    }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// signup user
const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Provide all required fields.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User created successfully.', userId : newUser._id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error: '+error });
  }

};


const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


// controllers/authController.js
const passport = require('passport');
// Controller function to handle Google Sign-In authentication
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Controller function to handle Google Sign-In callback
const googleCallback = passport.authenticate('google', { failureRedirect: '/login' });

// Controller function to handle the successful login response
const googleCallbackSuccess = (req, res) => {
  // After successful authentication, send back a token and user data in the response
  const user = req.user; // req.user will have the authenticated user info

  // Generate a JWT token using the user's ID
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

  // Log the response being sent
  console.log("Google Sign-Up Successful. Sending response:", {
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });

  // Send a JSON response with the token and user info
  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
};


// Other controllers like register, signup, login, verifyToken...

module.exports = {
  register,
  signup,
  login,
  verifyToken,
  googleAuth,
  googleCallback,
  googleCallbackSuccess,
};
