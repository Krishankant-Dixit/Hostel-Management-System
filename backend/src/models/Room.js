const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    unique: true,
    trim: true
  },
  floor: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,
    enum: ['Single', 'Double', 'Triple', 'Four-Sharing'],
    default: 'Double'
  },
  isAC: {
    type: Boolean,
    default: false
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  // Dynamic calculation ke liye: Kitne log abhi rehte hain
  currentOccupantsCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Available', 'Full', 'Under Maintenance'],
    default: 'Available'
  },
  pricePerSemester: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);