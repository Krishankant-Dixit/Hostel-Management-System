import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Bell, MessageSquare, Calendar, ChevronDown, AlignLeft, LogOut, CheckSquare, X } from 'lucide-react';
import { setSearchQuery, logout, markNotificationsRead } from '../store/slices/hmsSlice';

export default function Navbar({ toggleSidebar, sidebarOpen = false }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.hms.currentUser);
  const searchQuery = useSelector((state) => state.hms.searchQuery);
  const notifications = useSelector((state) => state.hms.notifications);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const unreadNotifications = notifications.filter(
    (n) => n.userId === currentUser?.id && !n.isRead
  );

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleMarkRead = () => {
    dispatch(markNotificationsRead());
    setShowNotifications(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-[70px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      {/* Left side: Hamburger & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <AlignLeft className="w-5 h-5" />}
        </button>

        {/* Search Bar */}
        <div className="relative w-full min-w-0">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by student name, room no, hostel..."
            className="w-full h-10 pl-4 pr-10 rounded-full bg-[#F5F7FB] border-none text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:bg-white transition-all min-w-0"
          />
          <Search className="w-4.5 h-4.5 text-gray-400 absolute right-3.5 top-2.5" />
        </div>
      </div>

      {/* Right side: Action icons & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Calendar Icon */}
        <button className="hidden md:flex text-gray-500 hover:text-[#4F46E5] hover:bg-gray-50 p-2 rounded-xl transition-all">
          <Calendar className="w-5 h-5" />
        </button>

        {/* Message Icon */}
        <button className="hidden md:flex text-gray-500 hover:text-[#4F46E5] hover:bg-gray-50 p-2 rounded-xl transition-all">
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-500 hover:text-[#4F46E5] hover:bg-gray-50 p-2 rounded-xl transition-all"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#EE4646] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-premium border border-[#E5E7EB] py-2 z-30">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#E5E7EB]">
                <span className="font-bold text-gray-900 text-sm">Notifications</span>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={handleMarkRead}
                    className="text-xs text-[#4F46E5] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <CheckSquare className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto">
                {unreadNotifications.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 text-xs font-medium">No new notifications</div>
                ) : (
                  unreadNotifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                      <p className="text-xs font-bold text-gray-900 mb-0.5">{n.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info & Dropdown */}
        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-xl transition-all max-w-[160px] sm:max-w-none"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">{currentUser.fullName}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {currentUser.role === 'admin' ? 'Super Admin' : currentUser.role}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-premium border border-[#E5E7EB] py-1.5 z-30">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-[#EE4646] font-semibold hover:bg-red-50 transition-all text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
