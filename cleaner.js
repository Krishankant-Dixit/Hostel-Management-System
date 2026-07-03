// cleaner.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');
const Student = require('./models/Student');
const Fee = require('./models/Fee');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✓ Connected to MongoDB for Cleaning..."))
  .catch((err) => console.error(err));

const clearAllData = async () => {
  try {
    // Yeh command sab kuch permanently delete kar degi
    await Room.deleteMany();
    await Student.deleteMany();
    await Fee.deleteMany();
    
    console.log('🗑️ SUCCESS: Entire Database Cleared! Project is now 100% fresh for production.');
    process.exit();
  } catch (error) {
    console.error('Error cleaning DB:', error);
    process.exit(1);
  }
};

clearAllData();


// node cleaner.js