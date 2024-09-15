const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  postalCode: String,
  parentLastName: String,
  parentEmail: String,
  studentFirstName: String,
  studentLastName: String,
  studentGender: String,
  studentLevel: String,
  studentGrade: String,
  lessonsPerWeek: String,
  tuitionBudget: String,
  tutorGenderPreference: String,
  preferredStartDate: String,
  commitmentLength: String,
  termsAccepted: {
    type: Boolean,
    default: false,
  },
  courses: {
    type: [String],
    default: [],
  },
  expectations: String,
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
  educationLevel: String,
  experiences: String,
  tutorCategory: String,
  race: String,
  gender: String,
  profilePicUrl: String,  // Store Cloudinary URL
  documentUrl: String,    // Store Cloudinary URL
});

const Parent = mongoose.model('Parents', ParentSchema);

module.exports = Parent;
