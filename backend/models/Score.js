import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  scores: [
    {
      value: Number,
      date: Date
    }
  ]
});

export default mongoose.model("Score", scoreSchema);