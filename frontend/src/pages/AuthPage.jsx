import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, BadgeAlert, KeyRound, LogIn, ShieldCheck, Users, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { login } from '../store/slices/hmsSlice';

const demoAccounts = [
  { label: 'Admin', userId: 'usr-admin', password: 'admin123', accent: 'from-[#4F46E5] to-[#4338CA]' },
  { label: 'Warden', userId: 'usr-warden', password: 'warden123', accent: 'from-[#0EA5E9] to-[#0284C7]' },
  { label: 'Staff', userId: 'usr-staff', password: 'staff123', accent: 'from-[#16A34A] to-[#15803D]' },
  { label: 'Student', userId: 'usr-john', password: 'john123', accent: 'from-[#F97316] to-[#EA580C]' }
];

export default function AuthPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.hms.users);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchedUser = users.find((user) => {
      const matchesIdentifier = user.id.toLowerCase() === userId.trim().toLowerCase() || user.email.toLowerCase() === userId.trim().toLowerCase();
      return matchesIdentifier && user.password === password;
    });

    if (!matchedUser) {
      toast.error('Invalid ID or password');
      return;
    }

    dispatch(login({ userId: matchedUser.id, password }));
    toast.success(`Welcome back, ${matchedUser.fullName.split(' ')[0]}!`);
  };

  const handleDemoFill = (account) => {
    setUserId(account.userId);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_#EEF2FF_0%,_#F5F7FB_42%,_#EEF2FF_100%)] flex items-stretch">
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#4F46E5]/15 blur-3xl" />
        <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-[#F97316]/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#14B8A6]/12 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 xl:p-14">
          <div className="w-full max-w-md rounded-[28px] border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.12)] p-5 sm:p-7 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center shadow-lg shadow-[#4F46E5]/30">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-[0.25em] text-[#4F46E5]">Hostel Management</p>
                <h1 className="text-2xl font-black text-gray-900 leading-tight">Sign in to your dashboard</h1>
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Use your ID and password to access the system. Demo credentials are shown below for each role.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-500">User ID</label>
                <div className="relative">
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 pr-12 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10"
                    autoComplete="username"
                  />
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-500">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white px-4 pr-12 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 text-[10px] font-black uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#4F46E5] text-sm font-black text-white shadow-lg shadow-[#4F46E5]/25 transition-all hover:bg-[#4338CA]"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
                <ShieldCheck className="h-4 w-4 text-[#4F46E5]" />
                Demo Accounts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.userId}
                    type="button"
                    onClick={() => handleDemoFill(account)}
                    className={`rounded-2xl bg-gradient-to-r ${account.accent} px-3 py-3 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5`}
                  >
                    <p className="text-xs font-black uppercase tracking-wider opacity-90">{account.label}</p>
                    <p className="mt-1 text-[11px] font-semibold opacity-95">ID: {account.userId}</p>
                    <p className="text-[11px] font-semibold opacity-95">Pass: {account.password}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-[#EEF2FF] p-4 text-xs text-gray-600">
              <div className="flex items-center gap-2 font-bold text-gray-800">
                <UserCheck className="h-4 w-4 text-[#4F46E5]" />
                Responsive login experience
              </div>
              <p>Works on mobile and desktop. The main dashboard opens only after successful ID/password authentication.</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-[44%] xl:w-[42%] items-center justify-center p-10">
          <div className="max-w-lg rounded-[32px] border border-white/60 bg-gray-900 text-white shadow-[0_30px_100px_rgba(15,23,42,0.28)] p-8 xl:p-10">
            <p className="text-[10px] uppercase font-black tracking-[0.35em] text-[#8FA1FF] mb-4">Secure Access</p>
            <h2 className="text-3xl font-black leading-tight mb-4">One login page for every role</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-8">
              Administrators, wardens, staff, and students can sign in with their role-based ID and password. After login, the dashboard and simulator adapt automatically.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, label: 'Role-based control' },
                { icon: KeyRound, label: 'ID + password auth' },
                { icon: BadgeAlert, label: 'Demo credentials included' },
                { icon: UserCheck, label: 'Mobile-friendly layout' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Icon className="h-5 w-5 text-[#8FA1FF]" />
                    <p className="mt-3 text-sm font-bold text-white">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}