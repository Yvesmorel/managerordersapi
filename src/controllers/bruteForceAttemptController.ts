const BruteForceProtection = require("../models/BruteForce");
const dayjs = require("dayjs");

const createAtempt = async (req, res) => {
  try {
    const attempData = {
      ipAddress: req.clientIp,
    };

    const attempt = await findAttempt([
      {
        ipAddress: attempData.ipAddress,
      },
    ]);

    if (attempt !== null) {
      if (attempt.attempts > 5) {
        const dayJsDate = dayjs();
        const dayJsDatePlusOneHour = dayJsDate.add(1, "hour");

        if (!attempt.isBlocked)
          await updateAttemp(attempData.ipAddress, {
            blockedUntil: new Date(dayJsDatePlusOneHour),
            isBlocked: true,
          });
    
      } else
        await updateAttemp(attempData.ipAddress, {
          $inc: { attempts: 1 },
        });
    } else await BruteForceProtection.create(attempData);

    return attempData;
  } catch (error) {
    throw new Error("create filed");
  }
};

const findAttempt = async (findOptions) => {
  try {
    const attempt = await BruteForceProtection.findOne(...findOptions).exec();

    return attempt;
  } catch (error) {
    throw new Error("Auth/Error");
  }
};

const updateAttemp = async (ipAddress, updatedData) => {
  try {
    const filter = { ipAddress };
    await BruteForceProtection.findOneAndUpdate(
      filter,
      { ...updatedData },
      {
        new: true,
      }
    );
  } catch (error) {
    throw new Error("Increment filed");
  }
};

module.exports = {
  createAtempt,
  findAttempt,
};
