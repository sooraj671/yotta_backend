const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig'); // Assuming you have a cloudinary config file

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Register new user
const register = async (req, res) => {
  const {
    username, email, password, firstName, lastName, phoneNumber, parentLastName, parentEmail, postalCode, 
    studentFirstName, studentLastName, studentGender, studentLevel, studentGrade, 
    lessonsPerWeek, tuitionBudget, tutorGenderPreference, preferredStartDate, 
    commitmentLength, termsAccepted, courses, expectations, timeSlots, dropDownData, educationDetails, 
    specialNeeds, preferredLocations, educationLevel, experiences, tutorCategory, race, gender
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user object
    user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      parentLastName,
      parentEmail,
      postalCode,
      studentFirstName,
      studentLastName,
      studentGender,
      studentLevel,
      studentGrade,
      lessonsPerWeek,
      tuitionBudget,
      tutorGenderPreference,
      preferredStartDate,
      commitmentLength,
      termsAccepted,
      courses,
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
      gender
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Upload profile picture to Cloudinary
    if (req.files['profilePhoto']) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'profile_pictures' },
        (error, result) => {
          if (error) {
            return res.status(500).json({ message: 'Error uploading profile picture', error });
          }
          user.profilePicUrl = result.secure_url;
        }
      );
      req.files['profilePhoto'][0].buffer && result.end(req.files['profilePhoto'][0].buffer);
    }

    // Upload document to Cloudinary
    if (req.files['document']) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'documents' },
        (error, result) => {
          if (error) {
            return res.status(500).json({ message: 'Error uploading document', error });
          }
          user.documentUrl = result.secure_url;
        }
      );
      req.files['document'][0].buffer && result.end(req.files['document'][0].buffer);
    }

    // Save the user
    await user.save();

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
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { register, login };
