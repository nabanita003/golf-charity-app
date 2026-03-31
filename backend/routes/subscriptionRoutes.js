import express from "express";
import {
  subscribe,
  cancelSubscription,
  renewSubscription
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ✅ POST /api/subscription
 * Activate subscription (monthly / yearly)
 * Body: { plan: "monthly" | "yearly" }
 */
router.post("/", protect, subscribe);

/**
 * ✅ PUT /api/subscription/cancel
 * Cancel current subscription
 */
router.put("/cancel", protect, cancelSubscription);

/**
 * ✅ PUT /api/subscription/renew
 * Renew subscription based on existing plan
 */
router.put("/renew", protect, renewSubscription);

/**
 * ✅ GET /api/subscription/status
 * Get current subscription details
 */
router.get("/status", protect, (req, res) => {
  res.json({
    subscription: req.user.subscription || {
      status: "inactive"
    }
  });
});

export default router;