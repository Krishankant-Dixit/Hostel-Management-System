import React, { useState, useEffect } from 'react';
import { useFetchData } from './hooks/useFetchData';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MobileSimulator from './components/MobileSimulator';
import AuthPage from './pages/AuthPage';

// Firebase Auth Import
import { auth } from './firebaseConfig';

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
  FileText,
  Activity
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.hms);
  useFetchData(); // Yeh background me MongoDB se baat karega
  
  // Firebase User Local State
  const [fbUser, setFbUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Sync Firebase Login State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFbUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const currentUser = state.currentUser;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 1. Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB]">
        <div className="text-center font-bold text-[#4F46E5] animate-pulse text-lg">
          🔄 Securing Connection...
        </div>
      </div>
    );
  }

  // 2. 🚨 REAL AUTH GATEWAY: Agar banda login nahi hai to seedhe Login Screen par roko
  if (!fbUser) {
    return <AuthPage />;
  }

  // --- Dynamic Tab Render Controller ---
  const renderMainContent = () => {
    if (currentUser?.role === 'student') {
      return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft text-center max-w-xl mx-auto mt-10">
          <Activity className="w-16 h-16 text-[#4F46E5] mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Student Mobile View Active</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            You are currently logged in as a <strong>Student Resident</strong> ({fbUser.email}).
            Please use the <strong>Live App Simulator</strong> phone frame on the right side.
          </p>
        </div>
      );
    }

    const isWarden = currentUser?.role === 'warden';
    const isStaff = currentUser?.role === 'staff';

    switch (activeTab) {
      case 'dashboard':
        if (isWarden) return renderWardenDashboard();
        if (isStaff) return renderStaffDashboard();
        return <AdminDashboard />;
      case 'students': return <ManageStudents />;
      case 'hostels': return <ManageHostels />;
      case 'rooms': return <ManageRooms />;
      case 'applications': return <div className="p-4 bg-white rounded-xl border">Applications Dashboard</div>;
      case 'allocation': return <div className="p-5 bg-white rounded-xl border">Allocation Engine</div>;
      case 'fees': return <div className="p-5 bg-white rounded-xl border">Fee Ledger</div>;
      case 'attendance': return <div className="p-4 bg-white rounded-xl border">Attendance Registry</div>;
      case 'leaves': return <div className="p-4 bg-white rounded-xl border">Leave Register</div>;
      case 'visitors': return <div className="p-4 bg-white rounded-xl border">Visitor Records</div>;
      case 'complaints': return <div className="p-4 bg-white rounded-xl border">Complaints Ledger</div>;
      case 'mess': return <div className="p-4 bg-white rounded-xl border">Mess Calendar</div>;
      case 'inventory': return <div className="p-4 bg-white rounded-xl border">Assets Ledger</div>;
      case 'staff': return <div className="p-4 bg-white rounded-xl border">Staff Roster</div>;
      case 'notifications': return <div className="p-4 bg-white rounded-xl border">Broadcaster</div>;
      case 'reports': return <div className="p-4 bg-white rounded-xl border">Reports Console</div>;
      case 'settings': return <SystemSettings />;
      case 'profile': return <div className="p-4 bg-white rounded-xl border">User Profile Details</div>;
      default: return <AdminDashboard />;
    }
  };

  const renderWardenDashboard = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-gray-900">Warden Console Logged In</h2>
      </div>
    );
  };

  const renderStaffDashboard = () => {
    return <div className="space-y-6"><h2>Staff Console Logged In</h2></div>;
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex overflow-x-hidden">
      <Toaster position="top-right" />

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px]">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 min-w-0">
            {renderMainContent()}
          </main>
          <MobileSimulator />
        </div>
      </div>
    </div>
  );
}