import mongoose, { Document, Schema } from 'mongoose';

export interface IEmergencyContact extends Document {
  name: string;
  relation: string;
  phone: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const emergencyContactSchema = new Schema<IEmergencyContact>(
  {
    name: { type: String, required: true, trim: true },
    relation: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const EmergencyContact = mongoose.model<IEmergencyContact>('EmergencyContact', emergencyContactSchema);
