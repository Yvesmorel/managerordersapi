const {
  createUser,
  editUser,
  deleteUser,
  getUsers,
  getUser,
} = require("../controllers/userController");

const verifyToken = require("../middlewares/authMiddleware");

module.exports = (app) => {

  app.post("/users", verifyToken, createUser);
  app.get("/users", verifyToken, getUsers);

  app.put("/users/:id", verifyToken, editUser);
  app.get("/users/:id", verifyToken, getUser);

  app.delete("/users/:id", verifyToken, deleteUser);

};
