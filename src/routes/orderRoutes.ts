const {
  createOrder,
  getOrder,
  getUserOrders,
  getOrders,
  editOrder,
  deleteOrder,
} = require("../controllers/ordersController");

const verifyFirebaseToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {

  app.post("/orders", verifyFirebaseToken, createOrder);
  app.get("/orders/:id", verifyFirebaseToken, getOrder);
  app.get("/users/:id/orders", verifyFirebaseToken, getUserOrders);
  app.get("/orders", verifyFirebaseToken, getOrders);
  app.put("/orders/:id", verifyFirebaseToken, editOrder);
  app.delete("/orders/:id", verifyFirebaseToken, editOrder);
 
};
