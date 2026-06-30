import mongoose, { Document, Schema, Types } from 'mongoose';

export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'reserved';

export interface IRoom extends Document {
  buildingId: Types.ObjectId;
  roomNumber: string;
  floor: number;
  capacity: number;
  hasStudyTable: boolean;
  hasWardrobe: boolean;
  hasAttachedWashroom: boolean;
  hasFan: boolean;
  status: RoomStatus;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    buildingId: { type: Schema.Types.ObjectId, ref: 'Building', required: true },
    roomNumber: { type: String, required: true, trim: true },
    floor: { type: Number, default: 1 },
    capacity: { type: Number, default: 2, min: 1 },
    hasStudyTable: { type: Boolean, default: false },
    hasWardrobe: { type: Boolean, default: false },
    hasAttachedWashroom: { type: Boolean, default: false },
    hasFan: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['available', 'occupied', 'maintenance', 'reserved'],
      default: 'available',
    },
  },
  { timestamps: true }
);

roomSchema.index({ buildingId: 1, roomNumber: 1 }, { unique: true });
roomSchema.index({ status: 1 });

export const Room = mongoose.model<IRoom>('Room', roomSchema);
