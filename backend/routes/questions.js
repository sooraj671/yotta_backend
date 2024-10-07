const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET route for fetching questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ updatedAt: -1, createdAt: -1 });
    res.status(200).send(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send({ message: 'Error fetching questions', error });
  }
});

// POST route for adding a question
router.post('/', async (req, res) => {
  const { name, question } = req.body;

  try {
    const newQuestion = new Question({ name, question, comments: [] });
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).send({ message: 'Error saving question', error });
  }
});

// POST route for adding comments
router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { name, text } = req.body;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).send({ message: 'Question not found' });
    }
    question.comments.push({ name, text });
    await question.save();
    res.status(200).send(question);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send({ message: 'Error adding comment', error });
  }
});

// PUT route for editing a question
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { question, user } = req.body;

  const existingQuestion = await Question.findById(id);
//   if (existingQuestion.name !== user) {
//     return res.status(403).send('You can only edit your own questions.');
//   }

  existingQuestion.question = question;
  await existingQuestion.save();
  res.send(existingQuestion);
});

// DELETE route for deleting a question
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  const existingQuestion = await Question.findById(id);
//   if (existingQuestion.name !== user) {
//     return res.status(403).send('You can only delete your own questions.');
//   }

  await Question.findByIdAndDelete(id);
  res.send({ message: 'Question deleted successfully' });
});

module.exports = router;
