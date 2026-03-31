import Draw from "../models/Draw.js";
import Score from "../models/Score.js";
import Winner from "../models/Winner.js";
import User from "../models/User.js";
import Charity from "../models/Charity.js";
import { sendEmail } from "../utils/emailService.js";

// 🔥 GLOBAL JACKPOT (persist later if needed)
let previousJackpot = 0;

// Generate 5 unique numbers (1–50)
const generateNumbers = () => {
  const nums = new Set();
  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 50) + 1);
  }
  return Array.from(nums);
};

// Count matches
const countMatches = (userScores, drawNumbers) => {
  if (!Array.isArray(userScores)) return 0;
  const values = userScores.map(s => s.value);
  return values.filter(num => drawNumbers.includes(num)).length;
};

// Prize distribution
const calculatePrize = (totalPool) => ({
  match5: totalPool * 0.4,
  match4: totalPool * 0.35,
  match3: totalPool * 0.25,
});

// 🔥 RUN DRAW
export const runDraw = async (req, res) => {
  try {
    // 1️⃣ Generate numbers
    const drawNumbers = generateNumbers();

    // 2️⃣ Get active users
    const users = await User.find({
      "subscription.status": "active"
    });

    const subscriptionFee = 100;
    const totalPool = users.length * subscriptionFee;

    // 3️⃣ CHARITY CALCULATION
    let charityMap = {};

    users.forEach(user => {
      if (user.charity?.charityId) {
        const amount = (subscriptionFee * user.charity.percentage) / 100;
        const key = user.charity.charityId.toString();

        if (!charityMap[key]) charityMap[key] = 0;
        charityMap[key] += amount;
      }
    });

    // Update charity donations
    for (const charityId in charityMap) {
      await Charity.findByIdAndUpdate(charityId, {
        $inc: { totalDonations: charityMap[charityId] }
      });
    }

    const charityTotal = Object.values(charityMap).reduce((a, b) => a + b, 0);
    const finalPool = totalPool - charityTotal;

    // 4️⃣ PRIZE DISTRIBUTION
    const prizes = calculatePrize(finalPool);

    // 5️⃣ GET SCORES
    const allScores = await Score.find().populate("userId");

    let winners = [];

    allScores.forEach(record => {
      if (!record.userId) return;

      const matchCount = countMatches(record.scores, drawNumbers);

      if (matchCount >= 1) {
        winners.push({
          userId: record.userId._id,
          matchCount
        });
      }
    });

    // 6️⃣ GROUP WINNERS
    const match5 = winners.filter(w => w.matchCount === 5);
    const match4 = winners.filter(w => w.matchCount === 4);
    const match3 = winners.filter(w => w.matchCount === 3);

    // 🔥 JACKPOT LOGIC
    let jackpot = prizes.match5 + previousJackpot;

    if (match5.length === 0) {
      previousJackpot = jackpot; // carry forward
    } else {
      previousJackpot = 0;
    }

    // Split function
    const split = (pool, count) => count > 0 ? pool / count : 0;

    // 7️⃣ ASSIGN PRIZES
    const finalWinners = winners.map(w => {
      let prize = 0;

      if (w.matchCount === 5) {
        prize = split(jackpot, match5.length);
      } else if (w.matchCount === 4) {
        prize = split(prizes.match4, match4.length);
      } else if (w.matchCount === 3) {
        prize = split(prizes.match3, match3.length);
      }

      return { ...w, prize };
    });

    // 8️⃣ SAVE DRAW
    const draw = await Draw.create({
      numbers: drawNumbers,
      totalPool,
      charityTotal,
      finalPool,
      prizes: {
        match5: jackpot,
        match4: prizes.match4,
        match3: prizes.match3
      }
    });

    // 9️⃣ SAVE WINNERS
    if (finalWinners.length > 0) {
      await Winner.insertMany(
        finalWinners.map(w => ({
          userId: w.userId,
          drawId: draw._id,
          matchCount: w.matchCount,
          prize: w.prize,
          status: "pending",
          paymentStatus: "pending"
        }))
      );

      // 🔔 EMAIL NOTIFICATION
      for (const w of finalWinners) {
        const user = await User.findById(w.userId);

        await sendEmail(
          user.email,
          "🎉 You Won!",
          `You matched ${w.matchCount} numbers and won ₹${w.prize}`
        );
      }
    }

    res.json({
      message: "Draw completed",
      numbers: drawNumbers,
      totalPool,
      charityTotal,
      finalPool,
      jackpot,
      winners: finalWinners
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Draw failed" });
  }
};