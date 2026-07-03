const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  // Relationship: Kis student ki fee hai
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  semester: {
    type: String,
    required: true, // e.g., "Semester 1", "Year 2026"
  },
  baseHostelFee: {
    type: Number,
    required: true
  },
  messFee: {
    type: Number,
    default: 0
  },
  laundryOrExtraCharges: {
    type: Number,
    default: 0
  },
  fineAmount: {
    type: Number,
    default: 0 // Agar late payment ho to admin add kar sake
  },
  totalAmount: {
    type: Number,
    required: true
    // Logic note: Controller me (baseHostelFee + messFee + extras + fine) calculate karke save karna
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Partially Paid', 'Paid'],
    default: 'Unpaid'
  },
  dueDate: {
    type: Date,
    required: true
  },
  // Production Feature: To store receipt details after online payment
  transactionId: {
    type: String,
    default: null
  },
  paymentDate: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Fee', FeeSchema);