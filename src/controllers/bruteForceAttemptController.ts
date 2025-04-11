const BruteForceProtection = require("../models/BruteForce");
const dayjs = require("dayjs");

const createAtempt = async (req, res) => {

  try {

    const attempData = {
      ipAddress: req.clientIp,
    };

    const attempt = await BruteForceProtection.findOne({
      ipAddress: attempData.ipAddress,
    }).exec();

    if (attempt !== null) {

      if (attempt.attempts > 5) {

        const dayJsDate = dayjs();
        const dayJsDatePlusOneHour = dayJsDate.add(1, "hour");

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
};
