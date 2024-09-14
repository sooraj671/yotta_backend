const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileController');

// router.get('/getUserProfileById', getUserProfileById);
// router.get('/getAllProfiles', getAllProfiles);

router.get('/getProfile', getProfile)

module.exports = router;