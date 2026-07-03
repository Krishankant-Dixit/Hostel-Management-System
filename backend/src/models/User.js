const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Warden', 'Staff'],
    default: 'Warden'
  },
  // Agar warden kisi specific hostel block ka hai (e.g., "Block-A")
  assignedBlock: {
    type: String,
    default: 'All'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);