import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI);
  console.log('MongoDB connected');
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});
