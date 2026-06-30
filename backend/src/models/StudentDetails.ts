import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IStudentDetails extends Document {
  userId: Types.ObjectId; // ref User
  enrollmentNumber: string;
  course: string;
  department: string;
  year: number;
  parentContact: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentDetailsSchema = new Schema<IStudentDetails>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    enrollmentNumber: { type: String, required: true, unique: true, trim: true },
    course: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    parentContact: { type: String, required: true, trim: true },
    profilePhoto: { type: String },
  },
  { timestamps: true }
);

export const StudentDetails = mongoose.model<IStudentDetails>('StudentDetails', studentDetailsSchema);
