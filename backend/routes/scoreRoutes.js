// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { addScore, getScores } from "../controllers/scoreController.js";

// const router = express.Router();

// router.post("/", protect, addScore);
// router.get("/", protect, getScores);

// export default router;

// routes/scoreRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addScore, getScores } from "../controllers/scoreController.js";
import { checkSubscription } from "../controllers/subscriptionController.js";

const router = express.Router();

/**
 * ✅ POST /api/score
 * Only ACTIVE subscribers can add score
 */
router.post("/", protect, checkSubscription, addScore);

/**
 * ✅ GET /api/score
 * Get logged-in user's scores
 */
router.get("/", protect, getScores);

export default router;