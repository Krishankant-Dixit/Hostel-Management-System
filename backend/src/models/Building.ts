import mongoose, { Document, Schema } from 'mongoose';

export interface IBuilding extends Document {
  name: string;
  code: string;
  createdAt: Date;
}

const buildingSchema = new Schema<IBuilding>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Building = mongoose.model<IBuilding>('Building', buildingSchema);
