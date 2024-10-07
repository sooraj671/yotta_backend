const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String },
  text: { type: String, required: true },
}, { timestamps: true });

const questionSchema = new mongoose.Schema({
  name: { type: String },
  question: { type: String, required: true },
  comments: [commentSchema],
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
