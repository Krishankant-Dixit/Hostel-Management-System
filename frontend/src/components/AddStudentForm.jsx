import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebaseConfig'; // Tumhara pichla banaya hua firebase config file

const AddStudentForm = () => {
  // 1. Initial State for Form Data
  const [formData, setFormData] = useState({
    rollNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    guardianName: '',
    guardianPhone: '',
    roomType: 'Double',
    isACNeeded: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 2. Handle Inputs Change dynamically
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 3. Submit Handler to talk to Express Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 🚨 CRITICAL: Firebase se current logged-in user (Warden/Admin) ka Token nikalein
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setMessage({ type: 'error', text: 'Authorization failed. Please login first.' });
        setLoading(false);
        return;
      }
      const token = await currentUser.getIdToken();

      // Demo purpose ke liye student ka ek random firebaseUid generate kar rahe hain backend connectivity ke liye
      // Real flow me student jab khud login karega tab generate hota hai, par portal entries me rollNumber/email hi kafi hai
      const payload = {
        ...formData,
        firebaseUid: `STU_${Date.now()}_${formData.rollNumber}` 
      };

      // 🚀 API POST request directly to your Express Backend
      const response = await axios.post(
        'http://localhost:5000/api/students/register', 
        payload,
        {
          headers: { 
            Authorization: `Bearer ${token}` // Passing secure token
          }
        }
      );

      if (response.data.success) {
        setMessage({ 
          type: 'success', 
          text: `Success! ${response.data.message}` 
        });
        // Form reset karein success ke baad
        setFormData({
          rollNumber: '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          guardianName: '',
          guardianPhone: '',
          roomType: 'Double',
          isACNeeded: false,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMsg = error.response?.data?.message || 'Something went wrong with the server.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Student Admission & Auto-Room Allocation</h2>
      
      {/* Status Messages */}
      {message.text && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          borderRadius: '4px', 
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Details Row */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label>First Name *</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Last Name *</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label>Roll Number *</label>
            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Student Phone Number *</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required style={inputStyle} />
        </div>

        {/* Guardian Details Row */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          <div style={{ flex: 1 }}>
            <label>Guardian Name *</label>
            <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Guardian Phone *</label>
            <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        {/* Room Preference Section */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginBottom: '20px' }}>
          <h3>Room Allocation Preferences</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ marginRight: '10px' }}>Sharing Type:</label>
            <select name="roomType" value={formData.roomType} onChange={handleChange} style={inputStyle}>
              <option value="Single">Single Sharing</option>
              <option value="Double">Double Sharing</option>
              <option value="Triple">Triple Sharing</option>
              <option value="Four-Sharing">Four Sharing</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              id="isACNeeded" 
              name="isACNeeded" 
              checked={formData.isACNeeded} 
              onChange={handleChange} 
              style={{ width: '18px', height: '18px' }} 
            />
            <label htmlFor="isACNeeded" style={{ cursor: 'pointer', fontWeight: 'bold' }}>Opt for AC Room</label>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Allocating Room & Saving...' : 'Register Student & Auto-Allocate Room'}
        </button>
      </form>
    </div>
  );
};

// Simple reusable inline CSS for inputs
const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

export default AddStudentForm;