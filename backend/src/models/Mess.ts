import mongoose, { Document, Schema } from 'mongoose';

export interface IMess extends Document {
  day: string; // e.g. "monday", "tuesday"
  breakfast: string;
  lunch: string;
  snacks?: string;
  dinner: string;
  specialMeal?: string;
  mealAttendance: string[]; // array of student ids present
  feedback: {
    studentId: string;
    rating: number;
    comment: string;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const messSchema = new Schema<IMess>(
  {
    day: { type: String, required: true, unique: true, lowercase: true },
    breakfast: { type: String, required: true },
    lunch: { type: String, required: true },
    snacks: { type: String },
    dinner: { type: String, required: true },
    specialMeal: { type: String },
    mealAttendance: [{ type: String }],
    feedback: [
      {
        studentId: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Mess = mongoose.model<IMess>('Mess', messSchema);
