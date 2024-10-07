const Document = require('../models/Document');
const cloudinary = require('../config/cloudinaryConfig'); // Assuming you have a cloudinary config file
const multer = require('multer');

const uploadDocument = async (req, res) => {
    var documentUrl = "";
    if (req.files && req.files['document']) {
        const documentUpload = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'documents' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(req.files['document'][0].buffer);
        });
        documentUrl = documentUpload;
        console.log('Document URL:', documentUpload);
    }

    const document = new Document({ documentUrl: documentUrl, title: 'Document 1000', uploadedBy: '609d2f77bcf86cd799439011' });
    await document.save();

    res.status(201).json({ message: 'Document Uploaded successfully' });   
};
  
module.exports = { uploadDocument };