import mongoose, { Document, Schema, Types } from 'mongoose';

export type FacilityType =
  | 'study_table'
  | 'wardrobe'
  | 'attached_washroom'
  | 'fan'
  | 'general'
  | 'other';

export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';
export type IssueStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'rejected';

export interface IRoomIssue extends Document {
  roomId: Types.ObjectId;
  reportedById: Types.ObjectId;
  categoryId?: Types.ObjectId;
  title: string;
  description: string;
  facilityType?: FacilityType;
  priority: IssuePriority;
  status: IssueStatus;
  assignedToId?: Types.ObjectId;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const roomIssueSchema = new Schema<IRoomIssue>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    reportedById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'IssueCategory' },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true },
    facilityType: {
      type: String,
      enum: ['study_table', 'wardrobe', 'attached_washroom', 'fan', 'general', 'other'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed', 'rejected'],
      default: 'open',
    },
    assignedToId: { type: Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

roomIssueSchema.index({ roomId: 1 });
roomIssueSchema.index({ status: 1 });
roomIssueSchema.index({ reportedById: 1 });

export const RoomIssue = mongoose.model<IRoomIssue>('RoomIssue', roomIssueSchema);
