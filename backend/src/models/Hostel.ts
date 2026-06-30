import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IHostel extends Document {
  name: string;
  type: string; // e.g., 'classic', 'premium', 'standard'
  gender: 'boys' | 'girls' | 'co-ed';
  capacity: number;
  address: string;
  description?: string;
  images: string[];
  warden?: Types.ObjectId; // ref to User (Warden role)
  createdAt: Date;
  updatedAt: Date;
}

const hostelSchema = new Schema<IHostel>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    type: { type: String, default: 'standard' },
    gender: { type: String, enum: ['boys', 'girls', 'co-ed'], required: true },
    capacity: { type: Number, required: true, min: 1 },
    address: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    warden: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Hostel = mongoose.model<IHostel>('Hostel', hostelSchema);
