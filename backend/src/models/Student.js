const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true // Directly links with Firebase Auth
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  guardianName: {
    type: String,
    required: true
  },
  guardianPhone: {
    type: String,
    required: true
  },
  // Relationship: Ek student kis room me allocated hai
  allocatedRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    default: null
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Graduated', 'Suspended', 'Left'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);