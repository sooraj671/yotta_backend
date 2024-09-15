const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://soorajbinary:GnCxFhHh7By6lXnl@cluster0.povmgmh.mongodb.net/yotta_academy_db?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB Connected to yotta_academy_db');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
