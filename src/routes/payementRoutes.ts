const {
  createPayement,
  getUserPayements,
  getOrderPayement,
} = require("../controllers/payementController");

const verifyToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {
  
  app.post(
    "/users/:userId/orders/:orderId/payments",
    verifyToken,
    createPayement
  );

  app.get("/users/:id/payments", verifyToken, getUserPayements);
  app.get("/orders/:id/payments", verifyToken, getOrderPayement);
};
