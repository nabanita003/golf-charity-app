// routes/charityRoutes.js
import express from "express";
import Charity from "../models/Charity.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ GET ALL CHARITIES (with search + filter)
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let query = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const charities = await Charity.find(query);
    res.json(charities);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ SELECT CHARITY (USER)
router.post("/select", protect, async (req, res) => {
  try {
    const { charityId, percentage } = req.body;

    if (percentage < 10) {
      return res.status(400).json({ msg: "Minimum 10% required" });
    }

    req.user.charity = {
      charityId,
      percentage
    };

    await req.user.save();

    res.json({
      message: "Charity selected successfully",
      charity: req.user.charity
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADMIN: ADD CHARITY
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const charity = await Charity.create(req.body);
    res.json(charity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADMIN: UPDATE CHARITY
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const charity = await Charity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(charity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADMIN: DELETE (SOFT DELETE)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id);
    charity.isActive = false;
    await charity.save();

    res.json({ message: "Charity removed" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;