const { createUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

module.exports = (app) => {
  app.post("/", verifyToken, createUser);
};
