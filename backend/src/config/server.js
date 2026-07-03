// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Firebase Admin Setup (Download serviceAccountKey.json from Firebase Console)
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 2. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✓ MongoDB Connected Successfully"))
  .catch((err) => console.error("✗ MongoDB Connection Error:", err));

// 3. Auth Middleware (To verify requests from React)
const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided, Authorization denied." });
  }

  try {
    // Firebase verifies if the user is genuinely logged in
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Adds user details (uid, email) to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

// 4. Sample Protected Route (Only logged-in users can access)
app.get('/api/dashboard/summary', checkAuth, async (req, res) => {
  // backend fetches data from MongoDB here
  res.json({ 
    message: `Welcome to the secure dashboard, user: ${req.user.email}`,
    totalStudents: 120,
    availableRooms: 15
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));