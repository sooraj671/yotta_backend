const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({

  userId: {
    unique: true,
    type: String,
    required: true,
  },
  
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: String,
    required: false,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  postalCode: {
    type: String,
    required: false,
  },

  termsAccepted: {
    type: Boolean,
    default: false,
  },

  courses: {
    type: [String],
    default: [],
  },

  expectations: {
    type: String,
    default: '',
  },

  educationLevel: {
    type: String,
    required: false,
  },

  experiences: {
    type: String,
    required: false,
  },

  tutorCategory: {
    type: String,
    required: false,
  },

  race: {
    type: String,
    required: false,
  },

  gender: {
    type: String,
    required: false,
  },

  profilePicUrl: {
    type: String,
    required: false,
  },

  documentUrl: {
    type: String,
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

  dropDownData: {
    type: Array,
    default: [],
  },

  educationDetails: {
    type: Array,
    default: [],
  },

  specialNeeds: {
    type: Array,
    default: {
      dyslexia: false,
      autism: false,
      adhd: false,
      angerManagement: false,
      slowLearner: false,
      downSyndrome: false,
    },
  },

  preferredLocations: {
    type: [String],
    default: ['All locations'],
  },

  levels: {
    type: [
      {
        name: { type: String, required: true }, // e.g., 'Primary', 'Lower Secondary', etc.
        subjects: { type: [String], default: [] },
        rate: { type: String, default: '10' }
      }
    ],
    default: [],
  }


  
},{ collection: 'Tutors' });

const Tutor = mongoose.model('Tutors', TutorSchema);

module.exports = Tutor;
