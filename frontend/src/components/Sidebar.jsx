import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  Users,
  Building2,
  Bed,
  FileText,
  KeyRound,
  CreditCard,
  CalendarCheck,
  CalendarX,
  UserCheck,
  AlertTriangle,
  ClipboardList,
  Package,
  ShieldCheck,
  Bell,
  BarChart3,
  Settings,
  User,
  ArrowRightLeft,
  Building
} from 'lucide-react';
import { switchRole } from '../store/slices/hmsSlice';

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', name: 'Students', icon: Users },
  { id: 'hostels', name: 'Hostels', icon: Building2 },
  { id: 'rooms', name: 'Rooms', icon: Bed },
  { id: 'applications', name: 'Applications', icon: FileText },
  { id: 'allocation', name: 'Room Allocation', icon: KeyRound },
  { id: 'fees', name: 'Fee Management', icon: CreditCard },
  { id: 'attendance', name: 'Attendance', icon: CalendarCheck },
  { id: 'leaves', name: 'Leave Requests', icon: CalendarX },
  { id: 'visitors', name: 'Visitors', icon: UserCheck },
  { id: 'complaints', name: 'Complaints', icon: AlertTriangle },
  { id: 'mess', name: 'Mess Management', icon: ClipboardList },
  { id: 'inventory', name: 'Inventory', icon: Package },
  { id: 'staff', name: 'Staff Management', icon: ShieldCheck },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'reports', name: 'Reports', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
  { id: 'profile', name: 'Admin Profile', icon: User }
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.hms.currentUser);

  const handleRoleChange = (e) => {
    dispatch(switchRole(e.target.value));
  };

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-[#E5E7EB] flex flex-col fixed left-0 top-0 z-20">
      {/* Logo Area */}
      <div className="p-6 border-b border-[#E5E7EB] flex items-center gap-3">
        <div className="bg-[#4F46E5] text-white p-2 rounded-lg shadow-sm">
          <Building className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 leading-none">Hostel</h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Management System</p>
        </div>
      </div>

      {/* Menu Area */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#4F46E5] text-white glow-effect'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Demo Switcher & Profile Area */}
      <div className="p-4 border-t border-[#E5E7EB] bg-gray-50 flex flex-col gap-3">
        {/* Role Switcher */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#E5E7EB] shadow-sm">
          <ArrowRightLeft className="w-4 h-4 text-[#4F46E5]" />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-gray-400 leading-none">Demo View</label>
            <select
              value={currentUser?.role || ''}
              onChange={handleRoleChange}
              className="text-xs font-semibold text-gray-700 bg-transparent border-none outline-none w-full p-0 cursor-pointer"
            >
              <option value="admin">Super Admin</option>
              <option value="warden">Hostel Warden</option>
              <option value="staff">Hostel Staff</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>

        {/* User Card */}
        {currentUser && (
          <div className="flex items-center gap-3 px-1">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB] shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate leading-none mb-1">{currentUser.fullName}</p>
              <p className="text-xs text-[#4F46E5] font-semibold capitalize">
                {currentUser.role === 'admin' ? 'Super Admin' : currentUser.role}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
