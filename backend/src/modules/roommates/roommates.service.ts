import { Types } from 'mongoose';
import { AppError } from '../../utils/AppError';
import { Room, RoomAssignment, User } from '../../models';

export const roommatesService = {
  async getByRoom(roomId: string) {
    if (!Types.ObjectId.isValid(roomId)) throw new AppError('Invalid room id', 400);
    const room = await Room.findById(roomId);
    if (!room) throw new AppError('Room not found', 404);

    const assignments = await RoomAssignment.find({ roomId, isActive: true }).populate(
      'userId',
      'fullName email phone'
    );

    return assignments.map((a) => ({
      id: a._id,
      assignedAt: a.assignedAt,
      user: a.userId,
    }));
  },

  async getMyRoommates(userId: string) {
    const assignment = await RoomAssignment.findOne({ userId, isActive: true });
    if (!assignment) throw new AppError('You are not assigned to any room', 404);
    return this.getByRoom(assignment.roomId.toString());
  },

  async assign(roomId: string, userId: string) {
    if (!Types.ObjectId.isValid(roomId)) throw new AppError('Invalid room id', 400);
    if (!Types.ObjectId.isValid(userId)) throw new AppError('Invalid user id', 400);

    const room = await Room.findById(roomId);
    if (!room) throw new AppError('Room not found', 404);

    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const activeCount = await RoomAssignment.countDocuments({ roomId, isActive: true });
    if (activeCount >= room.capacity) {
      throw new AppError('Room is at full capacity', 400);
    }

    const existing = await RoomAssignment.findOne({ roomId, userId, isActive: true });
    if (existing) throw new AppError('User already assigned to this room', 409);

    const otherActive = await RoomAssignment.findOne({ userId, isActive: true });
    if (otherActive) {
      throw new AppError('User is already assigned to another room', 400);
    }

    const assignment = await RoomAssignment.create({ roomId, userId });

    if (room.status === 'available') {
      room.status = 'occupied';
      await room.save();
    }

    const populated = await RoomAssignment.findById(assignment._id).populate(
      'userId',
      'fullName email phone'
    );

    return populated;
  },

  async unassign(roomId: string, userId: string) {
    if (!Types.ObjectId.isValid(roomId)) throw new AppError('Invalid room id', 400);
    if (!Types.ObjectId.isValid(userId)) throw new AppError('Invalid user id', 400);

    const assignment = await RoomAssignment.findOne({ roomId, userId, isActive: true });
    if (!assignment) throw new AppError('Active assignment not found', 404);

    assignment.isActive = false;
    assignment.leftAt = new Date();
    await assignment.save();

    const remaining = await RoomAssignment.countDocuments({ roomId, isActive: true });
    if (remaining === 0) {
      await Room.findByIdAndUpdate(roomId, { status: 'available' });
    }

    return { message: 'User unassigned successfully' };
  },
};
