import Score from "../models/Score.js";

// Add score
export const addScore = async (req, res) => {
  const { value } = req.body;
  const userId = req.user._id;

  let record = await Score.findOne({ userId });

  if (!record) {
    record = new Score({ userId, scores: [] });
  }

  record.scores.push({
    value,
    date: new Date()
  });

  // Keep only last 5
  if (record.scores.length > 5) {
    record.scores.shift();
  }

  await record.save();

  res.json(record);
};

// Get scores
export const getScores = async (req, res) => {
  const record = await Score.findOne({ userId: req.user._id });

  res.json(record || { scores: [] });
};