import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'student' | 'admin' | 'staff';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    role: { type: String, enum: ['student', 'admin', 'staff'], default: 'student' },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
