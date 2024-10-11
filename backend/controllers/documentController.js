const Document = require('../models/Document');
const cloudinary = require('../config/cloudinaryConfig'); // Assuming you have a cloudinary config file
const multer = require('multer');


const uploadDocument = async (req, res) => {
  try {
      let documentUrl = "";
      let documentName = "";

      if (req.files && req.files['document']) {
          documentName = req.files['document'][0].originalname;
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

      const document = new Document({
          documentUrl: documentUrl,
          title: documentName
      });

      await document.save();
      res.status(201).json({ message: 'Document Uploaded successfully' });
      
  } catch (error) {
      console.error('Error uploading document:', error);
      res.status(500).json({ message: 'Error uploading document', error: error.message });
  }
};

  
module.exports = { uploadDocument };