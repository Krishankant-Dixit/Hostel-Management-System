import mongoose, { Document, Schema, Types } from 'mongoose';

export type FeeType = 'hostel_fee' | 'mess_fee' | 'security_deposit' | 'maintenance_charges';
export type FeeStatus = 'paid' | 'unpaid' | 'overdue';

export interface IHostelFee extends Document {
  studentId: Types.ObjectId; // ref User
  amount: number;
  feeType: FeeType;
  dueDate: Date;
  status: FeeStatus;
  billingCycle: string; // e.g. "Fall 2026", "July 2026"
  createdAt: Date;
  updatedAt: Date;
}

const hostelFeeSchema = new Schema<IHostelFee>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 0 },
    feeType: {
      type: String,
      enum: ['hostel_fee', 'mess_fee', 'security_deposit', 'maintenance_charges'],
      required: true,
    },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['paid', 'unpaid', 'overdue'],
      default: 'unpaid',
    },
    billingCycle: { type: String, required: true },
  },
  { timestamps: true }
);

export const HostelFee = mongoose.model<IHostelFee>('HostelFee', hostelFeeSchema);
