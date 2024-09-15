const express = require('express');
const router = express.Router();
const { register, signup, login } = require('../controllers/authController');
const multer = require('multer');

// Multer setup (memory storage for Cloudinary uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Use `upload.fields` to handle multiple file fields
router.post('/register', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'document', maxCount: 1 }
]), register);

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;


