import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Draw from "../models/Draw.js";
import Winner from "../models/Winner.js";
import { sendEmail } from "../utils/emailService.js";
import dotenv from 'dotenv';
const router = express.Router();

// ✅ GET ALL USERS
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ GET ALL WINNERS
router.get("/winners", protect, adminOnly, async (req, res) => {
  const winners = await Winner.find().populate("userId");
  res.json(winners);
});

// ✅ PUBLISH DRAW
router.put("/publish/:id", protect, adminOnly, async (req, res) => {
  const draw = await Draw.findById(req.params.id);
  draw.isPublished = true;
  await draw.save();
  res.json(draw);
});
router.put("/winner/approve/:id", protect, adminOnly, async (req, res) => {
  try {
    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({ error: "Winner not found" });
    }

    winner.status = "approved";
    winner.paymentStatus = "pending";

    await winner.save();

    res.json({
      message: "Winner approved",
      winner
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/winner/reject/:id", protect, adminOnly, async (req, res) => {
  try {
    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({ error: "Winner not found" });
    }

    winner.status = "rejected";
    winner.paymentStatus = "failed";

    await winner.save();

    res.json({
      message: "Winner rejected",
      winner
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// router.put("/winner/pay/:id", protect, adminOnly, async (req, res) => {
//   try {
//     const winner = await Winner.findById(req.params.id);

//     if (!winner) {
//       return res.status(404).json({ error: "Winner not found" });
//     }

//     if (winner.status !== "approved") {
//       return res.status(400).json({ error: "Winner not approved yet" });
//     }

//     winner.paymentStatus = "paid";

//     await winner.save();

//     res.json({
//       message: "Payment completed",
//       winner
//     });

//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// ✅ ADMIN STATS
router.put("/winner/pay/:id", protect, adminOnly, async (req, res) => {
  try {
    const winner = await Winner.findById(req.params.id).populate("userId");

    if (!winner) {
      return res.status(404).json({ error: "Winner not found" });
    }

    if (winner.status !== "approved") {
      return res.status(400).json({ error: "Winner not approved yet" });
    }

    // ✅ Update payment status
    winner.paymentStatus = "paid";
    await winner.save();

    // 🔥 SEND EMAIL HERE
    if (winner.userId?.email) {
      await sendEmail(
        winner.userId.email,
        "Payment Completed 💰",
        `Congratulations! Your prize has been successfully paid. 🎉`
      );
    }

    res.json({
      message: "Payment completed",
      winner
    });

  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const activeUsers = await User.countDocuments({
      "subscription.status": "active"
    });

    const totalDraws = await Draw.countDocuments();

    const totalWinners = await Winner.countDocuments();

    const totalPoolAgg = await Draw.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPool" } } }
    ]);

    res.json({
      totalUsers,
      activeUsers,
      totalDraws,
      totalWinners,
      totalPool: totalPoolAgg[0]?.total || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;