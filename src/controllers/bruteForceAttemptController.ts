const BruteForceProtection = require("../controllers/bruteForceAttemptController");

const createAtempt = async (req, res) => {
  const attempsData = {
    ...req.body,
  };

  await BruteForceProtection.create(attempsData);
  res.status(200).json(attempsData);
};

module.exports = {
  createAtempt,
};
