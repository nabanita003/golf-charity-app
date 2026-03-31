// import express from "express";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import Winner from "../models/Winner.js"
// const router = express.Router();

// // Upload proof
// router.post("/proof", protect, async (req, res) => {
//   const { proof, drawId } = req.body;

//   const winner = await Winner.findOne({
//     userId: req.user._id,
//     drawId
//   });

//   // ✅ FIX: handle null
//   if (!winner) {
//     return res.status(404).json({ msg: "Winner not found" });
//   }

//   winner.proof = proof;
//   await winner.save();

//   res.json(winner);
// });


// export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import Winner from "../models/Winner.js";

const router = express.Router();

// ✅ Upload proof (FILE)
router.post("/proof", protect, upload.single("proof"), async (req, res) => {
  try {
    const { drawId } = req.body;

    const winner = await Winner.findOne({
      userId: req.user._id,
      drawId
    });

    if (!winner) {
      return res.status(404).json({ msg: "Winner not found" });
    }

    // 🔥 Cloudinary URL
    winner.proof = req.file.path;

    await winner.save();

    res.json({
      message: "Proof uploaded",
      proof: winner.proof
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;