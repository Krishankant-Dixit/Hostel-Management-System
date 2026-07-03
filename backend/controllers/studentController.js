const Student = require('../models/Student');
const Room = require('../models/Room');

/**
 * @desc    Register a new student and automatically allocate an available room
 * @route   POST /api/students/register
 * @access  Private (Warden/Admin only)
 */
exports.registerStudentAndAllocateRoom = async (req, res) => {
  const { 
    firebaseUid, rollNumber, firstName, lastName, 
    email, phoneNumber, guardianName, guardianPhone, 
    roomType, isACNeeded 
  } = req.body;

  try {
    // 1. Validation: Check karo student pehle se exist to nahi karta
    const existingStudent = await Student.findOne({ 
      $or: [{ rollNumber }, { email }, { firebaseUid }] 
    });
    
    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student with this Roll Number, Email, or Firebase UID already exists.' 
      });
    }

    // 2. Business Logic: Khali room dundo jo student ki criteria match kare
    // Hum aisa room dundenge jahan currentOccupantsCount < capacity ho aur status 'Available' ho
    const availableRoom = await Room.findOne({
      roomType: roomType || 'Double',
      isAC: isACNeeded || false,
      status: 'Available',
      $expr: { $lt: ["$currentOccupantsCount", "$capacity"] }
    }).sort({ currentOccupantsCount: -1 }); // Priority us room ko do jo pehle se thoda bhara hai taaki rooms efficiently fill hon

    if (!availableRoom) {
      return res.status(404).json({ 
        success: false, 
        message: 'No available rooms matching your preference (AC/Non-AC or Type) were found.' 
      });
    }

    // 3. Save Student to Database with the allocated room reference
    const newStudent = new Student({
      firebaseUid,
      rollNumber,
      firstName,
      lastName,
      email,
      phoneNumber,
      guardianName,
      guardianPhone,
      allocatedRoom: availableRoom._id // Linking Room's MongoDB Object ID
    });

    await newStudent.save();

    // 4. Update the Allocated Room counters
    availableRoom.currentOccupantsCount += 1;

    // Agar room full ho gaya hai to uska status update karke 'Full' kar do
    if (availableRoom.currentOccupantsCount >= availableRoom.capacity) {
      availableRoom.status = 'Full';
    }

    await availableRoom.save();

    // 5. Response send karo success message aur details ke sath
    return res.status(201).json({
      success: true,
      message: `Student registered successfully and allocated to Room ${availableRoom.roomNumber}`,
      data: {
        student: {
          id: newStudent._id,
          fullName: `${newStudent.firstName} ${newStudent.lastName}`,
          rollNumber: newStudent.rollNumber
        },
        room: {
          roomNumber: availableRoom.roomNumber,
          floor: availableRoom.floor,
          occupantsNow: availableRoom.currentOccupantsCount
        }
      }
    });

  } catch (error) {
    console.error("Error in Room Allocation Logic:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during allocation. Please try again.',
      error: error.message 
    });
  }
};