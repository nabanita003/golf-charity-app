import express from "express";
import User from "../models/User.js";
import Draw from "../models/Draw.js";
import Winner from "../models/Winner.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const activeUsers = await User.countDocuments({
      "subscription.status": "active"
    });

    const totalDraws = await Draw.countDocuments();

    const totalWinners = await Winner.countDocuments();

    // Total prize pool distributed
    const poolData = await Draw.aggregate([
      {
        $group: {
          _id: null,
          totalPool: { $sum: "$totalPool" }
        }
      }
    ]);

    const totalPool = poolData[0]?.totalPool || 0;

    res.json({
      totalUsers,
      activeUsers,
      totalDraws,
      totalWinners,
      totalPool
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;