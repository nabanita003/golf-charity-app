import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const exists = await User.findOne({ email: "admin@example.com" });
  if (exists) return console.log("Admin already exists");

  const hashed = bcrypt.hashSync("admin123", 10);

  await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: hashed,
    role: "admin",
    subscription: { status: "inactive" },
    charity: null
  });

  console.log("Admin created successfully");
  process.exit();
};

createAdmin();