import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  subscription: {
  status: {
    type: String,
    enum: ["inactive", "active", "expired", "cancelled"],
    default: "inactive"
  },
  plan: {
    type: String,
    enum: ["monthly", "yearly"]
  },
  startDate: Date,
  renewalDate: Date,
  cancelledAt: Date
},
charity: {
  charityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Charity"
  },
  percentage: {
    type: Number,
    default: 10,
    min: 10,
    max: 100
  }
},
country: {
  type: String,
  default: "India"
},
currency: {
  type: String,
  default: "INR"
},
}, { timestamps: true });

export default mongoose.model("User", userSchema);