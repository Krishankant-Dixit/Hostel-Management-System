import { createSlice } from '@reduxjs/toolkit';

// Retrieve from localStorage or set up default mock state
const loadInitialState = () => {
  const localData = localStorage.getItem('hms_state');
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.error("Failed to parse local state, loading default seed data", e);
    }
  }

  // --- Seed Data ---
  const defaultUsers = [
    { id: 'usr-admin', email: 'admin@hms.local', fullName: 'System Admin', role: 'admin', phone: '9999999999', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: 'usr-warden', email: 'warden@hms.local', fullName: 'Dr. Robert Carter', role: 'warden', phone: '9888888888', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 'usr-staff', email: 'staff@hms.local', fullName: 'Marcus Vance', role: 'staff', phone: '9777777777', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 'usr-john', email: 'john@student.local', fullName: 'John Doe', role: 'student', phone: '9876543210', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 'usr-jane', email: 'jane@student.local', fullName: 'Jane Smith', role: 'student', phone: '9876543211', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 'usr-alan', email: 'alan@student.local', fullName: 'Alan Turing', role: 'student', phone: '9876543212', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100' }
  ];

  const defaultStudentDetails = [
    { userId: 'usr-john', enrollmentNumber: 'EN102948', course: 'Computer Science & Engineering', department: 'CSE', year: 3, parentContact: '9123456789', profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', hostelId: 'hst-boys-a', roomId: 'rom-204' },
    { userId: 'usr-jane', enrollmentNumber: 'EN102949', course: 'Information Technology', department: 'IT', year: 3, parentContact: '9123456780', profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', hostelId: 'hst-girls-a', roomId: 'rom-105' },
    { userId: 'usr-alan', enrollmentNumber: 'EN102950', course: 'Mathematics', department: 'Maths', year: 2, parentContact: '9123456781', profilePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', hostelId: '', roomId: '' }
  ];

  const defaultHostels = [
    { id: 'hst-boys-a', name: 'Boys Hostel A', type: 'Premium', gender: 'boys', capacity: 500, address: 'Campus Block A, Tech University', description: 'Modern air-conditioned boys hostel equipped with study rooms, high-speed WiFi, and recreation center.', images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500'], wardenId: 'usr-warden' },
    { id: 'hst-boys-b', name: 'Boys Hostel B', type: 'Standard', gender: 'boys', capacity: 300, address: 'Campus Block B, Tech University', description: 'Standard double and triple sharing room accommodations for senior boys.', images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500'], wardenId: 'usr-warden' },
    { id: 'hst-girls-a', name: 'Girls Hostel A', type: 'Premium', gender: 'girls', capacity: 400, address: 'Campus Block G1, Tech University', description: 'Fully secure premium girls residence block with separate gym, salon, and common courtyard.', images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'], wardenId: 'usr-warden' },
    { id: 'hst-girls-b', name: 'Girls Hostel B', type: 'Standard', gender: 'girls', capacity: 250, address: 'Campus Block G2, Tech University', description: 'Standard double sharing girls block close to the central college library.', images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500'], wardenId: 'usr-warden' }
  ];

  const defaultRooms = [
    { id: 'rom-204', hostelId: 'hst-boys-a', roomNumber: '204', floor: 2, capacity: 2, currentOccupancy: 1, roomType: 'Double Sharing', status: 'Occupied', studyTable: true, wardrobe: true, washroom: true, fan: true },
    { id: 'rom-205', hostelId: 'hst-boys-a', roomNumber: '205', floor: 2, capacity: 2, currentOccupancy: 0, roomType: 'Double Sharing', status: 'Available', studyTable: true, wardrobe: true, washroom: true, fan: true },
    { id: 'rom-105', hostelId: 'hst-girls-a', roomNumber: '105', floor: 1, capacity: 1, currentOccupancy: 1, roomType: 'Single Sharing', status: 'Occupied', studyTable: true, wardrobe: true, washroom: true, fan: true },
    { id: 'rom-305', hostelId: 'hst-boys-a', roomNumber: '305', floor: 3, capacity: 3, currentOccupancy: 0, roomType: 'Triple Sharing', status: 'Under Maintenance', studyTable: true, wardrobe: false, washroom: true, fan: false }
  ];

  const defaultApplications = [
    { id: 'app-1', studentId: 'usr-john', course: 'Computer Science & Engineering', year: 3, preferredHostelId: 'hst-boys-a', preferredRoomType: 'double', status: 'allocated', remarks: 'Room 204 Allocated.', documents: [{ name: 'ID Proof.pdf', url: '#' }, { name: 'Admission Letter.pdf', url: '#' }], date: '2026-06-15' },
    { id: 'app-2', studentId: 'usr-jane', course: 'Information Technology', year: 3, preferredHostelId: 'hst-girls-a', preferredRoomType: 'single', status: 'allocated', remarks: 'Room 105 Allocated.', documents: [{ name: 'ID Proof.pdf', url: '#' }], date: '2026-06-18' },
    { id: 'app-3', studentId: 'usr-alan', course: 'Mathematics', year: 2, preferredHostelId: 'hst-boys-a', preferredRoomType: 'double', status: 'pending', remarks: '', documents: [{ name: 'ID Proof.pdf', url: '#' }], date: '2026-06-28' }
  ];

  const defaultAllocations = [
    { id: 'alc-1', studentId: 'usr-john', roomId: 'rom-204', allocatedBy: 'usr-warden', allocationDate: '2026-06-20', isActive: true },
    { id: 'alc-2', studentId: 'usr-jane', roomId: 'rom-105', allocatedBy: 'usr-warden', allocationDate: '2026-06-21', isActive: true }
  ];

  const defaultFees = [
    { id: 'fee-1', studentId: 'usr-john', amount: 45000, feeType: 'hostel_fee', dueDate: '2026-07-15', status: 'unpaid', billingCycle: 'Fall Semester 2026' },
    { id: 'fee-2', studentId: 'usr-john', amount: 15000, feeType: 'mess_fee', dueDate: '2026-07-15', status: 'paid', billingCycle: 'July 2026' },
    { id: 'fee-3', studentId: 'usr-john', amount: 5000, feeType: 'security_deposit', dueDate: '2026-06-10', status: 'paid', billingCycle: 'One Time Deposit' },
    { id: 'fee-4', studentId: 'usr-jane', amount: 60000, feeType: 'hostel_fee', dueDate: '2026-07-15', status: 'unpaid', billingCycle: 'Fall Semester 2026' },
    { id: 'fee-5', studentId: 'usr-jane', amount: 15000, feeType: 'mess_fee', dueDate: '2026-07-15', status: 'paid', billingCycle: 'July 2026' }
  ];

  const defaultPayments = [
    { id: 'pay-1', studentId: 'usr-john', feeId: 'fee-2', amount: 15000, transactionId: 'TXN-932148209', paymentMethod: 'upi', status: 'success', paymentDate: '2026-06-28T14:30:00Z', razorpayOrderId: 'order_abc123', razorpayPaymentId: 'pay_xyz123' },
    { id: 'pay-2', studentId: 'usr-john', feeId: 'fee-3', amount: 5000, transactionId: 'TXN-932148102', paymentMethod: 'credit_card', status: 'success', paymentDate: '2026-06-10T11:00:00Z', razorpayOrderId: 'order_abc111', razorpayPaymentId: 'pay_xyz111' },
    { id: 'pay-3', studentId: 'usr-jane', feeId: 'fee-5', amount: 15000, transactionId: 'TXN-932148332', paymentMethod: 'net_banking', status: 'success', paymentDate: '2026-06-29T09:15:00Z', razorpayOrderId: 'order_abc222', razorpayPaymentId: 'pay_xyz222' }
  ];

  const defaultAttendance = [
    { id: 'att-1', studentId: 'usr-john', type: 'check_in', method: 'qr', status: 'present', date: '2026-06-30', timestamp: '2026-06-30T21:15:00Z' },
    { id: 'att-2', studentId: 'usr-john', type: 'check_out', method: 'qr', status: 'present', date: '2026-06-30', timestamp: '2026-06-30T08:30:00Z' },
    { id: 'att-3', studentId: 'usr-john', type: 'check_in', method: 'manual', status: 'present', date: '2026-06-29', timestamp: '2026-06-29T21:05:00Z' },
    { id: 'att-4', studentId: 'usr-jane', type: 'check_in', method: 'qr', status: 'present', date: '2026-06-30', timestamp: '2026-06-30T20:55:00Z' }
  ];

  const defaultLeaveRequests = [
    { id: 'lve-1', studentId: 'usr-john', reason: 'Going home for sister\'s wedding', fromDate: '2026-07-02', toDate: '2026-07-07', destination: 'Chicago, IL', parentApproved: true, status: 'pending', approvedById: '', remarks: '' },
    { id: 'lve-2', studentId: 'usr-jane', reason: 'Family medical emergency', fromDate: '2026-06-25', toDate: '2026-06-28', destination: 'Boston, MA', parentApproved: true, status: 'approved', approvedById: 'usr-warden', remarks: 'Granted. Take care.' }
  ];

  const defaultVisitors = [
    { id: 'vis-1', visitorName: 'Richard Doe', relation: 'Father', phone: '9898989898', studentId: 'usr-john', visitTime: '2026-07-01T10:00:00.000Z', exitTime: '2026-07-01T16:00:00.000Z', status: 'exited', approvedById: 'usr-warden' },
    { id: 'vis-2', visitorName: 'Sarah Smith', relation: 'Mother', phone: '9797979797', studentId: 'usr-jane', visitTime: '2026-07-03T14:00:00.000Z', status: 'approved', approvedById: 'usr-warden' },
    { id: 'vis-3', visitorName: 'Donald Doe', relation: 'Uncle', phone: '9696969696', studentId: 'usr-john', visitTime: '2026-07-02T11:00:00.000Z', status: 'pending_warden' }
  ];

  const defaultComplaints = [
    { id: 'cmp-1', studentId: 'usr-john', category: 'electrical', title: 'Ceiling fan makes noise', description: 'The ceiling fan makes noise and spins slowly since yesterday evening. Room 204.', roomNo: '204', assignedToId: 'usr-staff', priority: 'high', status: 'in_progress', logs: [{ date: '2026-06-30T10:00:00Z', comment: 'Complaint registered' }, { date: '2026-06-30T12:00:00Z', comment: 'Assigned to Staff Marcus Vance' }] },
    { id: 'cmp-2', studentId: 'usr-jane', category: 'internet', title: 'WiFi disconnected', description: 'Campus WiFi is not reaching Room 105. Signals drop frequently.', roomNo: '105', assignedToId: '', priority: 'medium', status: 'open', logs: [{ date: '2026-07-01T01:00:00Z', comment: 'Complaint registered' }] }
  ];

  const defaultInventory = [
    { id: 'inv-1', itemType: 'bed', hostelId: 'hst-boys-a', quantity: 250, condition: 'good', maintenanceHistory: [{ date: '2026-05-10', description: 'Stock verification and polish' }] },
    { id: 'inv-2', itemType: 'fan', hostelId: 'hst-boys-a', quantity: 120, condition: 'needs_repair', maintenanceHistory: [{ date: '2026-06-30', description: 'Coil replaced for 3 fans' }] },
    { id: 'inv-3', itemType: 'water_cooler', hostelId: 'hst-girls-a', quantity: 8, condition: 'good', maintenanceHistory: [{ date: '2026-06-25', description: 'Filter replacement' }] }
  ];

  const defaultNotifications = [
    { id: 'ntf-1', userId: 'usr-john', title: 'Room Allocated', message: 'Congratulations! You have been allocated Room 204 in Boys Hostel A.', type: 'room', isRead: false, createdAt: '2026-06-20T10:00:00Z' },
    { id: 'ntf-2', userId: 'usr-john', title: 'Hostel Fee Due', message: 'Fees of ₹45,000 for Fall Semester 2026 are due by 15th July.', type: 'fee', isRead: false, createdAt: '2026-07-01T00:00:00Z' },
    { id: 'ntf-3', userId: 'usr-john', title: 'Complaint Assigned', message: 'Your complaint about the Fan has been assigned to staff Marcus Vance.', type: 'complaint', isRead: true, createdAt: '2026-06-30T12:00:00Z' }
  ];

  const defaultDocuments = [
    { id: 'doc-1', userId: 'usr-john', docType: 'id_proof', docUrl: '#', docName: 'Driver_License.pdf', verificationStatus: 'verified' },
    { id: 'doc-2', userId: 'usr-john', docType: 'admission_letter', docUrl: '#', docName: 'Uni_Admit_Letter.pdf', verificationStatus: 'verified' }
  ];

  const defaultMess = [
    { day: 'monday', breakfast: 'Idli, Vada, Chutney, Coffee', lunch: 'Rice, Dal, Veg Kurma, Roti, Curd', snacks: 'Samosa, Tea', dinner: 'Veg Pulao, Paneer Curry, Raita' },
    { day: 'tuesday', breakfast: 'Aloo Paratha, Butter, Curd, Tea', lunch: 'Jeera Rice, Chole Masala, Poori, Raita', snacks: 'Biscuits, Milk/Tea', dinner: 'Roti, Dal Tadka, Aloo Gobhi, Rice' },
    { day: 'wednesday', breakfast: 'Poha, Sev, Banana, Tea/Coffee', lunch: 'Rice, Sambhar, Cabbage Fry, Roti, Curd', snacks: 'Kachori, Tea', dinner: 'Fried Rice, Veg Manchurian, Soup' },
    { day: 'thursday', breakfast: 'Puri, Aloo Curry, Tea/Halwa', lunch: 'Kadhi Pakoda, Rice, Roti, Beans Fry', snacks: 'Sandwich, Tea', dinner: 'Roti, Mushroom Curry, Yellow Dal, Rice' },
    { day: 'friday', breakfast: 'Bread Butter Jam, Omelette, Tea', lunch: 'Rice, Rasam, Potato Fry, Roti, Curd', snacks: 'Pakora, Tea', dinner: 'Veg Biryani, Mirchi ka Salan, Sweet' },
    { day: 'saturday', breakfast: 'Upma, Coconut Chutney, Tea/Coffee', lunch: 'Rice, Dal Palak, Bhindi Masala, Roti, Butter Milk', snacks: 'Cookies, Tea', dinner: 'Naan, Dal Makhani, Paneer Butter Masala' },
    { day: 'sunday', breakfast: 'Masala Dosa, Sambhar, Chutney, Tea', lunch: 'Special Meals (Puliyodharai, Sweet, Chips, Curd)', snacks: 'Dry Cake, Milk/Tea', dinner: 'Roti, Egg Curry / Paneer Bhurji, Rice, Milk' }
  ];

  const defaultEmergencyContacts = [
    { id: 'sos-1', name: 'Main Gate Security Office', relation: 'Security', phone: '+91 9988776655', displayOrder: 1 },
    { id: 'sos-2', name: 'Campus Health Center', relation: 'Medical Emergency', phone: '+91 9988776644', displayOrder: 2 },
    { id: 'sos-3', name: 'Hostel Warden Office', relation: 'Hostel Authority', phone: '+91 9888888888', displayOrder: 3 }
  ];

  return {
    users: defaultUsers,
    studentDetails: defaultStudentDetails,
    hostels: defaultHostels,
    rooms: defaultRooms,
    applications: defaultApplications,
    allocations: defaultAllocations,
    fees: defaultFees,
    payments: defaultPayments,
    attendance: defaultAttendance,
    leaveRequests: defaultLeaveRequests,
    visitors: defaultVisitors,
    complaints: defaultComplaints,
    inventory: defaultInventory,
    notifications: defaultNotifications,
    documents: defaultDocuments,
    mess: defaultMess,
    emergencyContacts: defaultEmergencyContacts,
    currentUser: defaultUsers.find(u => u.email === 'admin@hms.local'), // Default login is Admin
    searchQuery: '',
    selectedMobileTab: 'home',
    selectedMobileScreen: 'dashboard' // dashboard or room-details
  };
};

const saveState = (state) => {
  localStorage.setItem('hms_state', JSON.stringify(state));
};

export const hmsSlice = createSlice({
  name: 'hms',
  initialState: loadInitialState(),
  reducers: {
    // Auth & Profile
    login: (state, action) => {
      const { email } = action.payload;
      const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        state.currentUser = user;
        saveState(state);
      }
    },
    logout: (state) => {
      state.currentUser = null;
      saveState(state);
    },
    switchRole: (state, action) => {
      const role = action.payload;
      const targetUser = state.users.find(u => u.role === role);
      if (targetUser) {
        state.currentUser = targetUser;
        saveState(state);
      }
    },
    updateProfile: (state, action) => {
      const { fullName, phone, parentContact, course, department, year } = action.payload;
      const userId = state.currentUser.id;
      
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.fullName = fullName;
        user.phone = phone;
      }
      
      const details = state.studentDetails.find(d => d.userId === userId);
      if (details) {
        details.parentContact = parentContact;
        details.course = course;
        details.department = department;
        details.year = parseInt(year);
      }
      saveState(state);
    },
    forgotPassword: (state, action) => {
      // Stub
    },
    
    // Application System
    submitApplication: (state, action) => {
      const { preferredHostelId, preferredRoomType, course, year } = action.payload;
      const studentId = state.currentUser.id;
      
      // Delete any previous pending or review applications
      state.applications = state.applications.filter(a => !(a.studentId === studentId && a.status === 'pending'));

      const newApp = {
        id: `app-${Date.now()}`,
        studentId,
        course,
        year: parseInt(year),
        preferredHostelId,
        preferredRoomType,
        status: 'pending',
        remarks: '',
        documents: [{ name: 'ID Proof.pdf', url: '#' }],
        date: new Date().toISOString().split('T')[0]
      };
      
      state.applications.push(newApp);
      
      // Also update student details preferred course/year if empty
      const details = state.studentDetails.find(d => d.userId === studentId);
      if (details) {
        details.course = course;
        details.year = parseInt(year);
      }
      
      // Add notification for Admin/Warden
      state.notifications.push({
        id: `ntf-${Date.now()}`,
        userId: 'usr-admin',
        title: 'New Hostel Application',
        message: `${state.currentUser.fullName} has applied for hostel.`,
        type: 'room',
        isRead: false,
        createdAt: new Date().toISOString()
      });

      saveState(state);
    },
    updateApplicationStatus: (state, action) => {
      const { applicationId, status, remarks } = action.payload;
      const app = state.applications.find(a => a.id === applicationId);
      if (app) {
        app.status = status;
        app.remarks = remarks;
        
        // Notify Student
        state.notifications.push({
          id: `ntf-${Date.now()}`,
          userId: app.studentId,
          title: `Application Status: ${status.toUpperCase()}`,
          message: `Your hostel application status is updated to ${status}. ${remarks || ''}`,
          type: 'room',
          isRead: false,
          createdAt: new Date().toISOString()
        });
      }
      saveState(state);
    },

    // Room Allocation
    allocateRoom: (state, action) => {
      const { studentId, roomId, applicationId } = action.payload;
      
      // Deactivate other allocations for the student
      state.allocations.forEach(alc => {
        if (alc.studentId === studentId) alc.isActive = false;
      });

      // Create new allocation
      state.allocations.push({
        id: `alc-${Date.now()}`,
        studentId,
        roomId,
        allocatedBy: state.currentUser.id,
        allocationDate: new Date().toISOString().split('T')[0],
        isActive: true
      });

      // Increment occupancy
      const room = state.rooms.find(r => r.id === roomId);
      if (room) {
        room.currentOccupancy += 1;
        if (room.currentOccupancy >= room.capacity) {
          room.status = 'Occupied';
        }
      }

      // Link to student details
      const details = state.studentDetails.find(d => d.userId === studentId);
      if (details) {
        details.roomId = roomId;
        const rm = state.rooms.find(r => r.id === roomId);
        if (rm) details.hostelId = rm.hostelId;
      }

      // Update application
      if (applicationId) {
        const app = state.applications.find(a => a.id === applicationId);
        if (app) app.status = 'allocated';
      }

      // Send notification
      state.notifications.push({
        id: `ntf-${Date.now()}`,
        userId: studentId,
        title: 'Room Allocated',
        message: `Warden has allocated Room ${room?.roomNumber || ''} to you in ${state.hostels.find(h => h.id === room?.hostelId)?.name || ''}.`,
        type: 'room',
        isRead: false,
        createdAt: new Date().toISOString()
      });

      saveState(state);
    },
    unallocateRoom: (state, action) => {
      const { studentId } = action.payload;
      const allocation = state.allocations.find(a => a.studentId === studentId && a.isActive);
      if (allocation) {
        allocation.isActive = false;
        
        const room = state.rooms.find(r => r.id === allocation.roomId);
        if (room) {
          room.currentOccupancy = Math.max(0, room.currentOccupancy - 1);
          room.status = 'Available';
        }

        const details = state.studentDetails.find(d => d.userId === studentId);
        if (details) {
          details.roomId = '';
          details.hostelId = '';
        }
      }
      saveState(state);
    },

    // Fee & Payments
    generateFee: (state, action) => {
      const { studentId, amount, feeType, billingCycle, dueDate } = action.payload;
      state.fees.push({
        id: `fee-${Date.now()}`,
        studentId,
        amount: parseFloat(amount),
        feeType,
        dueDate,
        status: 'unpaid',
        billingCycle
      });

      state.notifications.push({
        id: `ntf-${Date.now()}`,
        userId: studentId,
        title: 'New Fee Invoice Generated',
        message: `An invoice of ₹${amount} for ${feeType.replace('_', ' ')} has been generated. Due by ${dueDate}.`,
        type: 'fee',
        isRead: false,
        createdAt: new Date().toISOString()
      });
      saveState(state);
    },
    payFee: (state, action) => {
      const { feeId, paymentMethod } = action.payload;
      const fee = state.fees.find(f => f.id === feeId);
      if (fee) {
        fee.status = 'paid';
        
        const newPayment = {
          id: `pay-${Date.now()}`,
          studentId: fee.studentId,
          feeId,
          amount: fee.amount,
          transactionId: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
          paymentMethod,
          status: 'success',
          paymentDate: new Date().toISOString(),
          razorpayOrderId: `order_${Math.random().toString(36).substring(7)}`,
          razorpayPaymentId: `pay_${Math.random().toString(36).substring(7)}`
        };
        
        state.payments.push(newPayment);

        state.notifications.push({
          id: `ntf-${Date.now()}`,
          userId: fee.studentId,
          title: 'Fee Payment Successful',
          message: `Your payment of ₹${fee.amount} for ${fee.feeType.replace('_', ' ')} was received successfully.`,
          type: 'fee',
          isRead: false,
          createdAt: new Date().toISOString()
        });
      }
      saveState(state);
    },

    // Attendance
    markAttendance: (state, action) => {
      const { studentId, type, method, status } = action.payload;
      const dateStr = new Date().toISOString().split('T')[0];

      // Remove previous log for same day, type and student
      state.attendance = state.attendance.filter(
        a => !(a.studentId === studentId && a.date === dateStr && a.type === type)
      );

      state.attendance.push({
        id: `att-${Date.now()}`,
        studentId,
        type,
        method,
        status,
        date: dateStr,
        timestamp: new Date().toISOString()
      });
      saveState(state);
    },

    // Leaves
    submitLeaveRequest: (state, action) => {
      const { reason, fromDate, toDate, destination } = action.payload;
      const studentId = state.currentUser.id;

      state.leaveRequests.push({
        id: `lve-${Date.now()}`,
        studentId,
        reason,
        fromDate,
        toDate,
        destination,
        parentApproved: true,
        status: 'pending',
        approvedById: '',
        remarks: ''
      });
      saveState(state);
    },
    respondLeaveRequest: (state, action) => {
      const { leaveId, status, remarks } = action.payload;
      const leave = state.leaveRequests.find(l => l.id === leaveId);
      if (leave) {
        leave.status = status;
        leave.approvedById = state.currentUser.id;
        leave.remarks = remarks;

        // Notify student
        state.notifications.push({
          id: `ntf-${Date.now()}`,
          userId: leave.studentId,
          title: `Leave Request ${status.toUpperCase()}`,
          message: `Your leave request from ${leave.fromDate} to ${leave.toDate} has been ${status}. ${remarks || ''}`,
          type: 'leave',
          isRead: false,
          createdAt: new Date().toISOString()
        });
      }
      saveState(state);
    },

    // Visitors
    submitVisitorRequest: (state, action) => {
      const { visitorName, relation, phone, visitTime } = action.payload;
      const studentId = state.currentUser.id;

      state.visitors.push({
        id: `vis-${Date.now()}`,
        visitorName,
        relation,
        phone,
        studentId,
        visitTime,
        status: 'pending_warden' // Auto confirms student request, goes to warden
      });
      saveState(state);
    },
    respondVisitorRequest: (state, action) => {
      const { visitorId, status } = action.payload;
      const visitor = state.visitors.find(v => v.id === visitorId);
      if (visitor) {
        visitor.status = status;
        visitor.approvedById = state.currentUser.id;

        if (status === 'entered') {
          visitor.visitTime = new Date().toISOString();
        } else if (status === 'exited') {
          visitor.exitTime = new Date().toISOString();
        }

        // Notify student
        state.notifications.push({
          id: `ntf-${Date.now()}`,
          userId: visitor.studentId,
          title: `Visitor Status: ${status.toUpperCase()}`,
          message: `Warden updated status for visitor ${visitor.visitorName} to: ${status}.`,
          type: 'general',
          isRead: false,
          createdAt: new Date().toISOString()
        });
      }
      saveState(state);
    },

    // Complaints
    submitComplaint: (state, action) => {
      const { title, description, category, priority, roomNo } = action.payload;
      const studentId = state.currentUser.id;

      state.complaints.push({
        id: `cmp-${Date.now()}`,
        studentId,
        category,
        title,
        description,
        roomNo,
        assignedToId: '',
        priority,
        status: 'open',
        logs: [{ date: new Date().toISOString(), comment: 'Complaint raised by student.' }]
      });
      saveState(state);
    },
    assignComplaint: (state, action) => {
      const { complaintId, staffId } = action.payload;
      const complaint = state.complaints.find(c => c.id === complaintId);
      if (complaint) {
        complaint.assignedToId = staffId;
        complaint.status = 'in_progress';
        complaint.logs.push({
          date: new Date().toISOString(),
          comment: `Assigned to Staff: ${state.users.find(u => u.id === staffId)?.fullName || ''}`
        });
      }
      saveState(state);
    },
    resolveComplaint: (state, action) => {
      const { complaintId, comment, status } = action.payload; // status = 'resolved' or 'closed'
      const complaint = state.complaints.find(c => c.id === complaintId);
      if (complaint) {
        complaint.status = status;
        complaint.logs.push({
          date: new Date().toISOString(),
          comment: comment || `Status updated to ${status}.`
        });

        // Notify Student
        state.notifications.push({
          id: `ntf-${Date.now()}`,
          userId: complaint.studentId,
          title: `Complaint Status: ${status.toUpperCase()}`,
          message: `Your complaint "${complaint.title}" has been updated to ${status}.`,
          type: 'complaint',
          isRead: false,
          createdAt: new Date().toISOString()
        });
      }
      saveState(state);
    },

    // Inventory
    updateInventoryStock: (state, action) => {
      const { id, quantity, condition, description } = action.payload;
      const item = state.inventory.find(i => i.id === id);
      if (item) {
        item.quantity = parseInt(quantity);
        item.condition = condition;
        if (description) {
          item.maintenanceHistory.push({
            date: new Date().toISOString().split('T')[0],
            description
          });
        }
      }
      saveState(state);
    },
    addInventoryItem: (state, action) => {
      const { itemType, hostelId, quantity, condition } = action.payload;
      state.inventory.push({
        id: `inv-${Date.now()}`,
        itemType,
        hostelId,
        quantity: parseInt(quantity),
        condition,
        maintenanceHistory: [{ date: new Date().toISOString().split('T')[0], description: 'Initial stock added' }]
      });
      saveState(state);
    },

    // Document Management
    uploadDocument: (state, action) => {
      const { docType, docName } = action.payload;
      const userId = state.currentUser.id;
      state.documents.push({
        id: `doc-${Date.now()}`,
        userId,
        docType,
        docName,
        docUrl: '#',
        verificationStatus: 'pending'
      });
      saveState(state);
    },
    verifyDocument: (state, action) => {
      const { docId, status, remarks } = action.payload;
      const doc = state.documents.find(d => d.id === docId);
      if (doc) {
        doc.verificationStatus = status;
        // Send notification
        state.notifications.push({
          id: `ntf-${Date.now()}`,
          userId: doc.userId,
          title: `Document ${status.toUpperCase()}`,
          message: `Your submitted ${doc.docType.replace('_', ' ')} has been ${status}. ${remarks || ''}`,
          type: 'general',
          isRead: false,
          createdAt: new Date().toISOString()
        });
      }
      saveState(state);
    },

    // Search Query (Sidebar/Navbar communication)
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Mobile Simulator Controls
    setMobileTab: (state, action) => {
      state.selectedMobileTab = action.payload;
    },
    setMobileScreen: (state, action) => {
      state.selectedMobileScreen = action.payload;
    },

    // Notifications Read
    markNotificationsRead: (state) => {
      state.notifications.forEach(n => {
        if (n.userId === state.currentUser?.id) n.isRead = true;
      });
      saveState(state);
    },

    // Add Hostels & Rooms (Admin CRUD)
    addHostel: (state, action) => {
      const { name, type, gender, capacity, address, description } = action.payload;
      state.hostels.push({
        id: `hst-${Date.now()}`,
        name,
        type,
        gender,
        capacity: parseInt(capacity),
        address,
        description,
        images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500'],
        wardenId: 'usr-warden'
      });
      saveState(state);
    },
    addRoom: (state, action) => {
      const { hostelId, roomNumber, floor, capacity, roomType } = action.payload;
      state.rooms.push({
        id: `rom-${Date.now()}`,
        hostelId,
        roomNumber,
        floor: parseInt(floor),
        capacity: parseInt(capacity),
        currentOccupancy: 0,
        roomType,
        status: 'Available',
        studyTable: true,
        wardrobe: true,
        washroom: true,
        fan: true
      });
      saveState(state);
    },
    updateRoomStatus: (state, action) => {
      const { roomId, status } = action.payload;
      const room = state.rooms.find(r => r.id === roomId);
      if (room) {
        room.status = status;
      }
      saveState(state);
    }
  }
});

export const {
  login,
  logout,
  switchRole,
  updateProfile,
  submitApplication,
  updateApplicationStatus,
  allocateRoom,
  unallocateRoom,
  generateFee,
  payFee,
  markAttendance,
  submitLeaveRequest,
  respondLeaveRequest,
  submitVisitorRequest,
  respondVisitorRequest,
  submitComplaint,
  assignComplaint,
  resolveComplaint,
  updateInventoryStock,
  addInventoryItem,
  uploadDocument,
  verifyDocument,
  setSearchQuery,
  setMobileTab,
  setMobileScreen,
  markNotificationsRead,
  addHostel,
  addRoom,
  updateRoomStatus
} = hmsSlice.actions;

export default hmsSlice.reducer;
