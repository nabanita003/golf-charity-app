import express from "express";
import Draw from "../models/Draw.js";

const router = express.Router();

// Get all draws (latest first)
router.get("/", async (req, res) => {
  try {
    const draws = await Draw.find()
      .sort({ createdAt: -1 });

    res.json(draws);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single draw
router.get("/:id", async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);

    if (!draw) {
      return res.status(404).json({ msg: "Draw not found" });
    }

    res.json(draw);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;