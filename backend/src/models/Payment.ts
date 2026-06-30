import mongoose, { Document, Schema, Types } from 'mongoose';

export type PaymentMethod = 'upi' | 'credit_card' | 'debit_card' | 'net_banking';
export type PaymentStatus = 'success' | 'failed' | 'pending';

export interface IPayment extends Document {
  studentId: Types.ObjectId; // ref User
  feeId: Types.ObjectId; // ref HostelFee
  amount: number;
  transactionId: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paymentDate: Date;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feeId: { type: Schema.Types.ObjectId, ref: 'HostelFee', required: true },
    amount: { type: Number, required: true, min: 0 },
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: {
      type: String,
      enum: ['upi', 'credit_card', 'debit_card', 'net_banking'],
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
    },
    paymentDate: { type: Date, default: Date.now },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
