import express from "express";
import { runDraw } from "../controllers/drawController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import Draw from "../models/Draw.js"

const router = express.Router();

// Only admin should run (we'll improve later)
router.post("/run", protect, adminOnly, runDraw);

// drawRoutes.js
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const draws = await Draw.find().sort({ createdAt: -1 });
    res.json(draws);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot fetch draws" });
  }
});

export default router;