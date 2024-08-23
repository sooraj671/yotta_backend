const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


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
