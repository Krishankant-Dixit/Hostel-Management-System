// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();

const { getDashboardSummary } = require('../controllers/dashboardController');
const { checkAuth } = require('../middleware/authMiddleware'); // Middleware import kiya

// GET Request handler jahan middleware route ki hifazat kar raha hai
router.get('/summary', checkAuth, getDashboardSummary);

module.exports = router;