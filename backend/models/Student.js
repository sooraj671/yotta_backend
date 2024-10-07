const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  
  userId: {
    unique: true,
    type: String,
    required: true,
  },
  
  studentFirstName: {
    type: String,
    required: true,
  },

  studentLastName: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  postalCode: {
    type: String,
    required: true,
  },

  studentLevel: {
    type: String,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },

  selectedCourses: {
    type: [String],
    default: [],
  },
  
  lessonFrequency: {
    type: String,
    required: true,
  },

  tutionBudget: {
    type: String,
    required: true,
  },

  tutorGenderPreference: {
    type: Boolean,
    default: false,
  },

  preferredStartDate: {
    type: String,
    default: '',
  },

  commitmentLength: {
    type: String,
    required: true,
  },
   
  timeSlots: {
    Monday: {
      type: [Number],
      default: [],
    },
    Tuesday: {
      type: [Number],
      default: [],
    },
    Wednesday: {
      type: [Number],
      default: [],
    },
    Thursday: {
      type: [Number],
      default: [],
    },
    Friday: {
      type: [Number],
      default: [],
    },
    Saturday: {
      type: [Number],
      default: [],
    },
    Sunday: {
      type: [Number],
      default: [],
    },
  },

  expectationsAndNeeds: {
    type: String,
    required: true,
  },
   

  
},{ collection: 'Students' });

const Student = mongoose.model('Students', StudentSchema);

module.exports = Student;

