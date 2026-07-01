import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MobileSimulator from './components/MobileSimulator';
import AuthPage from './pages/AuthPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageHostels from './pages/admin/ManageHostels';
import ManageRooms from './pages/admin/ManageRooms';
import ManageStudents from './pages/admin/ManageStudents';
import SystemSettings from './pages/admin/SystemSettings';

// Redux Actions
import {
  updateApplicationStatus,
  allocateRoom,
  generateFee,
  respondLeaveRequest,
  respondVisitorRequest,
  assignComplaint,
  resolveComplaint,
  updateInventoryStock,
  addInventoryItem,
  verifyDocument,
  markAttendance
} from './store/slices/hmsSlice';

import {
  Bed,
  CheckCircle,
  Clock,
  FileText,
  AlertTriangle,
  ClipboardList,
  CalendarCheck,
  ShieldCheck,
  Bell,
  BarChart3,
  User,
  Activity,
  UserCheck,
  Plus
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.hms);
  const currentUser = state.currentUser;
  const searchQuery = state.searchQuery.toLowerCase();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!currentUser) {
    return <AuthPage />;
  }

  // --- Dynamic Tab Render Controller ---
  const renderMainContent = () => {
    // 1. Placeholder screen if active role is student on desktop
    if (currentUser?.role === 'student') {
      return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft text-center max-w-xl mx-auto mt-10">
          <Activity className="w-16 h-16 text-[#4F46E5] mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Student Mobile View Active</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            You are currently logged in as a <strong>Student Resident</strong>.
            Please use the <strong>Live App Simulator</strong> phone frame on the right side to interact with the mobile app dashboard, pay fees, mark QR attendance, or submit leave approvals.
          </p>
          <div className="bg-[#EEF2FF] p-4 rounded-xl border border-[#4F46E5]/15 text-xs text-left text-gray-600 font-semibold space-y-2">
            <p>💡 <strong>Tip:</strong> Toggle the "Demo View" selector at the bottom of the left sidebar to switch back to Super Admin, Warden, or Staff to view the desktop administration dashboards.</p>
          </div>
        </div>
      );
    }

    // Role check logic for page access
    const isWarden = currentUser?.role === 'warden';
    const isStaff = currentUser?.role === 'staff';
    const isAdmin = currentUser?.role === 'admin';

    // 2. Active tab routing
    switch (activeTab) {
      case 'dashboard':
        if (isWarden) return renderWardenDashboard();
        if (isStaff) return renderStaffDashboard();
        return <AdminDashboard />;

      case 'students':
        return <ManageStudents />;

      case 'hostels':
        return <ManageHostels />;

      case 'rooms':
        return <ManageRooms />;

      case 'applications':
        return renderApplicationsPage();

      case 'allocation':
        return renderAllocationPage();

      case 'fees':
        return renderFeesPage();

      case 'attendance':
        return renderAttendancePage();

      case 'leaves':
        return renderLeavesPage();

      case 'visitors':
        return renderVisitorsPage();

      case 'complaints':
        return renderComplaintsPage();

      case 'mess':
        return renderMessPage();

      case 'inventory':
        return renderInventoryPage();

      case 'staff':
        return renderStaffPage();

      case 'notifications':
        return renderNotificationsPage();

      case 'reports':
        return renderReportsPage();

      case 'settings':
        return <SystemSettings />;

      case 'profile':
        return renderProfilePage();

      default:
        return <AdminDashboard />;
    }
  };

  // --- WARDEN DASHBOARD VIEW ---
  const renderWardenDashboard = () => {
    const pendingApps = state.applications.filter(a => a.status === 'pending').length;
    const pendingLeaves = state.leaveRequests.filter(l => l.status === 'pending').length;
    const activeVisitors = state.visitors.filter(v => v.status === 'approved' || v.status === 'entered').length;
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Warden Console</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Manage hostel approvals, attendance and room check logs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border shadow-soft flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-full text-[#4F46E5]"><FileText className="w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{pendingApps}</p>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">Pending Applications</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border shadow-soft flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-full text-amber-500"><Clock className="w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{pendingLeaves}</p>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">Leave Approvals</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border shadow-soft flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-full text-green-600"><UserCheck className="w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{activeVisitors}</p>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">Visitors Expected Today</p>
            </div>
          </div>
        </div>

        {/* Warden Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border shadow-soft">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Quick Leave Approvals</h3>
            {state.leaveRequests.filter(l => l.status === 'pending').length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No pending leave requests</p>
            ) : (
              <div className="space-y-3">
                {state.leaveRequests.filter(l => l.status === 'pending').map(l => {
                  const s = state.users.find(u => u.id === l.studentId);
                  return (
                    <div key={l.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 text-xs">
                      <div>
                        <p className="font-bold text-gray-900">{s?.fullName}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{l.reason} ({l.fromDate} to {l.toDate})</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => { dispatch(respondLeaveRequest({ leaveId: l.id, status: 'approved' })); toast.success('Approved'); }} className="bg-green-50 text-green-600 font-bold px-2.5 py-1.5 rounded-lg">Approve</button>
                        <button onClick={() => { dispatch(respondLeaveRequest({ leaveId: l.id, status: 'rejected' })); toast.error('Rejected'); }} className="bg-red-50 text-red-600 font-bold px-2.5 py-1.5 rounded-lg">Reject</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-2xl border shadow-soft">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Warden Gatepass Logs</h3>
            <div className="space-y-3">
              {state.visitors.slice(-3).map(v => {
                const s = state.users.find(u => u.id === v.studentId);
                return (
                  <div key={v.id} className="flex items-center justify-between text-xs border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-bold text-gray-900">{v.visitorName} ({v.relation})</p>
                      <p className="text-[10px] text-gray-500">Student host: {s?.fullName}</p>
                    </div>
                    <span className="text-[9px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{v.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- STAFF DASHBOARD VIEW ---
  const renderStaffDashboard = () => {
    const assignedComplaints = state.complaints.filter(c => c.assignedToId === currentUser.id);
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Staff Console</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Welcome back, Marcus. Manage assigned maintenance requests.</p>
        </div>

        {/* Assigned Issues */}
        <div className="bg-white p-5 rounded-2xl border shadow-soft">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">My Assigned Maintenance Requests</h3>
          {assignedComplaints.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">No active maintenance complaints assigned</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {assignedComplaints.map(c => (
                <div key={c.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between text-xs gap-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{c.title}</h4>
                    <p className="text-gray-500 mt-1">{c.description}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Location: Room {c.roomNo} • Priority: {c.priority}</p>
                  </div>
                  <div className="flex gap-1.5 self-start md:self-center">
                    <button onClick={() => { dispatch(resolveComplaint({ complaintId: c.id, status: 'resolved', comment: 'Fixed by Maintenance staff' })); toast.success('Resolved'); }} className="bg-green-50 text-green-600 font-bold px-3 py-1.5 rounded-xl">Resolve Issue</button>
                    <button onClick={() => { dispatch(resolveComplaint({ complaintId: c.id, status: 'closed', comment: 'Verified and Closed' })); toast.success('Closed'); }} className="bg-gray-100 text-gray-600 font-bold px-3 py-1.5 rounded-xl">Close</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- HOSTEL APPLICATION PAGE ---
  const renderApplicationsPage = () => {
    const assignableRooms = state.rooms.filter(
      room => room.status !== 'Under Maintenance' && room.currentOccupancy < room.capacity
    );

    const pickBestRoom = (application, roomPool = assignableRooms) => {
      const preferredRoom = roomPool.find(room =>
        room.hostelId === application.preferredHostelId &&
        (!application.preferredRoomType || room.roomType.toLowerCase().includes(application.preferredRoomType.toLowerCase()))
      );

      return preferredRoom || roomPool[0] || null;
    };

    const allocateApplicationToRoom = (application, room) => {
      if (!room) {
        toast.error('No assignable rooms available.');
        return;
      }

      dispatch(allocateRoom({ studentId: application.studentId, roomId: room.id, applicationId: application.id }));
      toast.success(`Allocated Room ${room.roomNumber} to ${state.users.find(u => u.id === application.studentId)?.fullName || 'student'}`);
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Hostel Applications</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Review and approve admission application requests.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Student</th>
                <th className="p-4">Preferred Hostel</th>
                <th className="p-4">Preferred Room Type</th>
                <th className="p-4">Documents</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {state.applications.map(app => {
                const s = state.users.find(u => u.id === app.studentId);
                const hst = state.hostels.find(h => h.id === app.preferredHostelId);
                return (
                  <tr key={app.id}>
                    <td className="p-4 flex items-center gap-3">
                      <img src={s?.avatar} className="w-8 h-8 rounded-full object-cover border" alt="" />
                      <div>
                        <p className="font-bold text-gray-900">{s?.fullName}</p>
                        <p className="text-[10px] text-gray-400">Year {app.year} • {app.course}</p>
                      </div>
                    </td>
                    <td className="p-4">{hst?.name}</td>
                    <td className="p-4 capitalize">{app.preferredRoomType}</td>
                    <td className="p-4 text-indigo-600 hover:underline cursor-pointer">ID Proof.pdf</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        app.status === 'allocated' ? 'bg-green-50 text-green-600' :
                        app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'
                      }`}>{app.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      {app.status === 'pending' && (
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => { dispatch(updateApplicationStatus({ applicationId: app.id, status: 'approved' })); toast.success('Approved'); }} className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-1 rounded-lg">Approve</button>
                          <button onClick={() => { dispatch(updateApplicationStatus({ applicationId: app.id, status: 'rejected' })); toast.error('Rejected'); }} className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-1 rounded-lg">Reject</button>
                        </div>
                      )}
                      {app.status === 'approved' && (
                        <button onClick={() => {
                          allocateApplicationToRoom(app, pickBestRoom(app));
                        }} className="text-[10px] bg-[#4F46E5] text-white font-bold px-2 py-1 rounded-lg">Allocate Room</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- ALLOCATION PAGE ---
  const renderAllocationPage = () => {
    const approvedApplications = state.applications.filter(app => app.status === 'approved');
    const assignableRooms = state.rooms.filter(
      room => room.status !== 'Under Maintenance' && room.currentOccupancy < room.capacity
    );
    const activeAllocations = state.allocations.filter(allocation => allocation.isActive);

    const pickBestRoom = (application, roomPool = assignableRooms) => {
      const preferredRoom = roomPool.find(room =>
        room.hostelId === application.preferredHostelId &&
        (!application.preferredRoomType || room.roomType.toLowerCase().includes(application.preferredRoomType.toLowerCase()))
      );

      return preferredRoom || roomPool[0] || null;
    };

    const allocateApplicationToRoom = (application, room, silent = false) => {
      if (!room) {
        if (!silent) toast.error('No assignable rooms available.');
        return false;
      }

      dispatch(allocateRoom({ studentId: application.studentId, roomId: room.id, applicationId: application.id }));
      if (!silent) {
        toast.success(`Allocated Room ${room.roomNumber} to ${state.users.find(u => u.id === application.studentId)?.fullName || 'student'}`);
      }
      return true;
    };

    const runSmartAllocation = () => {
      if (approvedApplications.length === 0 || assignableRooms.length === 0) {
        toast.error('No approved applications or assignable rooms are available.');
        return;
      }

      const roomPool = [...assignableRooms];
      let allocationCount = 0;

      approvedApplications.forEach(application => {
        const room = pickBestRoom(application, roomPool);
        if (!room) return;

        const roomIndex = roomPool.findIndex(candidate => candidate.id === room.id);
        if (roomIndex !== -1) roomPool.splice(roomIndex, 1);

        if (allocateApplicationToRoom(application, room, true)) {
          allocationCount += 1;
        }
      });

      if (allocationCount > 0) {
        toast.success(`Allocated ${allocationCount} room${allocationCount === 1 ? '' : 's'} successfully!`);
      } else {
        toast.error('No approved applications matched the available rooms.');
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Room Allocations</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Allocate rooms automatically or manually.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft">
            <p className="text-[10px] uppercase font-bold text-gray-400">Approved Applications</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{approvedApplications.length}</p>
            <p className="text-xs text-gray-500 mt-1">Ready for allocation</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft">
            <p className="text-[10px] uppercase font-bold text-gray-400">Assignable Rooms</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{assignableRooms.length}</p>
            <p className="text-xs text-gray-500 mt-1">Available, not full, not under maintenance</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft">
            <p className="text-[10px] uppercase font-bold text-gray-400">Active Allocations</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{activeAllocations.length}</p>
            <p className="text-xs text-gray-500 mt-1">Currently occupied room assignments</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-11 h-11 text-[#4F46E5] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800">Smart Auto Allocation</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">Allocates approved applications to rooms that still have capacity. It prefers the application&apos;s hostel and room type, then falls back to the next assignable room.</p>
            </div>
          </div>
          <button
            onClick={runSmartAllocation}
            className="w-full py-2.5 bg-[#4F46E5] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#4338CA] transition-all"
          >
            Run Smart Allocation
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden min-w-0">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm">Approved Applications</h3>
              <span className="text-[10px] font-bold uppercase text-gray-400">{approvedApplications.length} waiting</span>
            </div>
            <div className="divide-y divide-gray-100">
              {approvedApplications.length === 0 ? (
                <p className="p-6 text-center text-xs text-gray-400">No approved applications ready for allocation.</p>
              ) : approvedApplications.map(app => {
                const student = state.users.find(user => user.id === app.studentId);
                const bestRoom = pickBestRoom(app);
                const hostel = state.hostels.find(h => h.id === app.preferredHostelId);

                return (
                  <div key={app.id} className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={student?.avatar} className="w-10 h-10 rounded-full object-cover border" alt="" />
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{student?.fullName}</p>
                        <p className="text-[10px] text-gray-400">{hostel?.name || 'Any Hostel'} • {app.preferredRoomType}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => allocateApplicationToRoom(app, bestRoom)}
                      className="self-start md:self-center text-[10px] bg-[#EEF2FF] text-[#4F46E5] font-bold px-3 py-1.5 rounded-lg hover:bg-[#E0E7FF] transition-all"
                    >
                      Allocate {bestRoom ? `Room ${bestRoom.roomNumber}` : 'Next Room'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden min-w-0">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm">Assignable Rooms</h3>
              <span className="text-[10px] font-bold uppercase text-gray-400">{assignableRooms.length} rooms</span>
            </div>
            <div className="divide-y divide-gray-100">
              {assignableRooms.length === 0 ? (
                <p className="p-6 text-center text-xs text-gray-400">No rooms currently available for allocation.</p>
              ) : assignableRooms.map(room => {
                const hostelName = state.hostels.find(h => h.id === room.hostelId)?.name || 'Hostel';
                return (
                  <div key={room.id} className="p-4 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-gray-900">{hostelName} - Room {room.roomNumber}</p>
                      <p className="text-gray-500 mt-0.5">{room.roomType} • Floor {room.floor}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600 uppercase">
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden min-w-0">
          <div className="p-4 border-b border-gray-100 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-bold text-gray-800 text-sm">Current Allocations</h3>
            <span className="text-[10px] font-bold uppercase text-gray-400">{activeAllocations.length} active</span>
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[720px]">
              <thead>
                <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                  <th className="p-4">Student</th>
                  <th className="p-4">Room</th>
                  <th className="p-4">Hostel</th>
                  <th className="p-4">Allocated By</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                {activeAllocations.length === 0 ? (
                  <tr>
                    <td className="p-6 text-center text-gray-400" colSpan="5">No active room allocations yet.</td>
                  </tr>
                ) : activeAllocations.map(allocation => {
                  const student = state.users.find(user => user.id === allocation.studentId);
                  const room = state.rooms.find(r => r.id === allocation.roomId);
                  const hostel = state.hostels.find(h => h.id === room?.hostelId);
                  const allocatedBy = state.users.find(user => user.id === allocation.allocatedBy);

                  return (
                    <tr key={allocation.id}>
                      <td className="p-4">{student?.fullName || 'Unknown Student'}</td>
                      <td className="p-4">Room {room?.roomNumber || 'N/A'}</td>
                      <td className="p-4">{hostel?.name || 'N/A'}</td>
                      <td className="p-4">{allocatedBy?.fullName || 'System'}</td>
                      <td className="p-4">{allocation.allocationDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {activeAllocations.length === 0 ? (
              <p className="p-6 text-center text-xs text-gray-400">No active room allocations yet.</p>
            ) : activeAllocations.map(allocation => {
              const student = state.users.find(user => user.id === allocation.studentId);
              const room = state.rooms.find(r => r.id === allocation.roomId);
              const hostel = state.hostels.find(h => h.id === room?.hostelId);
              const allocatedBy = state.users.find(user => user.id === allocation.allocatedBy);

              return (
                <div key={allocation.id} className="p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-gray-900 truncate">{student?.fullName || 'Unknown Student'}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600 uppercase">Active</span>
                  </div>
                  <p className="text-gray-500">Room {room?.roomNumber || 'N/A'} • {hostel?.name || 'N/A'}</p>
                  <p className="text-gray-500">Allocated by {allocatedBy?.fullName || 'System'} on {allocation.allocationDate}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // --- FEE MANAGEMENT PAGE ---
  const renderFeesPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Fee & Invoicing</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Generate student semester bills and review transaction receipts.</p>
        </div>
        
        {/* Generate Fee Action */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <h3 className="text-sm font-bold text-gray-800 uppercase border-b pb-3 mb-4">Generate Student Bill</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const studentId = e.target.student.value;
            const amount = e.target.amount.value;
            const feeType = e.target.type.value;
            const cycle = e.target.cycle.value;
            const date = e.target.date.value;
            if (!amount || !cycle || !date) {
              toast.error('Please enter all billing details');
              return;
            }
            dispatch(generateFee({ studentId, amount, feeType, billingCycle: cycle, dueDate: date }));
            e.target.reset();
            toast.success('Bill generated successfully!');
          }} className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Select Student</label>
              <select name="student" className="w-full h-10 px-2 border rounded-xl bg-white">
                {state.users.filter(u => u.role === 'student').map(u => (
                  <option key={u.id} value={u.id}>{u.fullName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Bill Type</label>
              <select name="type" className="w-full h-10 px-2 border rounded-xl bg-white">
                <option value="hostel_fee">Hostel Fee</option>
                <option value="mess_fee">Mess Fee</option>
                <option value="security_deposit">Security Deposit</option>
                <option value="maintenance_charges">Maintenance Charges</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Amount (₹)</label>
              <input type="number" name="amount" placeholder="e.g. 15000" className="w-full h-10 px-3 border rounded-xl bg-white" />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Billing Cycle</label>
              <input type="text" name="cycle" placeholder="e.g. July 2026" className="w-full h-10 px-3 border rounded-xl bg-white" />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-600">Due Date</label>
              <input type="date" name="date" className="w-full h-10 px-3 border rounded-xl bg-white" />
            </div>
            <div className="col-span-2 md:col-span-5 flex justify-end pt-2">
              <button type="submit" className="py-2.5 px-6 bg-[#4F46E5] text-white font-bold rounded-xl shadow-md">Generate Invoice</button>
            </div>
          </form>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-bold text-sm text-gray-800">Transaction History</h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Student</th>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {state.payments.map(pay => {
                const s = state.users.find(u => u.id === pay.studentId);
                return (
                  <tr key={pay.id}>
                    <td className="p-4 flex items-center gap-2">
                      <img src={s?.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                      <span>{s?.fullName}</span>
                    </td>
                    <td className="p-4 font-mono text-gray-900 font-bold">{pay.transactionId}</td>
                    <td className="p-4 text-[#4F46E5] font-bold">₹{pay.amount.toLocaleString('en-IN')}</td>
                    <td className="p-4 capitalize">{pay.paymentMethod.replace('_', ' ')}</td>
                    <td className="p-4">{new Date(pay.paymentDate).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toast.success('Downloading PDF Invoice...');
                        }}
                        className="text-[#4F46E5] hover:underline"
                      >
                        Download PDF
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- ATTENDANCE MANAGEMENT PAGE ---
  const renderAttendancePage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Attendance Tracker</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Review student daily gate check-in and check-out logs.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Student</th>
                <th className="p-4">Log Type</th>
                <th className="p-4">Method</th>
                <th className="p-4">Check Date</th>
                <th className="p-4">Log Time</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {state.attendance.map(att => {
                const s = state.users.find(u => u.id === att.studentId);
                return (
                  <tr key={att.id}>
                    <td className="p-4 flex items-center gap-2">
                      <img src={s?.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                      <span>{s?.fullName}</span>
                    </td>
                    <td className="p-4 capitalize">{att.type.replace('_', ' ')}</td>
                    <td className="p-4 uppercase font-bold text-gray-500">{att.method}</td>
                    <td className="p-4">{att.date}</td>
                    <td className="p-4 font-mono">{new Date(att.timestamp).toLocaleTimeString()}</td>
                    <td className="p-4 text-right">
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">{att.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- LEAVE REQUESTS PAGE ---
  const renderLeavesPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Leave Requests</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Manage leave permissions and parent approvals.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Student</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Parent Status</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {state.leaveRequests.map(leave => {
                const s = state.users.find(u => u.id === leave.studentId);
                return (
                  <tr key={leave.id}>
                    <td className="p-4 flex items-center gap-2">
                      <img src={s?.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                      <span>{s?.fullName}</span>
                    </td>
                    <td className="p-4">{leave.reason}</td>
                    <td className="p-4">{leave.fromDate} to {leave.toDate}</td>
                    <td className="p-4">{leave.destination}</td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">SMS Approved</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        leave.status === 'approved' ? 'bg-green-50 text-green-600' :
                        leave.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                      }`}>{leave.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      {leave.status === 'pending' && (
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => { dispatch(respondLeaveRequest({ leaveId: leave.id, status: 'approved' })); toast.success('Approved'); }} className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-1 rounded-lg">Approve</button>
                          <button onClick={() => { dispatch(respondLeaveRequest({ leaveId: leave.id, status: 'rejected' })); toast.error('Rejected'); }} className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-1 rounded-lg">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- VISITORS PAGE ---
  const renderVisitorsPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Visitor Gates Tracker</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Approve visitor passes and update security logs.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Visitor</th>
                <th className="p-4">Student Host</th>
                <th className="p-4">Expected Time</th>
                <th className="p-4">Exit Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {state.visitors.map(v => {
                const s = state.users.find(u => u.id === v.studentId);
                return (
                  <tr key={v.id}>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{v.visitorName}</p>
                      <p className="text-[10px] text-gray-400">{v.relation} • {v.phone}</p>
                    </td>
                    <td className="p-4">{s?.fullName}</td>
                    <td className="p-4">{new Date(v.visitTime).toLocaleString()}</td>
                    <td className="p-4">{v.exitTime ? new Date(v.exitTime).toLocaleString() : '—'}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        v.status === 'exited' ? 'bg-gray-100 text-gray-600' :
                        v.status === 'entered' ? 'bg-blue-50 text-blue-600' :
                        v.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                      }`}>{v.status.replace('_', ' ')}</span>
                    </td>
                    <td className="p-4 text-right">
                      {v.status === 'pending_warden' && (
                        <button onClick={() => { dispatch(respondVisitorRequest({ visitorId: v.id, status: 'approved' })); toast.success('Approved'); }} className="text-[10px] bg-green-50 text-green-600 font-bold px-2.5 py-1 rounded-lg">Approve Pass</button>
                      )}
                      {v.status === 'approved' && (
                        <button onClick={() => { dispatch(respondVisitorRequest({ visitorId: v.id, status: 'entered' })); toast.success('Visitor Checked In'); }} className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-lg">Mark Entry</button>
                      )}
                      {v.status === 'entered' && (
                        <button onClick={() => { dispatch(respondVisitorRequest({ visitorId: v.id, status: 'exited' })); toast.success('Visitor Checked Out'); }} className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2.5 py-1 rounded-lg">Mark Exit</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- COMPLAINTS PAGE ---
  const renderComplaintsPage = () => {
    const staffMembers = state.users.filter(u => u.role === 'staff');
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Complaints & Maintenance Logs</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Assign issues to maintenance staff and track resolution logs.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Issue Details</th>
                <th className="p-4">Location</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {state.complaints.map(c => {
                const staff = staffMembers.find(s => s.id === c.assignedToId);
                return (
                  <tr key={c.id}>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{c.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{c.description}</p>
                    </td>
                    <td className="p-4">Room {c.roomNo}</td>
                    <td className="p-4 font-bold text-gray-700">{staff ? staff.fullName : 'Unassigned'}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        c.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>{c.priority}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        c.status === 'resolved' ? 'bg-green-50 text-green-600' :
                        c.status === 'in_progress' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                      }`}>{c.status.replace('_', ' ')}</span>
                    </td>
                    <td className="p-4 text-right">
                      {c.status === 'open' && (
                        <select
                          onChange={(e) => {
                            dispatch(assignComplaint({ complaintId: c.id, staffId: e.target.value }));
                            toast.success('Assigned complaint to maintenance staff');
                          }}
                          className="text-[10px] font-bold text-gray-600 bg-gray-50 border rounded-lg p-1 cursor-pointer outline-none"
                          defaultValue=""
                        >
                          <option value="" disabled>Assign Staff</option>
                          {staffMembers.map(st => (
                            <option key={st.id} value={st.id}>{st.fullName}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- MESS MANAGEMENT PAGE ---
  const renderMessPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Mess & Meal Menu</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Configure weekly dining meal schedule.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {state.mess.map((m) => (
            <div key={m.day} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-3 hover-scale">
              <h3 className="text-sm font-black text-[#4F46E5] uppercase border-b pb-2 capitalize">{m.day}</h3>
              <div className="space-y-1.5 text-xs text-gray-600 font-semibold">
                <p>🍳 <strong>Breakfast:</strong> {m.breakfast}</p>
                <p>🍲 <strong>Lunch:</strong> {m.lunch}</p>
                <p>☕ <strong>Snacks:</strong> {m.snacks || 'Milk & Tea'}</p>
                <p>🍛 <strong>Dinner:</strong> {m.dinner}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- INVENTORY MANAGEMENT PAGE ---
  const renderInventoryPage = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-gray-900">Inventory Stock Ledger</h2>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">Asset verification ledger for hostel beds, furniture, and fans.</p>
          </div>
          <button onClick={() => {
            dispatch(addInventoryItem({ itemType: 'chair', hostelId: 'hst-boys-a', quantity: 50, condition: 'good' }));
            toast.success('Added new chairs package to stock');
          }} className="flex items-center gap-1.5 py-2 px-4 bg-[#4F46E5] text-white font-bold text-xs rounded-xl shadow-md transition-all">
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Item Type</th>
                <th className="p-4">Hostel Block</th>
                <th className="p-4">Available Quantity</th>
                <th className="p-4">Asset Condition</th>
                <th className="p-4 text-right">Stock Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {state.inventory.map(item => {
                const hst = state.hostels.find(h => h.id === item.hostelId);
                return (
                  <tr key={item.id}>
                    <td className="p-4 capitalize font-bold text-gray-900">{item.itemType.replace('_', ' ')}</td>
                    <td className="p-4">{hst?.name}</td>
                    <td className="p-4 text-gray-800">{item.quantity} Units</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.condition === 'good' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>{item.condition}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          const newQty = prompt('Enter new quantity:', item.quantity);
                          if (newQty) {
                            dispatch(updateInventoryStock({ id: item.id, quantity: newQty, condition: item.condition, description: 'Manual Ledger Audit Update' }));
                            toast.success('Ledger stock updated');
                          }
                        }}
                        className="text-[#4F46E5] hover:underline"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- STAFF REGISTRY PAGE ---
  const renderStaffPage = () => {
    const staffMembers = state.users.filter(u => u.role === 'staff');
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Hostel Staff Registry</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Manage details of maintenance workers, guards and cleaners.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase border-b">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Mobile Contacts</th>
                <th className="p-4">Designation</th>
                <th className="p-4 text-right">Duty Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {staffMembers.map(st => (
                <tr key={st.id}>
                  <td className="p-4 flex items-center gap-3">
                    <img src={st.avatar} className="w-8 h-8 rounded-full object-cover border" alt="" />
                    <div>
                      <p className="font-bold text-gray-900">{st.fullName}</p>
                      <p className="text-[10px] text-gray-400">{st.email}</p>
                    </div>
                  </td>
                  <td className="p-4">{st.phone}</td>
                  <td className="p-4">Maintenance Technician</td>
                  <td className="p-4 text-right">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase">On Duty</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- NOTIFICATIONS PAGE ---
  const renderNotificationsPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Notifications Broadcaster</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Send alerts and system-wide announcements.</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft max-w-md mx-auto text-center space-y-4">
          <Bell className="w-12 h-12 text-[#4F46E5] mx-auto animate-swing" />
          <h3 className="font-bold text-gray-800">Broadcast Alert</h3>
          <p className="text-xs text-gray-500 leading-relaxed">Broadcast real-time mobile push notifications to all student devices via the simulated Socket.IO channel.</p>
          <button onClick={() => {
            toast.success('System notification broadcasted to all residents');
          }} className="w-full py-2.5 bg-[#4F46E5] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#4338CA] transition-all">Send System Broadcast</button>
        </div>
      </div>
    );
  };

  // --- REPORTS PAGE ---
  const renderReportsPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Reports Desk</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Compile audits, dining feedbacks, and revenue details.</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft max-w-md mx-auto text-center space-y-4">
          <BarChart3 className="w-12 h-12 text-[#4F46E5] mx-auto" />
          <h3 className="font-bold text-gray-800">Generate Audit Reports</h3>
          <p className="text-xs text-gray-500 leading-relaxed">Export hostel occupant registry sheets, dining menu statistics and payment receipt lists to excel/pdf files.</p>
          <button onClick={() => {
            toast.success('Compiling audit statistics... Report download started!');
          }} className="w-full py-2.5 bg-[#4F46E5] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#4338CA] transition-all">Download Audit PDF</button>
        </div>
      </div>
    );
  };

  // --- PROFILE PAGE ---
  const renderProfilePage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Profile Details</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Update personal details and password credentials.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft max-w-md mx-auto space-y-4">
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-[#4F46E5]" alt="" />
            <div>
              <h3 className="font-black text-gray-900 text-base">{currentUser.fullName}</h3>
              <p className="text-xs text-[#4F46E5] font-bold uppercase tracking-wider">{currentUser.role} Account</p>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t text-xs text-gray-600 font-semibold">
            <p>📧 <strong>Email Address:</strong> {currentUser.email}</p>
            <p>📞 <strong>Phone Contact:</strong> {currentUser.phone || '9999999999'}</p>
          </div>
          <button onClick={() => toast.success('Profile credentials updated!')} className="w-full py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-xl shadow-md">Edit Profile Credentials</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex overflow-x-hidden">
      {/* Dynamic Toaster Notification */}
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#363636', color: '#fff', fontSize: '12px', fontWeight: '600', borderRadius: '12px' } }} />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Workspace Frame container */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px]">
        {/* 2. Top Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        {/* Inner flex layout combining Admin Page Content and Student Mobile Simulator */}
        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
          {/* Main Dashboard Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 min-w-0">
            {renderMainContent()}
          </main>

          {/* 3. Right-Side Mobile App Simulator */}
          <MobileSimulator />
        </div>
      </div>
    </div>
  );
}
