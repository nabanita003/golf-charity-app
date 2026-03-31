import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  drawId: { type: mongoose.Schema.Types.ObjectId, ref: "Draw" },
  matchCount: Number,
  proof: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  }
});

export default mongoose.model("Winner", winnerSchema);