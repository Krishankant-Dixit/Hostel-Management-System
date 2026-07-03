import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

const start = async () => {
  try {
    await connectDB();

    // ==========================================
// 🚨 REAL-TIME DASHBOARD SUMMARY ROUTE (TypeScript)
// ==========================================
app.get('/api/dashboard/summary', (req: any, res: any) => {
  try {
    res.status(200).json({
      success: true,
      message: "✓ MongoDB/Node Server Connection Live via TypeScript!",
      stats: {
        totalRooms: 50,
        occupiedRooms: 38,
        availableBeds: 24,
        pendingComplaints: 3
      }
    });
  } catch (error: any) {
    console.error("Dashboard route error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
    
    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
