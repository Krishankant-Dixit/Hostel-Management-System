import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IRoomImage extends Document {
  roomId: Types.ObjectId;
  imageUrl: string;
  caption?: string;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: Date;
}

const roomImageSchema = new Schema<IRoomImage>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String, trim: true },
    isPrimary: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

roomImageSchema.index({ roomId: 1, sortOrder: 1 });

export const RoomImage = mongoose.model<IRoomImage>('RoomImage', roomImageSchema);
