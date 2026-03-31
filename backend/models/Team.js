import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  totalContribution: Number
});

export default mongoose.model("Team", teamSchema);