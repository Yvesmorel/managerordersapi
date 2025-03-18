const Payment = require("../models/Payment");

const createPayement = async (req, res) => {
  try {
    const payementData = {
      user: req.params.userId,
      order: req.params.orderId,
      ...req.body,
    };

    await Payment.create(payementData);

    res.status(200).json({ payment: payementData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserPayements = async (req, res) => {
  try {
    const payment = await Payment.find({ user: req.params.id }).exec();
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderPayement = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      order: req.params.id,
    }).exec();
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPayement,
  getUserPayements,
  getOrderPayement,
};
