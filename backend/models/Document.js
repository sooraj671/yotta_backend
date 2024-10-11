// models/Document.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Document schema
const DocumentSchema = new Schema({
  documentUrl: {
    type: String,
    required: true, // The URL to access the document
  },
  title: {
    type: String,
    required: true, // A descriptive title for the document
  },
  uploadedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the document was uploaded
  },
},{ collection: 'Documents' });

// Create the Document model
const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;
