import mongoose, { Document, Schema, Types } from 'mongoose';
import { IssueStatus } from './RoomIssue';

export interface IIssueStatusLog extends Document {
  issueId: Types.ObjectId;
  changedById: Types.ObjectId;
  oldStatus?: IssueStatus;
  newStatus: IssueStatus;
  note?: string;
  createdAt: Date;
}

const issueStatusLogSchema = new Schema<IIssueStatusLog>(
  {
    issueId: { type: Schema.Types.ObjectId, ref: 'RoomIssue', required: true },
    changedById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    oldStatus: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed', 'rejected'],
    },
    newStatus: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed', 'rejected'],
      required: true,
    },
    note: { type: String, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

issueStatusLogSchema.index({ issueId: 1 });

export const IssueStatusLog = mongoose.model<IIssueStatusLog>('IssueStatusLog', issueStatusLogSchema);
