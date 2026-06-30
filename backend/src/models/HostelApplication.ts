import mongoose, { Document, Schema, Types } from 'mongoose';

export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'allocated';

export interface IHostelApplication extends Document {
  studentId: Types.ObjectId; // ref User
  course: string;
  year: number;
  preferredHostelId: Types.ObjectId; // ref Hostel
  preferredRoomType: 'single' | 'double' | 'triple' | 'dorm';
  documents: { name: string; url: string }[];
  status: ApplicationStatus;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const hostelApplicationSchema = new Schema<IHostelApplication>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    preferredHostelId: { type: Schema.Types.ObjectId, ref: 'Hostel', required: true },
    preferredRoomType: {
      type: String,
      enum: ['single', 'double', 'triple', 'dorm'],
      required: true,
    },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected', 'allocated'],
      default: 'pending',
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

export const HostelApplication = mongoose.model<IHostelApplication>('HostelApplication', hostelApplicationSchema);
