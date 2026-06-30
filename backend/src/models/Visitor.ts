import mongoose, { Document, Schema, Types } from 'mongoose';

export type VisitorStatus = 'pending_student' | 'pending_warden' | 'approved' | 'entered' | 'exited' | 'rejected';

export interface IVisitor extends Document {
  visitorName: string;
  relation: string;
  phone: string;
  studentId: Types.ObjectId; // ref User
  visitTime: Date;
  exitTime?: Date;
  status: VisitorStatus;
  approvedById?: Types.ObjectId; // ref User (Warden)
  createdAt: Date;
  updatedAt: Date;
}

const visitorSchema = new Schema<IVisitor>(
  {
    visitorName: { type: String, required: true, trim: true },
    relation: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    visitTime: { type: Date, required: true },
    exitTime: { type: Date },
    status: {
      type: String,
      enum: ['pending_student', 'pending_warden', 'approved', 'entered', 'exited', 'rejected'],
      default: 'pending_student',
    },
    approvedById: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Visitor = mongoose.model<IVisitor>('Visitor', visitorSchema);
