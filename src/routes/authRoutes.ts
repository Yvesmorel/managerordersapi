const firebaseAuthController = require("../controllers/firebase-auth-controller");
const verifyToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {
  app.post("/api/register", firebaseAuthController.registerUser);
  app.post("/api/login", firebaseAuthController.loginUser);
  app.post("/api/logout", verifyToken, firebaseAuthController.logoutUser);
  app.post("/api/reset-password", firebaseAuthController.resetPassword);
};
