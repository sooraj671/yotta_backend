const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

// POST request to register a student
router.post('/register', StudentController.registerStudent);

module.exports = router;