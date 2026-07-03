const express = require('express');
const router = express.Router();
const { registerStudentAndAllocateRoom } = require('../controllers/studentController');
// Pata hai na humne server.js me checkAuth middleware banaya tha? Use yahan import kar lena
const { checkAuth } = require('../middleware/authMiddleware'); 

// Protected Route: Only logged-in wardens can add students
router.post('/register', checkAuth, registerStudentAndAllocateRoom);

module.exports = router;