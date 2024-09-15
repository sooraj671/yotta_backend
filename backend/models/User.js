const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
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
  role: String
},{ collection: 'Users' });

const User = mongoose.model('Users', UserSchema);

module.exports = User;
