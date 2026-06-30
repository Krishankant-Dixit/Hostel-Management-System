import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IRoomAllocation extends Document {
  studentId: Types.ObjectId; // ref User
  roomId: Types.ObjectId; // ref Room
  allocatedBy: Types.ObjectId; // ref User
  allocationDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roomAllocationSchema = new Schema<IRoomAllocation>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    allocatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    allocationDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const RoomAllocation = mongoose.model<IRoomAllocation>('RoomAllocation', roomAllocationSchema);
