// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebaseConfig';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchDashboardData(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  // Fetch real data from Node.js backend
  const fetchDashboardData = async (currentUser) => {
    try {
      // 1. Get the secure token from Firebase
      const token = await currentUser.getIdToken();

      // 2. Pass this token in the headers to your backend
      const response = await axios.get('http://localhost:5000/api/dashboard/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats(response.data);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Hostel Management System (Startup MVP)</h2>
        <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Sign in with Gmail
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hostel Dashboard</h1>
      <p>Logged in as: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      {/* Real Data Rendered Here instead of hardcoded data */}
      {stats ? (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div style={{ border: '1px solid #ccc', padding: '20px' }}>
            <h3>Total Students</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalStudents}</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px' }}>
            <h3>Available Rooms</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.availableRooms}</p>
          </div>
        </div>
      ) : (
        <p>Loading real-time stats from database...</p>
      )}
    </div>
  );
};

export default Dashboard;