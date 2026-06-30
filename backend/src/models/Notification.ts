import mongoose, { Document, Schema, Types } from 'mongoose';

export type NotificationType = 'fee' | 'room' | 'complaint' | 'leave' | 'mess' | 'general';

export interface INotification extends Document {
  userId: Types.ObjectId; // ref User
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['fee', 'room', 'complaint', 'leave', 'mess', 'general'],
      default: 'general',
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
