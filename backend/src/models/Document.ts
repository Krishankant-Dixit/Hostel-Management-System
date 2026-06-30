import mongoose, { Document, Schema, Types } from 'mongoose';

export type DocType = 'id_proof' | 'admission_letter' | 'fee_receipt' | 'leave_doc';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface IDocument extends Document {
  userId: Types.ObjectId; // ref User
  docType: DocType;
  docUrl: string;
  verificationStatus: VerificationStatus;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    docType: {
      type: String,
      enum: ['id_proof', 'admission_letter', 'fee_receipt', 'leave_doc'],
      required: true,
    },
    docUrl: { type: String, required: true },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

export const DocumentModel = mongoose.model<IDocument>('Document', documentSchema);
