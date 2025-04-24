const {
  createPayement,
  getUserPayements,
  getOrderPayement,
} = require("../controllers/payementController");

const verifyFirebaseToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {
  
  app.post(
    "/users/:userId/orders/:orderId/payments",
    verifyFirebaseToken,
    createPayement
  );

  app.get("/users/:id/payments", verifyFirebaseToken, getUserPayements);
  app.get("/orders/:id/payments", verifyFirebaseToken, getOrderPayement);
};
