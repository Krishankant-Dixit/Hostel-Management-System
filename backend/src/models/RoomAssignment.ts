import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IRoomAssignment extends Document {
  roomId: Types.ObjectId;
  userId: Types.ObjectId;
  assignedAt: Date;
  leftAt?: Date;
  isActive: boolean;
}

const roomAssignmentSchema = new Schema<IRoomAssignment>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedAt: { type: Date, default: Date.now },
    leftAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: false }
);

roomAssignmentSchema.index({ roomId: 1, isActive: 1 });
roomAssignmentSchema.index({ userId: 1, isActive: 1 });
roomAssignmentSchema.index({ roomId: 1, userId: 1, isActive: 1 });

export const RoomAssignment = mongoose.model<IRoomAssignment>('RoomAssignment', roomAssignmentSchema);
