import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';
import { AppError } from '../../utils/AppError';
import {
  User,
  UserRole,
  RoomAssignment,
  Room,
  Building,
  RoomImage,
} from '../../models';
import { Types } from 'mongoose';

const signToken = (user: { _id: Types.ObjectId; email: string; role: UserRole }) =>
  jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as SignOptions
  );

export const authService = {
  async register(data: { email: string; password: string; fullName: string; phone?: string }) {
    const exists = await User.findOne({ email: data.email.toLowerCase() });
    if (exists) throw new AppError('Email already registered', 409);

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      email: data.email.toLowerCase(),
      passwordHash,
      fullName: data.fullName,
      phone: data.phone,
      role: 'student',
    });

    const token = signToken(user);
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new AppError('Invalid credentials', 401);

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new AppError('Invalid credentials', 401);

    const token = signToken(user);
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  },

  async getMe(userId: string) {
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) throw new AppError('User not found', 404);

    const assignment = await RoomAssignment.findOne({ userId, isActive: true });
    let room = null;

    if (assignment) {
      const roomDoc = await Room.findById(assignment.roomId);
      if (roomDoc) {
        const building = await Building.findById(roomDoc.buildingId);
        const images = await RoomImage.find({ roomId: roomDoc._id }).sort({ sortOrder: 1 });
        const assignments = await RoomAssignment.find({ roomId: roomDoc._id, isActive: true })
          .populate('userId', 'fullName email phone');

        room = {
          id: roomDoc._id,
          roomNumber: roomDoc.roomNumber,
          floor: roomDoc.floor,
          capacity: roomDoc.capacity,
          status: roomDoc.status,
          building,
          facilities: {
            studyTable: roomDoc.hasStudyTable,
            wardrobe: roomDoc.hasWardrobe,
            attachedWashroom: roomDoc.hasAttachedWashroom,
            fan: roomDoc.hasFan,
          },
          images,
          roommates: assignments.map((a) => a.userId),
        };
      }
    }

    return { user, room };
  },
};
