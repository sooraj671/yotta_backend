const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const multer = require('multer');

// Multer setup (memory storage for Cloudinary uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define fields for Multer middleware
const multer = require('multer');


// Use `upload.fields` to handle multiple file fields
app.post('/api/auth/register', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'uploadedDocuments', maxCount: 1 }
]), register);

router.post('/login', login);

module.exports = router;
