import express from "express";
import crypto from "crypto";
import { protect } from "../middleware/authMiddleware.js";
import razorpay from "../utils/razorpay.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/emailService.js";

const router = express.Router();


// 🔹 CREATE ORDER (monthly / yearly)
router.post("/create-order", protect, async (req, res) => {
  try {
    const { plan } = req.body; // "monthly" or "yearly"

    let amount;

    if (plan === "yearly") {
      amount = 99900; // ₹999
    } else {
      amount = 9900; // ₹99 default monthly
    }

    const options = {
      amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({ order, plan });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// VERIFY PAYMENT + ACTIVATE SUBSCRIPTION
router.post("/verify", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan   
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    const user = await User.findById(req.user._id);

    let renewalDate;

    if (plan === "yearly") {
      renewalDate = new Date(Date.now() + 365*24*60*60*1000);
    } else {
      renewalDate = new Date(Date.now() + 30*24*60*60*1000);
    }

    user.subscription = {
      status: "active",
      plan,
      renewalDate
    };

    await user.save();

    await sendEmail(
  user.email,
  "Subscription Activated 🎉",
  "Your subscription is now active!"
);

    res.json({
      message: "Payment verified & subscription activated",
      plan
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;