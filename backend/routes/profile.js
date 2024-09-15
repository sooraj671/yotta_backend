const express = require('express');
const router = express.Router();
const { getProfile, getAllProfiles } = require('../controllers/profileController');

// router.get('/getUserProfileById', getUserProfileById);
// router.get('/getAllProfiles', getAllProfiles);

router.get('/getProfile', getProfile)
router.get('/getAllProfiles', getAllProfiles);

module.exports = router;