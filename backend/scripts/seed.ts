import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {
  User,
  Building,
  Room,
  RoomImage,
  RoomAssignment,
  IssueCategory,
  RoomIssue,
} from '../src/models';

dotenv.config();

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hms';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Building.deleteMany({}),
    Room.deleteMany({}),
    RoomImage.deleteMany({}),
    RoomAssignment.deleteMany({}),
    IssueCategory.deleteMany({}),
    RoomIssue.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash('Password123!', 12);

  const admin = await User.create({
    email: 'admin@hms.local',
    passwordHash,
    fullName: 'System Admin',
    role: 'admin',
    phone: '9999999999',
  });

  const student1 = await User.create({
    email: 'john@student.local',
    passwordHash,
    fullName: 'John Doe',
    role: 'student',
    phone: '9876543210',
  });

  const student2 = await User.create({
    email: 'jane@student.local',
    passwordHash,
    fullName: 'Jane Smith',
    role: 'student',
    phone: '9876543211',
  });

  const building = await Building.create({
    name: 'Block A',
    code: 'A',
  });

  const room = await Room.create({
    buildingId: building._id,
    roomNumber: '204',
    floor: 2,
    capacity: 2,
    hasStudyTable: true,
    hasWardrobe: true,
    hasAttachedWashroom: true,
    hasFan: true,
    status: 'occupied',
  });

  await RoomAssignment.create([
    { roomId: room._id, userId: student1._id, isActive: true },
    { roomId: room._id, userId: student2._id, isActive: true },
  ]);

  await RoomImage.create([
    {
      roomId: room._id,
      imageUrl: '/uploads/rooms/sample-room-1.jpg',
      caption: 'Room overview',
      isPrimary: true,
      sortOrder: 0,
    },
    {
      roomId: room._id,
      imageUrl: '/uploads/rooms/sample-room-2.jpg',
      caption: 'Study area',
      isPrimary: false,
      sortOrder: 1,
    },
  ]);

  const categories = [
    { name: 'Facility Broken', slug: 'facility_broken' },
    { name: 'Maintenance Required', slug: 'maintenance_required' },
    { name: 'Cleanliness', slug: 'cleanliness' },
    { name: 'Electrical', slug: 'electrical' },
    { name: 'Plumbing', slug: 'plumbing' },
    { name: 'Other', slug: 'other' },
  ];

  const createdCategories = await IssueCategory.insertMany(categories);

  await RoomIssue.create({
    roomId: room._id,
    reportedById: student1._id,
    categoryId: createdCategories[0]._id,
    title: 'Fan not working properly',
    description: 'The ceiling fan makes noise and spins slowly since yesterday evening.',
    facilityType: 'fan',
    priority: 'high',
    status: 'open',
  });

  console.log('\n--- Seed completed successfully ---');
  console.log('Admin:    admin@hms.local     | Password: Password123!');
  console.log('Student:  john@student.local  | Password: Password123!');
  console.log('Student:  jane@student.local  | Password: Password123!');
  console.log(`Room:     Block A - ${room.roomNumber}`);
  console.log('-----------------------------------\n');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
