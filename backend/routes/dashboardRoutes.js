import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Score from "../models/Score.js";
import Winner from "../models/Winner.js";
import Draw from "../models/Draw.js";
const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const scores = await Score.findOne({ userId: req.user._id });

    const winnings = await Winner.find({ userId: req.user._id })
      .populate("drawId");

    // Total earnings
    let totalEarnings = 0;

    winnings.forEach(w => {
      if (w.paymentStatus === "paid") {
        totalEarnings += 100; // you can improve later
      }
    });

const totalDraws = await Draw.countDocuments();

res.json({
  user: req.user,
  scores: scores?.scores || [],
  winnings,
  totalEarnings,
  totalDraws
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;