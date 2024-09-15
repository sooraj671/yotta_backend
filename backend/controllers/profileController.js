const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Tutor = require('../models/Tutor');

const getProfile = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ code: 401, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    const user = await Tutor.findOne({userId}).select('-password');
    if (!user) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }

    return res.status(200).json({
      code: 200,
      data: user
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ code: 500, message: 'Server error' });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const tutors = await Tutor.find().select('-password'); // Fetch all tutors excluding passwords
    return res.status(200).json({
      code: 200,
      data: tutors,
    });
  } catch (error) {
    console.error('Error fetching profiles:', error.message);
    return res.status(500).json({ code: 500, message: 'Server error' });
  }
};

module.exports = { getProfile, getAllProfiles };
