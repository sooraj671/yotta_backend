// controllers/StudentController.js
const Student = require('../models/Student');

exports.registerStudent = async (req, res) => {
  try {
    
    const {userId, studentFirstName, studentLastName,
        postalCode, expectations,  gender, grade, 
        preferredStartDate, selectedCourses, studentLevel,
         tutionBudget, tutorGenderPreference, commitmentLength, lessonFrequency
      } = req.body;
    //const studentData = req.body;
    
    // Create a new student
    const newStudent = new Student({userId, studentFirstName, studentLastName,
      postalCode, expectations,  gender, grade, 
      preferredStartDate, selectedCourses, studentLevel,
       tutionBudget, tutorGenderPreference, commitmentLength,lessonFrequency
    });
    
    // Save the student in the database
    const savedStudent = await newStudent.save();

    return res.status(201).json({
      success: true,
      message: 'Student registered successfully!',
      data: savedStudent,
    });
  } catch (error) {
    if (error.code === 11000) { // Duplicate userId
      return res.status(400).json({
        success: false,
        message: 'User ID must be unique.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to register student.',
      error: error.message,
    });
  }
};
