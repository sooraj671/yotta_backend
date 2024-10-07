const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
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


  phoneNumber: {
    type: String,
    required: true,
  },

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',  // Reference to Students collection
  }],
  
},{ collection: 'Parents' });

const Parent = mongoose.model('Parents', ParentSchema);

module.exports = Parent;
