const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  
  userId: {
    unique: true,
    type: String,
    required: false,
  },
  
  studentFirstName: {
    type: String,
    required: false,
  },

  studentLastName: {
    type: String,
    required: false,
  },

  gender: {
    type: String,
    required: false,
  },

  postalCode: {
    type: String,
    required: false,
  },

  studentLevel: {
    type: String,
    required: false,
  },

  grade: {
    type: String,
    required: false,
  },

  selectedCourses: {
    type: [String],
    default: [],
  },
  
  lessonFrequency: {
    type: String,
    required: false,
  },

  tutionBudget: {
    type: String,
    required: false,
  },

  tutorGenderPreference: {
    type: String,
    default: false,
  },

  preferredStartDate: {
    type: Date,
    default: null,
  },

  commitmentLength: {
    type: String,
    required: false,
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

  expectations: {
    type: String,
    required: false,
  },
   

  
},{ collection: 'Students' });

const Student = mongoose.model('Students', StudentSchema);

module.exports = Student;

