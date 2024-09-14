// const User = require('../models/User');

// getUserProfileById = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       return res.status(200).json(user);
//     } catch (error) {
//       return res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


// getAllProfiles = async (req, res) => {
//     try {
//       const users = await User.find({}); // Empty filter object gets all users
//       return res.status(200).json(users);
//     } catch (error) {
//       return res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
// module.exports = {getUserProfileById, getAllProfiles}


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getProfile = async (req, res) => {
  console.log("getProfile called");
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ code: 401, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }

    return res.status(200).json({
      code: 200,
      data: { /* user data */ }
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ code: 500, message: 'Server error' });
  }
};


module.exports = { getProfile };
