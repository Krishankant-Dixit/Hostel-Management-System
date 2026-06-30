import mongoose, { Document, Schema, Types } from 'mongoose';

export type AttendanceType = 'check_in' | 'check_out' | 'daily';
export type AttendanceMethod = 'qr' | 'manual' | 'biometric';
export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface IAttendance extends Document {
  studentId: Types.ObjectId; // ref User
  type: AttendanceType;
  method: AttendanceMethod;
  status: AttendanceStatus;
  date: string; // YYYY-MM-DD
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['check_in', 'check_out', 'daily'],
      required: true,
    },
    method: {
      type: String,
      enum: ['qr', 'manual', 'biometric'],
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'present',
    },
    date: { type: String, required: true }, // Format: YYYY-MM-DD for indexing and filtering
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

attendanceSchema.index({ studentId: 1, date: 1, type: 1 }, { unique: true });

export const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);
