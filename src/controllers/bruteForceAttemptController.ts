const BruteForceProtection = require("../models/BruteForce");

const createAtempt = async (req, res) => {
  try {
    const attempsData = {
      ...req.body,
    };

    await BruteForceProtection.create(attempsData);
    res.status(200).json(attempsData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAtempt,
};
