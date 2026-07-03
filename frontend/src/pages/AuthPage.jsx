import React from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebaseConfig';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome back ${result.user.displayName}!`);
    } catch (error) {
      console.error(error);
      toast.error("Firebase Gmail Sign-In Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl border shadow-xl max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl font-black text-gray-900">Hostel Management System</h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Production Startup MVP</p>
        
        <div className="pt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-[#4F46E5] text-white font-black rounded-xl shadow-md hover:bg-[#4338CA] transition-all flex items-center justify-center gap-2 text-sm"
          >
            🔑 Sign in with University Gmail
          </button>
        </div>
      </div>
    </div>
  );
}