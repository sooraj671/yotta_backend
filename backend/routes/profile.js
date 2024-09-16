const express = require('express');
const router = express.Router();
const { getProfile, getAllProfiles, getProfileById } = require('../controllers/profileController');

// router.get('/getUserProfileById', getUserProfileById);
// router.get('/getAllProfiles', getAllProfiles);

// Routes for profile-related actions
router.get('/getProfile', getProfile);
router.get('/getAllProfiles', getAllProfiles);
router.get('/getProfileById/:id', getProfileById);

module.exports = router;