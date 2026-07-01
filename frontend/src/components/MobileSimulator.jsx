import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Home,
  Bell,
  UserCheck,
  User,
  Bed,
  CreditCard,
  CalendarDays,
  FileCheck,
  AlertOctagon,
  ArrowLeft,
  Tv,
  CheckCircle,
  HelpCircle,
  Wifi,
  Fan,
  Table,
  Upload,
  CalendarCheck,
  BookOpen,
  DollarSign
} from 'lucide-react';
import {
  submitApplication,
  submitLeaveRequest,
  submitComplaint,
  submitVisitorRequest,
  payFee,
  markAttendance,
  uploadDocument,
  updateProfile,
  setMobileTab,
  setMobileScreen
} from '../store/slices/hmsSlice';
import toast from 'react-hot-toast';

export default function MobileSimulator() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.hms);
  const currentUser = state.currentUser;
  const currentTab = state.selectedMobileTab;
  const currentScreen = state.selectedMobileScreen;

  // Extract student details
  const studentDetail = state.studentDetails.find((d) => d.userId === currentUser?.id);
  const studentRoom = state.rooms.find((r) => r.id === studentDetail?.roomId);
  const studentHostel = state.hostels.find((h) => h.id === studentDetail?.hostelId);

  // Form states
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveDest, setLeaveDest] = useState('');

  const [compTitle, setCompTitle] = useState('');
  const [compDesc, setCompDesc] = useState('');
  const [compCat, setCompCat] = useState('electrical');
  const [compPrior, setCompPrior] = useState('medium');

  const [visName, setVisName] = useState('');
  const [visRel, setVisRel] = useState('');
  const [visPhone, setVisPhone] = useState('');
  const [visTime, setVisTime] = useState('');

  // Profile Edit
  const [profName, setProfName] = useState(currentUser?.fullName || '');
  const [profPhone, setProfPhone] = useState(currentUser?.phone || '');
  const [profParent, setProfParent] = useState(studentDetail?.parentContact || '');
  const [profCourse, setProfCourse] = useState(studentDetail?.course || '');
  const [profDept, setProfDept] = useState(studentDetail?.department || '');
  const [profYear, setProfYear] = useState(studentDetail?.year || 1);

  // Payment states
  const [selectedFee, setSelectedFee] = useState(null);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handleApplyHostel = () => {
    dispatch(submitApplication({
      preferredHostelId: state.hostels[0].id,
      preferredRoomType: 'double',
      course: 'Computer Science & Engineering',
      year: 3
    }));
    toast.success('Hostel application submitted successfully');
  };

  const handlePayFee = (fee) => {
    setSelectedFee(fee);
    setShowRazorpay(true);
  };

  const executePayment = () => {
    if (selectedFee) {
      dispatch(payFee({ feeId: selectedFee.id, paymentMethod }));
      setShowRazorpay(false);
      setSelectedFee(null);
      toast.success('Fee Payment Completed Successfully!');
    }
  };

  const handleMarkAttendance = (type) => {
    dispatch(markAttendance({
      studentId: currentUser.id,
      type,
      method: 'qr',
      status: 'present'
    }));
    toast.success(`Marked ${type.replace('_', ' ')} Successfully via QR Code!`);
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveReason || !leaveFrom || !leaveTo || !leaveDest) {
      toast.error('Please fill all leave fields');
      return;
    }
    dispatch(submitLeaveRequest({
      reason: leaveReason,
      fromDate: leaveFrom,
      toDate: leaveTo,
      destination: leaveDest
    }));
    setLeaveReason('');
    setLeaveFrom('');
    setLeaveTo('');
    setLeaveDest('');
    dispatch(setMobileScreen('dashboard'));
    toast.success('Leave request submitted to Warden');
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!compTitle || !compDesc) {
      toast.error('Please fill title and description');
      return;
    }
    dispatch(submitComplaint({
      title: compTitle,
      description: compDesc,
      category: compCat,
      priority: compPrior,
      roomNo: studentRoom?.roomNumber || 'Unknown'
    }));
    setCompTitle('');
    setCompDesc('');
    dispatch(setMobileScreen('dashboard'));
    toast.success('Complaint registered successfully');
  };

  const handleVisitorSubmit = (e) => {
    e.preventDefault();
    if (!visName || !visRel || !visPhone || !visTime) {
      toast.error('Please fill all visitor fields');
      return;
    }
    dispatch(submitVisitorRequest({
      visitorName: visName,
      relation: visRel,
      phone: visPhone,
      visitTime: visTime
    }));
    setVisName('');
    setVisRel('');
    setVisPhone('');
    setVisTime('');
    dispatch(setMobileScreen('dashboard'));
    toast.success('Visitor request sent for Warden approval');
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadDocument({
        docType: 'id_proof',
        docName: file.name
      }));
      toast.success(`Uploaded ${file.name} to Cloudinary!`);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({
      fullName: profName,
      phone: profPhone,
      parentContact: profParent,
      course: profCourse,
      department: profDept,
      year: profYear
    }));
    toast.success('Profile updated successfully');
  };

  // Render screens
  const renderScreenContent = () => {
    // If not logged in as student, display placeholder info
    if (currentUser?.role !== 'student') {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
          <BookOpen className="w-16 h-16 text-[#4F46E5] mb-4 animate-bounce" />
          <h3 className="font-bold text-gray-800 text-base mb-2">Student Mobile Simulator</h3>
          <p className="text-xs text-gray-500 mb-4">
            Toggle your Role in the left sidebar to "Student" to interactively test the student mobile application features.
          </p>
          <button
            onClick={() => dispatch(switchRole('student'))}
            className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl font-semibold text-xs transition-all shadow-md"
          >
            Switch Role to Student
          </button>
        </div>
      );
    }

    if (showRazorpay && selectedFee) {
      return (
        <div className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[280px] overflow-hidden shadow-2xl border border-[#E5E7EB] animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#02042B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wider">RAZORPAY</span>
                <span className="bg-[#4F46E5] text-[8px] px-1.5 py-0.5 rounded uppercase font-bold">Secure</span>
              </div>
              <button onClick={() => setShowRazorpay(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
            </div>
            <div className="p-4">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Pay to Hostel Management</p>
              <h4 className="text-xl font-bold text-gray-900 mt-1">₹{selectedFee.amount.toLocaleString('en-IN')}</h4>
              <p className="text-xs text-gray-500 mt-1 border-b pb-3 capitalize">{selectedFee.feeType.replace('_', ' ')}</p>

              <div className="mt-4 space-y-2.5">
                <label className="block text-[10px] text-gray-400 uppercase font-bold">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {['upi', 'credit_card', 'debit_card', 'net_banking'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-1 text-[10px] font-bold border rounded-xl capitalize transition-all ${
                        paymentMethod === method
                          ? 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {method.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={executePayment}
                className="w-full mt-6 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <DollarSign className="w-4 h-4" /> Pay Now
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentScreen === 'room-details') {
      return (
        <div className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
            <button onClick={() => dispatch(setMobileScreen('dashboard'))} className="text-gray-500"><ArrowLeft className="w-5 h-5" /></button>
            <h3 className="font-bold text-sm text-gray-900">Room Details</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-4">
            {/* Room Card */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h4 className="text-xs text-gray-400 font-bold uppercase">Room Number</h4>
              <p className="text-2xl font-black text-gray-800">{studentRoom?.roomNumber || 'N/A'}</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Hostel: {studentHostel?.name || 'Not Allocated'}</p>
            </div>

            {/* Roommates */}
            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
              <h4 className="text-xs text-gray-900 font-bold">Roommates</h4>
              <div className="space-y-2">
                {state.studentDetails
                  .filter((d) => d.roomId === studentRoom?.id)
                  .map((roommate) => {
                    const u = state.users.find((x) => x.id === roommate.userId);
                    return (
                      <div key={roommate.userId} className="flex items-center gap-2.5">
                        <img src={u?.avatar} className="w-7 h-7 rounded-full object-cover" alt="" />
                        <div>
                          <p className="text-xs font-bold text-gray-900">{u?.fullName}</p>
                          <p className="text-[10px] text-gray-500 font-semibold">{roommate.course}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
              <h4 className="text-xs text-gray-900 font-bold">Room Facilities</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-semibold">
                <div className="flex items-center gap-2"><Table className="w-4 h-4 text-[#4F46E5]" /> Study Table</div>
                <div className="flex items-center gap-2"><Bed className="w-4 h-4 text-[#4F46E5]" /> Wardrobe</div>
                <div className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-[#4F46E5]" /> Attached Bath</div>
                <div className="flex items-center gap-2"><Fan className="w-4 h-4 text-[#4F46E5]" /> Ceiling Fan</div>
              </div>
            </div>

            {/* Room Images */}
            <div className="space-y-2">
              <h4 className="text-xs text-gray-900 font-bold px-1">Room View</h4>
              <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500" className="rounded-xl w-full border object-cover h-32" alt="" />
            </div>

            <button
              onClick={() => dispatch(setMobileScreen('complaints'))}
              className="w-full py-2.5 bg-[#EE4646]/10 hover:bg-[#EE4646]/20 text-[#EE4646] font-bold text-xs rounded-xl transition-all"
            >
              Report Room Issue
            </button>
          </div>
        </div>
      );
    }

    if (currentScreen === 'pay-fee') {
      const studentFees = state.fees.filter((f) => f.studentId === currentUser?.id);
      return (
        <div className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
            <button onClick={() => dispatch(setMobileScreen('dashboard'))} className="text-gray-500"><ArrowLeft className="w-5 h-5" /></button>
            <h3 className="font-bold text-sm text-gray-900">Hostel Fee Payment</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-3">
            {studentFees.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No bills generated</p>
            ) : (
              studentFees.map((fee) => (
                <div key={fee.id} className="bg-white p-3 rounded-xl border shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900 capitalize">{fee.feeType.replace('_', ' ')}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{fee.billingCycle}</p>
                    <p className="text-[11px] font-bold text-[#4F46E5] mt-1">₹{fee.amount.toLocaleString('en-IN')}</p>
                  </div>
                  {fee.status === 'paid' ? (
                    <span className="bg-green-50 text-green-600 text-[10px] px-2.5 py-1 rounded-full font-bold">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayFee(fee)}
                      className="bg-[#4F46E5] text-white text-[10px] px-3 py-1.5 rounded-xl font-bold hover:bg-[#4338CA] transition-all"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (currentScreen === 'qr-attendance') {
      return (
        <div className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
            <button onClick={() => dispatch(setMobileScreen('dashboard'))} className="text-gray-500"><ArrowLeft className="w-5 h-5" /></button>
            <h3 className="font-bold text-sm text-gray-900">QR Check-In / Out</h3>
          </div>
          <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col items-center">
              <div className="w-40 h-40 bg-gray-100 rounded-xl border-2 border-dashed border-[#4F46E5] flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1.5 w-28 h-28 opacity-75">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${(i % 3 === 0 || i % 7 === 0) ? 'bg-gray-800' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-bold tracking-wider mt-3">STUDENT QR CODE</p>
            </div>
            <div className="w-full space-y-2">
              <button
                onClick={() => handleMarkAttendance('check_in')}
                className="w-full py-2.5 bg-[#4F46E5] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#4338CA] transition-all"
              >
                Scan Check-In (In-Time)
              </button>
              <button
                onClick={() => handleMarkAttendance('check_out')}
                className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 transition-all"
              >
                Scan Check-Out (Out-Time)
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentScreen === 'leave-request') {
      return (
        <form onSubmit={handleLeaveSubmit} className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
            <button type="button" onClick={() => dispatch(setMobileScreen('dashboard'))} className="text-gray-500"><ArrowLeft className="w-5 h-5" /></button>
            <h3 className="font-bold text-sm text-gray-900">Request Leave</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Reason</label>
              <input type="text" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} placeholder="e.g. Going home for holidays" className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-white text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-semibold text-gray-600">From Date</label>
                <input type="date" value={leaveFrom} onChange={(e) => setLeaveFrom(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-gray-600">To Date</label>
                <input type="date" value={leaveTo} onChange={(e) => setLeaveTo(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Destination</label>
              <input type="text" value={leaveDest} onChange={(e) => setLeaveDest(e.target.value)} placeholder="Full destination address" className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
            </div>
            <div className="bg-yellow-50 text-yellow-700 p-3 rounded-xl border border-yellow-100 flex items-start gap-2 mt-2">
              <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] leading-relaxed">By submitting, a parental authorization SMS is mocked and a review request is queued for Warden approval.</p>
            </div>
            <button type="submit" className="w-full mt-4 py-2.5 bg-[#4F46E5] text-white font-bold rounded-xl shadow-md hover:bg-[#4338CA] transition-all">Submit Request</button>
          </div>
        </form>
      );
    }

    if (currentScreen === 'complaints') {
      return (
        <form onSubmit={handleComplaintSubmit} className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
            <button type="button" onClick={() => dispatch(setMobileScreen('dashboard'))} className="text-gray-500"><ArrowLeft className="w-5 h-5" /></button>
            <h3 className="font-bold text-sm text-gray-900">Report Hostel Issue</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Issue Title</label>
              <input type="text" value={compTitle} onChange={(e) => setCompTitle(e.target.value)} placeholder="e.g. WiFi not connecting" className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Category</label>
              <select value={compCat} onChange={(e) => setCompCat(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-gray-200 bg-white text-xs">
                <option value="electrical">Electricity</option>
                <option value="water">Water Supply</option>
                <option value="internet">Internet / WiFi</option>
                <option value="furniture">Furniture</option>
                <option value="cleaning">Housekeeping</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Priority</label>
              <select value={compPrior} onChange={(e) => setCompPrior(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-gray-200 bg-white text-xs">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Detailed Description</label>
              <textarea rows={3} value={compDesc} onChange={(e) => setCompDesc(e.target.value)} placeholder="Provide specific room details..." className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
            </div>
            <button type="submit" className="w-full mt-4 py-2.5 bg-[#4F46E5] text-white font-bold rounded-xl shadow-md hover:bg-[#4338CA] transition-all">Submit Issue</button>
          </div>
        </form>
      );
    }

    if (currentScreen === 'visitor-request') {
      return (
        <form onSubmit={handleVisitorSubmit} className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
            <button type="button" onClick={() => dispatch(setMobileScreen('dashboard'))} className="text-gray-500"><ArrowLeft className="w-5 h-5" /></button>
            <h3 className="font-bold text-sm text-gray-900">Request Visitor Gatepass</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Visitor Full Name</label>
              <input type="text" value={visName} onChange={(e) => setVisName(e.target.value)} placeholder="e.g. Richard Doe" className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Relation</label>
                <input type="text" value={visRel} onChange={(e) => setVisRel(e.target.value)} placeholder="e.g. Father, Friend" className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Phone Number</label>
                <input type="text" value={visPhone} onChange={(e) => setVisPhone(e.target.value)} placeholder="Mobile No" className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-600">Expected Entry Time</label>
              <input type="datetime-local" value={visTime} onChange={(e) => setVisTime(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none bg-white text-xs" />
            </div>
            <button type="submit" className="w-full mt-4 py-2.5 bg-[#4F46E5] text-white font-bold rounded-xl shadow-md hover:bg-[#4338CA] transition-all">Submit Pass Request</button>
          </div>
        </form>
      );
    }

    // Tab Views
    if (currentTab === 'notices') {
      const studentNotifications = state.notifications.filter(
        (n) => n.userId === currentUser.id
      );
      return (
        <div className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3">
            <h3 className="font-bold text-sm text-gray-900">Notifications & Alerts</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-2">
            {studentNotifications.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No notifications</p>
            ) : (
              studentNotifications.map((n) => (
                <div key={n.id} className="bg-white p-3 rounded-xl border shadow-sm">
                  <p className="text-xs font-bold text-gray-800">{n.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-normal">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (currentTab === 'visitors') {
      const studentVisitors = state.visitors.filter((v) => v.studentId === currentUser.id);
      return (
        <div className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900">My Visitors</h3>
            <button
              onClick={() => dispatch(setMobileScreen('visitor-request'))}
              className="text-[10px] font-bold text-[#4F46E5] hover:underline"
            >
              + New Request
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
            {studentVisitors.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No visitor requests</p>
            ) : (
              studentVisitors.map((v) => (
                <div key={v.id} className="bg-white p-3 rounded-xl border shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-800">{v.visitorName}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{v.relation} • {v.phone}</p>
                    <p className="text-[9px] text-gray-400 mt-1">{new Date(v.visitTime).toLocaleString()}</p>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    v.status === 'exited' ? 'bg-gray-100 text-gray-600' :
                    v.status === 'entered' ? 'bg-blue-50 text-blue-600' :
                    v.status === 'approved' ? 'bg-green-50 text-green-600' :
                    'bg-yellow-50 text-yellow-600'
                  }`}>{v.status.replace('_', ' ')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (currentTab === 'profile') {
      const uploadedDocs = state.documents.filter((d) => d.userId === currentUser.id);
      return (
        <div className="flex flex-col h-full bg-[#F5F7FB]">
          <div className="bg-white border-b px-4 py-3">
            <h3 className="font-bold text-sm text-gray-900">Student Profile</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
            <form onSubmit={handleProfileUpdate} className="bg-white p-3 rounded-xl border shadow-sm space-y-2.5">
              <h4 className="text-xs font-bold text-gray-800 border-b pb-1.5 mb-1.5">Personal Details</h4>
              <div className="space-y-0.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase">Full Name</label>
                <input type="text" value={profName} onChange={(e) => setProfName(e.target.value)} className="w-full h-8 px-2 rounded-lg border text-xs bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">Phone No</label>
                  <input type="text" value={profPhone} onChange={(e) => setProfPhone(e.target.value)} className="w-full h-8 px-2 rounded-lg border text-xs bg-white" />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">Parent Contact</label>
                  <input type="text" value={profParent} onChange={(e) => setProfParent(e.target.value)} className="w-full h-8 px-2 rounded-lg border text-xs bg-white" />
                </div>
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase">Course Name</label>
                <input type="text" value={profCourse} onChange={(e) => setProfCourse(e.target.value)} className="w-full h-8 px-2 rounded-lg border text-xs bg-white" />
              </div>
              <button type="submit" className="w-full py-2 bg-[#4F46E5] text-white font-bold rounded-lg text-xs hover:bg-[#4338CA] transition-all">Save Profile</button>
            </form>

            <div className="bg-white p-3 rounded-xl border shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-gray-800 border-b pb-1.5">Documents & Credentials</h4>
              <div className="space-y-2">
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-1.5 last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-bold text-[11px] text-gray-800">{doc.docName}</p>
                      <p className="text-[9px] text-gray-400 capitalize">{doc.docType.replace('_', ' ')}</p>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      doc.verificationStatus === 'verified' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>{doc.verificationStatus}</span>
                  </div>
                ))}
              </div>
              <div className="pt-1.5">
                <label className="cursor-pointer w-full py-2 border border-dashed border-[#4F46E5]/40 hover:bg-[#EEF2FF]/30 flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-bold text-[#4F46E5]">
                  <Upload className="w-3.5 h-3.5" /> Upload ID Proof / Document
                  <input type="file" onChange={handleDocUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Home Tab View (Student Dashboard)
    return (
      <div className="flex flex-col h-full bg-[#F5F7FB]">
        {/* Profile Card Header */}
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#4338CA] text-white p-4 rounded-b-2xl shadow-md">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-12 h-12 rounded-full border-2 border-white/20 object-cover shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate">{currentUser.fullName}</h3>
              <p className="text-[10px] text-indigo-100 font-medium">Room {studentRoom?.roomNumber || 'Not Allocated'} • {studentHostel?.name || 'Apply Hostel Below'}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Actions list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {!studentRoom && (
            <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm text-center">
              <p className="text-xs text-gray-600 font-medium mb-3">You do not have a room allocated yet.</p>
              {state.applications.some(a => a.studentId === currentUser.id && a.status === 'pending') ? (
                <span className="bg-yellow-50 text-yellow-600 text-xs px-3 py-1.5 rounded-xl font-semibold">Application Under Review</span>
              ) : (
                <button
                  onClick={handleApplyHostel}
                  className="py-2 px-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Apply for Hostel Admission
                </button>
              )}
            </div>
          )}

          {/* Grid list of feature cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => studentRoom && dispatch(setMobileScreen('room-details'))}
              disabled={!studentRoom}
              className={`p-3 bg-white border rounded-xl shadow-sm text-left flex flex-col justify-between h-20 transition-all ${
                studentRoom ? 'hover:scale-102 hover:border-[#4F46E5]/30' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Bed className="w-5 h-5 text-[#4F46E5]" />
              <div>
                <span className="font-bold text-gray-800">My Room</span>
                <p className="text-[9px] text-gray-400">View roommates & info</p>
              </div>
            </button>

            <button
              onClick={() => dispatch(setMobileScreen('pay-fee'))}
              className="p-3 bg-white border rounded-xl shadow-sm text-left flex flex-col justify-between h-20 transition-all hover:scale-102 hover:border-[#4F46E5]/30"
            >
              <CreditCard className="w-5 h-5 text-green-500" />
              <div>
                <span className="font-bold text-gray-800">Fees Due</span>
                <p className="text-[9px] text-gray-400">Pay mess & room bills</p>
              </div>
            </button>

            <button
              onClick={() => dispatch(setMobileScreen('qr-attendance'))}
              className="p-3 bg-white border rounded-xl shadow-sm text-left flex flex-col justify-between h-20 transition-all hover:scale-102 hover:border-[#4F46E5]/30"
            >
              <CalendarCheck className="w-5 h-5 text-orange-500" />
              <div>
                <span className="font-bold text-gray-800">Attendance</span>
                <p className="text-[9px] text-gray-400">QR Check-in scanner</p>
              </div>
            </button>

            <button
              onClick={() => dispatch(setMobileScreen('leave-request'))}
              className="p-3 bg-white border rounded-xl shadow-sm text-left flex flex-col justify-between h-20 transition-all hover:scale-102 hover:border-[#4F46E5]/30"
            >
              <CalendarDays className="w-5 h-5 text-purple-500" />
              <div>
                <span className="font-bold text-gray-800">Leave</span>
                <p className="text-[9px] text-gray-400">Request permission</p>
              </div>
            </button>

            <button
              onClick={() => dispatch(setMobileScreen('complaints'))}
              className="p-3 bg-white border rounded-xl shadow-sm text-left flex flex-col justify-between h-20 transition-all hover:scale-102 hover:border-[#4F46E5]/30"
            >
              <AlertOctagon className="w-5 h-5 text-red-500" />
              <div>
                <span className="font-bold text-gray-800">Complaints</span>
                <p className="text-[9px] text-gray-400">Raise room issues</p>
              </div>
            </button>

            <button
              onClick={() => dispatch(setMobileTab('visitors'))}
              className="p-3 bg-white border rounded-xl shadow-sm text-left flex flex-col justify-between h-20 transition-all hover:scale-102 hover:border-[#4F46E5]/30"
            >
              <UserCheck className="w-5 h-5 text-blue-500" />
              <div>
                <span className="font-bold text-gray-800">Visitors</span>
                <p className="text-[9px] text-gray-400">Gatepass invitations</p>
              </div>
            </button>
          </div>

          {/* Emergency card */}
          <div className="bg-red-50 p-3.5 rounded-xl border border-red-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-800">Emergency & Security</p>
              <p className="text-[9px] text-red-600 mt-0.5">Alert main gate security and warden immediately.</p>
            </div>
            <button
              onClick={() => toast.success('SOS Alert Broadcasted to Security Guard & Parents!')}
              className="px-3.5 py-1.5 bg-[#EE4646] text-white font-bold rounded-lg text-[10px] hover:bg-red-700 shadow-sm"
            >
              SOS HELP
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="hidden xl:flex flex-col items-center justify-center p-4 2xl:p-6 bg-gray-50/50 border-l border-gray-200 h-full w-full max-w-[380px] flex-shrink-0 overflow-hidden">
      <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-gray-400 mb-4 flex items-center gap-1.5 text-center">
        <Tv className="w-4 h-4 text-[#4F46E5]" /> Live App Simulator
      </h3>
      {/* Device Bezel Outline */}
      <div className="w-full max-w-[300px] h-[min(580px,calc(100vh-160px))] bg-gray-900 rounded-[40px] p-2.5 shadow-2xl relative border-4 border-gray-800/80 flex flex-col select-none">
        {/* Notch */}
        <div className="w-24 h-4 bg-gray-900 absolute top-2.5 left-1/2 -translate-x-1/2 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-10 h-1 bg-gray-800 rounded-full mb-1" />
        </div>

        {/* Screen Frame */}
        <div className="flex-1 bg-[#F5F7FB] rounded-[30px] overflow-hidden flex flex-col relative border border-gray-950">
          {/* Status Bar */}
          <div className="h-6 bg-white px-5 flex items-center justify-between text-[9px] font-bold text-gray-500 select-none">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5" />
              <span>5G</span>
              <span className="w-3.5 h-2 bg-gray-700 rounded-sm" />
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="flex-1 relative overflow-hidden">
            {renderScreenContent()}
          </div>

          {/* Bottom Mobile Navigation Tabs */}
          {currentUser?.role === 'student' && (
            <div className="h-12 bg-white border-t flex items-center justify-around text-gray-400 z-10 select-none pb-1">
              <button
                onClick={() => {
                  dispatch(setMobileTab('home'));
                  dispatch(setMobileScreen('dashboard'));
                }}
                className={`flex flex-col items-center gap-0.5 ${currentTab === 'home' && currentScreen === 'dashboard' ? 'text-[#4F46E5]' : 'hover:text-gray-600'}`}
              >
                <Home className="w-4 h-4" />
                <span className="text-[8px] font-bold">Home</span>
              </button>

              <button
                onClick={() => {
                  dispatch(setMobileTab('notices'));
                  dispatch(setMobileScreen('dashboard'));
                }}
                className={`flex flex-col items-center gap-0.5 ${currentTab === 'notices' ? 'text-[#4F46E5]' : 'hover:text-gray-600'}`}
              >
                <Bell className="w-4 h-4" />
                <span className="text-[8px] font-bold">Alerts</span>
              </button>

              <button
                onClick={() => {
                  dispatch(setMobileTab('visitors'));
                  dispatch(setMobileScreen('dashboard'));
                }}
                className={`flex flex-col items-center gap-0.5 ${currentTab === 'visitors' ? 'text-[#4F46E5]' : 'hover:text-gray-600'}`}
              >
                <UserCheck className="w-4 h-4" />
                <span className="text-[8px] font-bold">Visitors</span>
              </button>

              <button
                onClick={() => {
                  dispatch(setMobileTab('profile'));
                  dispatch(setMobileScreen('dashboard'));
                }}
                className={`flex flex-col items-center gap-0.5 ${currentTab === 'profile' ? 'text-[#4F46E5]' : 'hover:text-gray-600'}`}
              >
                <User className="w-4 h-4" />
                <span className="text-[8px] font-bold">Profile</span>
              </button>
            </div>
          )}
        </div>

        {/* Home Indicator */}
        <div className="w-24 h-1 bg-gray-700/60 rounded-full mx-auto mt-1" />
      </div>
    </div>
  );
}
