import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IIssueAttachment extends Document {
  issueId: Types.ObjectId;
  fileUrl: string;
  createdAt: Date;
}

const issueAttachmentSchema = new Schema<IIssueAttachment>(
  {
    issueId: { type: Schema.Types.ObjectId, ref: 'RoomIssue', required: true },
    fileUrl: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

issueAttachmentSchema.index({ issueId: 1 });

export const IssueAttachment = mongoose.model<IIssueAttachment>('IssueAttachment', issueAttachmentSchema);
