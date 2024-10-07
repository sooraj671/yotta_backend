// routes/documents.js
const express = require('express');
const router = express.Router();
const Document = require('../models/Document'); // Assuming your model is named Document
const { uploadDocument } = require('../controllers/documentController');


const multer = require('multer');

// Multer setup (memory storage for Cloudinary uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Use `upload.fields` to handle multiple file fields
router.post('/uploadDocument', upload.fields([
  { name: 'document', maxCount: 1 }
]), uploadDocument);


// Endpoint to fetch all document URLs
router.get('/documents/urls', async (req, res) => {
  try {
    // Fetch only the documentUrl field from the Documents collection
    const documents = await Document.find({}, { documentUrl: 1, _id: 0 }); // Select only documentUrl
    const urls = documents.map(doc => doc.documentUrl);
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error });
  }
});

module.exports = router;
