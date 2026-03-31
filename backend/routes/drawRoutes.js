import express from "express";
import { runDraw } from "../controllers/drawController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admin should run (we'll improve later)
router.post("/run", protect, adminOnly, runDraw);

export default router;