// controllers/subscriptionController.js
import User from "../models/User.js";

//  Activate subscription
export const subscribe = async (req, res) => {
  try {
    const { plan } = req.body; // monthly or yearly
    const user = await User.findById(req.user._id);

    const now = new Date();
    let renewal;

    if (plan === "yearly") {
      renewal = new Date(now.setFullYear(now.getFullYear() + 1));
    } else {
      renewal = new Date(now.setMonth(now.getMonth() + 1));
    }

    user.subscription = {
      status: "active",
      plan,
      startDate: new Date(),
      renewalDate: renewal
    };

    await user.save();

    res.json({ message: "Subscription activated", subscription: user.subscription });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel subscription
export const cancelSubscription = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.subscription.status = "cancelled";
  user.subscription.cancelledAt = new Date();

  await user.save();

  res.json({ message: "Subscription cancelled" });
};

// Check subscription validity (REAL-TIME CHECK)
export const checkSubscription = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user.subscription) {
    return res.status(403).json({ msg: "No subscription found" });
  }

  // Expiry check
  if (user.subscription.renewalDate < new Date()) {
    user.subscription.status = "expired";
    await user.save();

    return res.status(403).json({ msg: "Subscription expired" });
  }

  if (user.subscription.status !== "active") {
    return res.status(403).json({ msg: "Subscription inactive" });
  }

  next();
};

export const renewSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const now = new Date();

    if (user.subscription.plan === "yearly") {
      user.subscription.renewalDate = new Date(
        now.setFullYear(now.getFullYear() + 1)
      );
    } else {
      user.subscription.renewalDate = new Date(
        now.setMonth(now.getMonth() + 1)
      );
    }

    user.subscription.status = "active";

    await user.save();

    res.json({ message: "Subscription renewed", subscription: user.subscription });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};