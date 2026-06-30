import { Types } from 'mongoose';
import { AppError } from '../../utils/AppError';
import { Room, Building, RoomImage, RoomAssignment } from '../../models';
import { IRoom } from '../../models';

const formatRoom = async (room: IRoom) => {
  const building = await Building.findById(room.buildingId);
  const images = await RoomImage.find({ roomId: room._id }).sort({ sortOrder: 1 });
  const assignments = await RoomAssignment.find({ roomId: room._id, isActive: true }).populate(
    'userId',
    'fullName email phone'
  );

  return {
    id: room._id,
    roomNumber: room.roomNumber,
    floor: room.floor,
    capacity: room.capacity,
    status: room.status,
    building,
    facilities: {
      studyTable: room.hasStudyTable,
      wardrobe: room.hasWardrobe,
      attachedWashroom: room.hasAttachedWashroom,
      fan: room.hasFan,
    },
    images,
    roommates: assignments.map((a) => a.userId),
  };
};

export const roomsService = {
  async list(filters: {
    buildingId?: string;
    status?: string;
    hasStudyTable?: boolean;
    hasWardrobe?: boolean;
    hasAttachedWashroom?: boolean;
    hasFan?: boolean;
  }) {
    const query: Record<string, unknown> = {};

    if (filters.buildingId && Types.ObjectId.isValid(filters.buildingId)) {
      query.buildingId = filters.buildingId;
    }
    if (filters.status) query.status = filters.status;
    if (filters.hasStudyTable !== undefined) query.hasStudyTable = filters.hasStudyTable;
    if (filters.hasWardrobe !== undefined) query.hasWardrobe = filters.hasWardrobe;
    if (filters.hasAttachedWashroom !== undefined) query.hasAttachedWashroom = filters.hasAttachedWashroom;
    if (filters.hasFan !== undefined) query.hasFan = filters.hasFan;

    const rooms = await Room.find(query).sort({ roomNumber: 1 });
    return Promise.all(rooms.map(formatRoom));
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid room id', 400);
    const room = await Room.findById(id);
    if (!room) throw new AppError('Room not found', 404);
    return formatRoom(room);
  },

  async getFacilities(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid room id', 400);
    const room = await Room.findById(id).select(
      'hasStudyTable hasWardrobe hasAttachedWashroom hasFan'
    );
    if (!room) throw new AppError('Room not found', 404);
    return {
      studyTable: room.hasStudyTable,
      wardrobe: room.hasWardrobe,
      attachedWashroom: room.hasAttachedWashroom,
      fan: room.hasFan,
    };
  },

  async create(data: {
    buildingId: string;
    roomNumber: string;
    floor?: number;
    capacity?: number;
    hasStudyTable?: boolean;
    hasWardrobe?: boolean;
    hasAttachedWashroom?: boolean;
    hasFan?: boolean;
    status?: string;
  }) {
    if (!Types.ObjectId.isValid(data.buildingId)) throw new AppError('Invalid building id', 400);
    const building = await Building.findById(data.buildingId);
    if (!building) throw new AppError('Building not found', 404);

    const room = await Room.create(data);
    return formatRoom(room);
  },

  async update(id: string, data: Record<string, unknown>) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid room id', 400);
    const room = await Room.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!room) throw new AppError('Room not found', 404);
    return formatRoom(room);
  },

  async listBuildings() {
    return Building.find().sort({ code: 1 });
  },

  async createBuilding(data: { name: string; code: string }) {
    return Building.create({ name: data.name, code: data.code.toUpperCase() });
  },
};
