// utils/cron.js
import cron from "node-cron";
import User from "../models/User.js";

cron.schedule("0 0 * * *", async () => {
  const users = await User.find({
    "subscription.status": "active",
    "subscription.renewalDate": { $lt: new Date() }
  });

  for (let user of users) {
    user.subscription.status = "expired";
    await user.save();
  }

  console.log("Expired subscriptions updated");
});