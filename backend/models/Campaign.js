import mongoose from "mongoose";
const campaignSchema = new mongoose.Schema({
  name: String,
  description: String,
  targetAmount: Number,
  collectedAmount: { type: Number, default: 0 },
  isActive: Boolean
});