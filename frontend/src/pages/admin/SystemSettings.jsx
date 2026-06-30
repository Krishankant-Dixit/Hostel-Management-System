import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, KeyRound, Bell, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SystemSettings() {
  const [siteName, setSiteName] = useState('Central Hostel System');
  const [enableRazorpay, setEnableRazorpay] = useState(true);
  const [enableFirebase, setEnableFirebase] = useState(true);
  const [enableTwilio, setEnableTwilio] = useState(false);
  const [otpVerify, setOtpVerify] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('System configurations updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-gray-900">System Settings</h2>
        <p className="text-xs text-gray-500 font-semibold mt-0.5">Configure API integrations, payments, notifications and SMS OTPs.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-2 flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-[#4F46E5]" /> General Config
          </h3>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-gray-600">Portal Display Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-800">Two-Factor OTP Security</p>
              <p className="text-[10px] text-gray-400">Require mobile OTP during student registration and login.</p>
            </div>
            <input
              type="checkbox"
              checked={otpVerify}
              onChange={(e) => setOtpVerify(e.target.checked)}
              className="w-5 h-5 accent-[#4F46E5]"
            />
          </div>
        </div>

        {/* Integration Modules */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3 mb-2 flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-green-600" /> API Gateways
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-800">Razorpay Payment Integration</p>
              <p className="text-[10px] text-gray-400">Process student mess and hostel fee payments online.</p>
            </div>
            <input
              type="checkbox"
              checked={enableRazorpay}
              onChange={(e) => setEnableRazorpay(e.target.checked)}
              className="w-5 h-5 accent-[#4F46E5]"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-800">Firebase Cloud Messaging</p>
              <p className="text-[10px] text-gray-400">Push immediate real-time announcements & alerts to devices.</p>
            </div>
            <input
              type="checkbox"
              checked={enableFirebase}
              onChange={(e) => setEnableFirebase(e.target.checked)}
              className="w-5 h-5 accent-[#4F46E5]"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-800">Twilio SMS OTP Gateway</p>
              <p className="text-[10px] text-gray-400">Deliver verification codes to parental phone contacts via SMS.</p>
            </div>
            <input
              type="checkbox"
              checked={enableTwilio}
              onChange={(e) => setEnableTwilio(e.target.checked)}
              className="w-5 h-5 accent-[#4F46E5]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 py-2.5 px-6 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
