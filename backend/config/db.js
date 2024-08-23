const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://soorajbinary:8pvpKDX1DEPzTwOm@cluster0.povmgmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
