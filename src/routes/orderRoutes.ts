const {
  createOrder,
  getOrder,
  getUserOrders,
  getOrders,
  editOrder,
  deleteOrder,
} = require("../controllers/ordersController");

const verifyToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {

  app.post("/orders", verifyToken, createOrder);
  app.get("/orders/:id", verifyToken, getOrder);
  app.get("/users/:id/orders", verifyToken, getUserOrders);
  app.get("/orders", verifyToken, getOrders);
  app.put("/orders/:id", verifyToken, editOrder);
  app.delete("/orders/:id", verifyToken, editOrder);
 
};
