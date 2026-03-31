// models/Charity.js
import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,

  totalDonations: { type: Number, default: 0 },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Charity", charitySchema);