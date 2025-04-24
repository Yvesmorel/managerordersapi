const Redis = require("ioredis");
const { RateLimiterRedis } = require("rate-limiter-flexible");

const maxWrongAttemptsByIPperMinute = 5;
const maxWrongAttemptsByIPperDay = 100;

async function brutForceProtection(req, res) {
  const ipAddr = req.connection.remoteAddress;


  res.status(400).json(ipAddr);
}

module.exports = {
  brutForceProtection,
};
