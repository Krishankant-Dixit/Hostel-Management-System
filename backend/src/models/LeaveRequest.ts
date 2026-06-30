import mongoose, { Document, Schema, Types } from 'mongoose';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface ILeaveRequest extends Document {
  studentId: Types.ObjectId; // ref User
  reason: string;
  fromDate: Date;
  toDate: Date;
  destination: string;
  parentApproved: boolean;
  status: LeaveStatus;
  approvedById?: Types.ObjectId; // ref User (Warden)
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leaveRequestSchema = new Schema<ILeaveRequest>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true, trim: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    destination: { type: String, required: true, trim: true },
    parentApproved: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedById: { type: Schema.Types.ObjectId, ref: 'User' },
    remarks: { type: String },
  },
  { timestamps: true }
);

export const LeaveRequest = mongoose.model<ILeaveRequest>('LeaveRequest', leaveRequestSchema);
