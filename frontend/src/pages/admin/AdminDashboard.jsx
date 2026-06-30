import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Users,
  Bed,
  CreditCard,
  AlertTriangle,
  Heart,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck,
  CheckCircle,
  HelpCircle,
  CalendarCheck,
  ClipboardList
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { respondLeaveRequest, updateApplicationStatus } from '../../store/slices/hmsSlice';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.hms);

  // --- Calculations based on Redux State ---
  const totalStudents = state.users.filter((u) => u.role === 'student').length + 1245; // Base seed offset
  const totalRoomsCount = state.rooms.length + 1244;
  const occupiedRoomsCount = state.rooms.filter((r) => r.status === 'Occupied').length + 980;
  const pendingComplaintsCount = state.complaints.filter((c) => c.status === 'open' || c.status === 'in_progress').length + 21;
  const totalRevenue = '₹24,58,600';

  // Doughnut Chart Data
  const occupancyData = [
    { name: 'Occupied', value: 982, color: '#4F46E5' },
    { name: 'Available', value: 243, color: '#10B981' },
    { name: 'Maintenance', value: 23, color: '#F59E0B' }
  ];

  // Line Chart Data
  const revenueHistory = [
    { name: 'Jan', revenue: 320000 },
    { name: 'Feb', revenue: 410000 },
    { name: 'Mar', revenue: 380000 },
    { name: 'Apr', revenue: 540000 },
    { name: 'May', revenue: 480000 },
    { name: 'Jun', revenue: 620000 }
  ];

  // Actions
  const handleLeaveResponse = (leaveId, status) => {
    dispatch(respondLeaveRequest({ leaveId, status, remarks: 'Processed by Administrator' }));
    toast.success(`Leave request ${status} successfully!`);
  };

  const handleApproveApp = (applicationId, status) => {
    dispatch(updateApplicationStatus({ applicationId, status, remarks: 'Approved' }));
    toast.success(`Application updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Heading */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 leading-tight">Dashboard</h2>
        <p className="text-sm text-gray-500 font-semibold mt-1">Welcome back, Admin!</p>
      </div>

      {/* Row 1: 5 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4 hover-scale">
          <div className="bg-indigo-50 p-3 rounded-full text-[#4F46E5]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-tight">{totalStudents}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Total Students</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4 hover-scale">
          <div className="bg-green-50 p-3 rounded-full text-[#10B981]">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-tight">{occupiedRoomsCount}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Occupied Rooms</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4 hover-scale">
          <div className="bg-amber-50 p-3 rounded-full text-[#F59E0B]">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-tight">{totalRoomsCount}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Total Rooms</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4 hover-scale">
          <div className="bg-purple-50 p-3 rounded-full text-purple-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-tight">{totalRevenue}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Fee Collection</p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4 hover-scale">
          <div className="bg-red-50 p-3 rounded-full text-[#EE4646]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900 leading-tight">{pendingComplaintsCount}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Pending Complaints</p>
          </div>
        </div>
      </div>

      {/* Row 2: Charts and Room Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Doughnut */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Occupancy Overview</h3>
          <div className="h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-800">78.7%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Occupancy</span>
            </div>
          </div>
          <div className="flex justify-around mt-4">
            {occupancyData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Type Summary Table */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Room Type Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-bold uppercase border-b border-gray-100">
                  <th className="pb-3">Room Type</th>
                  <th className="pb-3 text-center">Total</th>
                  <th className="pb-3 text-center">Occupied</th>
                  <th className="pb-3 text-center">Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3">Single Sharing</td>
                  <td className="py-3 text-center text-gray-900 font-bold">120</td>
                  <td className="py-3 text-center text-[#4F46E5]">94</td>
                  <td className="py-3 text-center text-green-600">26</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3">Double Sharing</td>
                  <td className="py-3 text-center text-gray-900 font-bold">480</td>
                  <td className="py-3 text-center text-[#4F46E5]">392</td>
                  <td className="py-3 text-center text-green-600">88</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3">Triple Sharing</td>
                  <td className="py-3 text-center text-gray-900 font-bold">360</td>
                  <td className="py-3 text-center text-[#4F46E5]">286</td>
                  <td className="py-3 text-center text-green-600">74</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3">Dormitory</td>
                  <td className="py-3 text-center text-gray-900 font-bold">288</td>
                  <td className="py-3 text-center text-[#4F46E5]">210</td>
                  <td className="py-3 text-center text-green-600">78</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Collection Overview Line Chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Fee Collection Overview</h3>
            <span className="text-[10px] text-green-600 bg-green-50 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Recent Applications</h3>
          <div className="overflow-y-auto max-h-[280px] flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-bold uppercase border-b border-gray-50">
                  <th className="pb-2">Student</th>
                  <th className="pb-2">Room Type</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                {state.applications.slice(-3).map((app) => {
                  const s = state.users.find((u) => u.id === app.studentId);
                  return (
                    <tr key={app.id}>
                      <td className="py-2.5 flex items-center gap-2">
                        <img src={s?.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                        <span className="truncate max-w-[80px]">{s?.fullName}</span>
                      </td>
                      <td className="py-2.5 capitalize">{app.preferredRoomType}</td>
                      <td className="py-2.5 text-right">
                        {app.status === 'pending' ? (
                          <div className="flex gap-1 justify-end">
                            <button onClick={() => handleApproveApp(app.id, 'approved')} className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Approve</button>
                            <button onClick={() => handleApproveApp(app.id, 'rejected')} className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">Reject</button>
                          </div>
                        ) : (
                          <span className={`text-[10px] uppercase font-bold ${
                            app.status === 'allocated' ? 'text-green-600' :
                            app.status === 'approved' ? 'text-blue-600' : 'text-red-500'
                          }`}>{app.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Leave Requests</h3>
          <div className="overflow-y-auto max-h-[280px] flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-bold uppercase border-b border-gray-50">
                  <th className="pb-2">Student</th>
                  <th className="pb-2">Reason</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                {state.leaveRequests.slice(-3).map((leave) => {
                  const s = state.users.find((u) => u.id === leave.studentId);
                  return (
                    <tr key={leave.id}>
                      <td className="py-2.5 flex items-center gap-2">
                        <img src={s?.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                        <span className="truncate max-w-[80px]">{s?.fullName}</span>
                      </td>
                      <td className="py-2.5 truncate max-w-[100px]">{leave.reason}</td>
                      <td className="py-2.5 text-right font-bold">
                        {leave.status === 'pending' ? (
                          <div className="flex gap-1 justify-end">
                            <button onClick={() => handleLeaveResponse(leave.id, 'approved')} className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Approve</button>
                            <button onClick={() => handleLeaveResponse(leave.id, 'rejected')} className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">Reject</button>
                          </div>
                        ) : (
                          <span className={leave.status === 'approved' ? 'text-green-600' : 'text-red-500'}>{leave.status.toUpperCase()}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Recent Complaints</h3>
          <div className="overflow-y-auto max-h-[280px] flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-bold uppercase border-b border-gray-50">
                  <th className="pb-2">Issue</th>
                  <th className="pb-2">Room</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                {state.complaints.slice(-3).map((comp) => (
                  <tr key={comp.id}>
                    <td className="py-2.5 truncate max-w-[120px]">{comp.title}</td>
                    <td className="py-2.5">Room {comp.roomNo}</td>
                    <td className="py-2.5 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        comp.status === 'resolved' ? 'bg-green-50 text-green-600' :
                        comp.status === 'in_progress' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                      }`}>{comp.status.replace('_', ' ')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Birthdays */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4">Upcoming Birthdays</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" className="w-8 h-8 rounded-full object-cover" alt="" />
            <div>
              <p className="text-xs font-bold text-gray-800">John Doe</p>
              <p className="text-[10px] text-gray-400 font-semibold">Room 204 • July 05</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-8 h-8 rounded-full object-cover" alt="" />
            <div>
              <p className="text-xs font-bold text-gray-800">Jane Smith</p>
              <p className="text-[10px] text-gray-400 font-semibold">Room 105 • July 12</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100" className="w-8 h-8 rounded-full object-cover" alt="" />
            <div>
              <p className="text-xs font-bold text-gray-800">Alan Turing</p>
              <p className="text-[10px] text-gray-400 font-semibold">Block B - 302 • Aug 23</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-8 h-8 rounded-full object-cover" alt="" />
            <div>
              <p className="text-xs font-bold text-gray-800">Marcus Vance</p>
              <p className="text-[10px] text-gray-400 font-semibold">Staff Block • Sep 14</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections: System Architecture, Modules, Features list, Hostel overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. System Architecture */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-4 flex items-center gap-1.5"><Layers className="w-4 h-4 text-[#4F46E5]" /> Architecture</h3>
          <div className="space-y-3.5 pt-2 text-center text-xs font-bold text-gray-700">
            <div className="p-2.5 bg-[#EEF2FF] border border-[#4F46E5]/20 rounded-xl text-[#4F46E5]">React.js Frontend</div>
            <div className="w-0.5 h-4 bg-gray-300 mx-auto" />
            <div className="p-2.5 bg-green-50 border border-green-200 rounded-xl text-green-700">Node/Express APIs</div>
            <div className="w-0.5 h-4 bg-gray-300 mx-auto" />
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">MongoDB Database</div>
          </div>
        </div>

        {/* 2. Main Modules Grid */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-3 flex items-center gap-1.5"><ClipboardList className="w-4 h-4 text-purple-600" /> Main Modules</h3>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" /> User Mgmt</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Hostel Mgmt</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> Room Allocation</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Fee Billing</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> QR Attendance</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full" /> Visitor Logs</span>
          </div>
          <button className="text-xs text-[#4F46E5] font-bold hover:underline text-left mt-3 flex items-center gap-1">View API Docs <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>

        {/* 3. Key Features Checklist */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-3 flex items-center gap-1.5"><FileCheck className="w-4 h-4 text-green-600" /> Key Features</h3>
          <ul className="space-y-1.5 text-xs text-gray-600 font-semibold">
            <li className="flex items-center gap-1.5 text-green-600">✓ Real-time Notifications</li>
            <li className="flex items-center gap-1.5 text-green-600">✓ Smart Room Allocation</li>
            <li className="flex items-center gap-1.5 text-green-600">✓ Online Fee Payment</li>
            <li className="flex items-center gap-1.5 text-green-600">✓ Attendance QR Tracker</li>
            <li className="flex items-center gap-1.5 text-green-600">✓ Role-Based Security</li>
          </ul>
        </div>

        {/* 4. Hostel Overview Progress Rings */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-3 flex items-center gap-1.5"><CalendarCheck className="w-4 h-4 text-orange-500" /> Hostels Overview</h3>
          <div className="space-y-2.5 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-700">
                <span>Boys Hostel A</span>
                <span>78% (390/500)</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-[#4F46E5] h-full" style={{ width: '78%' }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-700">
                <span>Girls Hostel A</span>
                <span>85% (340/400)</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
