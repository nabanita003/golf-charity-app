import dotenv from "dotenv";
dotenv.config(); // load env variables immediately

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import path from "path";
// Import routes after dotenv.config()
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import winnerRoutes from "./routes/winnerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import drawCheckRoutes from "./routes/drawCheckRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import adminAnalytics from "./routes/adminAnalytics.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import razorpay from "./utils/razorpay.js";
import "./utils/cron.js";

// Import custom middleware
import { securityMiddleware } from "./middleware/security.js";

const app = express();

// Middleware
securityMiddleware(app);
app.use(cors({
  origin: "*", 
  credentials: true,               // allow cookies/auth headers
}));
app.use(express.json());
app.use(compression());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/winner", winnerRoutes);
app.use("/api/draw-check", drawCheckRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/admin/stats", adminAnalytics);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/payment", paymentRoutes);    
app.use("/api/admin/winners", winnerRoutes);   // winners
// app.use("/api/charities", charityRoutes); // charity
app.use("/api/analytics", adminAnalytics);
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
// Test route
app.get("/", (req, res) => res.send("API Running..."));

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));