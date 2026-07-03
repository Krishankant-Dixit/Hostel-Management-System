// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room'); // Tumhara Room model path

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✓ MongoDB Connected for Seeding..."))
  .catch((err) => console.error("✗ Connection Error:", err));

// 1. Tumhara puraana hardcoded data yahan daalo
const dummyRooms = [
  { roomNumber: "101", floor: 1, roomType: "Single", isAC: true, capacity: 1, currentOccupantsCount: 0, status: "Available", pricePerSemester: 45000 },
  { roomNumber: "102", floor: 1, roomType: "Double", isAC: false, capacity: 2, currentOccupantsCount: 0, status: "Available", pricePerSemester: 30000 },
  { roomNumber: "103", floor: 1, roomType: "Double", isAC: true, capacity: 2, currentOccupantsCount: 0, status: "Available", pricePerSemester: 38000 },
  { roomNumber: "201", floor: 2, roomType: "Triple", isAC: false, capacity: 3, currentOccupantsCount: 0, status: "Available", pricePerSemester: 25000 },
  { roomNumber: "202", floor: 2, roomType: "Four-Sharing", isAC: false, capacity: 4, currentOccupantsCount: 0, status: "Available", pricePerSemester: 20000 },
];

// 2. Data Function
const importData = async () => {
  try {
    // Purane data ko clean karo taaki duplicate error na aaye
    await Room.deleteMany();
    console.log('✓ Old Rooms Cleared.');

    // Naya data insert karo
    await Room.insertMany(dummyRooms);
    console.log('✓ 100% Real Dummy Data Imported to MongoDB Successfully!');
    
    process.exit();
  } catch (error) {
    console.error(`✗ Error data import karne me: ${error.message}`);
    process.exit(1);
  }
};

// Script execute karo
importData();


// node seeder.js