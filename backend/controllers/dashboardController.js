// controllers/dashboardController.js

/**
 * @desc    Get secure dashboard summary data
 * @route   GET /api/dashboard/summary
 * @access  Private (Authenticated Users Only)
 */
exports.getDashboardSummary = async (req, res) => {
  try {
    // req.user humein pichle middleware se mila hai
    const userEmail = req.user.email;
    const firebaseUid = req.user.uid;

    // Yahan tum MongoDB se real data nikaloge (Example placeholders niche hain)
    res.status(200).json({
      success: true,
      message: `Data securely fetched for: ${userEmail}`,
      user: {
        email: userEmail,
        uid: firebaseUid
      },
      stats: {
        totalRooms: 50,
        occupiedRooms: 38,
        availableBeds: 24,
        pendingComplaints: 3
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching dashboard.' });
  }
};