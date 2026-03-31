import express from "express";
import Winner from "../models/Winner.js";
import Draw from "../models/Draw.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ CHECK DRAW RESULT
router.post("/check", protect, async (req, res) => {
  try {
    const { drawId } = req.body;
    const userId = req.user._id;

    if (!drawId) {
      return res.status(400).json({ error: "drawId is required" });
    }

    // 1️⃣ Find draw
    const draw = await Draw.findById(drawId);
    if (!draw) {
      return res.status(404).json({ error: "Draw not found" });
    }

    // 2️⃣ Check winner
    const winner = await Winner.findOne({
      drawId,
      userId
    });

    if (!winner) {
      return res.json({
        drawId: draw._id,
        numbers: draw.numbers,
        message: "You did not win this draw"
      });
    }

    // 3️⃣ Return correct stored prize
    res.json({
      drawId: draw._id,
      numbers: draw.numbers,
      matchCount: winner.matchCount,
      prize: winner.prize, // ✅ correct
      status: winner.status,
      paymentStatus: winner.paymentStatus,
      proof: winner.proof || null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;