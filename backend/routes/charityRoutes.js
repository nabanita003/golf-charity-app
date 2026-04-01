// routes/charityRoutes.js
import express from "express";
import Charity from "../models/Charity.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// ------------------ FILE UPLOAD CONFIG ------------------ //
const UPLOAD_DIR = "public/uploads";

// Ensure uploads folder exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public/uploads")); // full absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ------------------ USER ROUTES ------------------ //

// GET ALL CHARITIES (search + filter)
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const charities = await Charity.find(query);

    const host = `${req.protocol}://${req.get("host")}`;
    const charitiesWithFullImages = charities.map(c => ({
      ...c._doc,
      image: c.image ? `${host}/uploads/${c.image}` : null
    }));

    res.json(charitiesWithFullImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SELECT CHARITY (USER)
router.post("/select", protect, async (req, res) => {
  try {
    const { charityId, percentage } = req.body;

    if (percentage < 10) {
      return res.status(400).json({ msg: "Minimum 10% required" });
    }

    req.user.charity = { charityId, percentage };
    await req.user.save();

    res.json({ message: "Charity selected successfully", charity: req.user.charity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ ADMIN ROUTES ------------------ //

// ADD CHARITY (with image)
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const charityData = {
      ...req.body,
      image: req.file ? req.file.filename : null,
      totalDonations: 0,
      isActive: true,
    };

    const charity = await Charity.create(charityData);
    res.json(charity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE CHARITY (with optional new image)
router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const charityData = { ...req.body };
    if (req.file) charityData.image = req.file.filename;

    const charity = await Charity.findByIdAndUpdate(req.params.id, charityData, { new: true });
    res.json(charity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SOFT DELETE CHARITY
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id);
    if (!charity) return res.status(404).json({ msg: "Charity not found" });

    charity.isActive = false;
    await charity.save();

    res.json({ message: "Charity removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ USER DONATE ROUTE ------------------ //
router.post("/donate", protect, async (req, res) => {
  try {
    const { charityId, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: "Enter a valid donation amount" });
    }

    const charity = await Charity.findById(charityId);
    if (!charity || !charity.isActive) {
      return res.status(404).json({ msg: "Charity not found" });
    }

    charity.totalDonations = (charity.totalDonations || 0) + amount;
    await charity.save();

    res.json({
      message: `₹${amount} donated successfully to ${charity.name}`,
      totalDonations: charity.totalDonations,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;