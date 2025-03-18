const Orders = require("../models/Orders");

const createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
    };

    await Orders.create(orderData);
    res.status(200).json({ order: orderData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({ message: "order not found" });
    }

    const updatedOrders = await Orders.findByIdAndUpdate(order, req.body, {
      new: true,
    });

    res.status(200).json(updatedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({ message: "order not found" });
    }
    await order.deleteOne({ _id: order });

    res.status(200).json("Order deleted" + req.params.id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const order = await Orders.find({ user: req.params.id }).exec();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const order = await Orders.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  editOrder,
  deleteOrder,
  getOrder,
  getUserOrders,
  getOrders
};
