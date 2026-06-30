import mongoose, { Document, Schema } from 'mongoose';

export interface IIssueCategory extends Document {
  name: string;
  slug: string;
}

const issueCategorySchema = new Schema<IIssueCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: false }
);

export const IssueCategory = mongoose.model<IIssueCategory>('IssueCategory', issueCategorySchema);
