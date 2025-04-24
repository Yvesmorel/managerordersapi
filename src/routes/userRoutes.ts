const {
  createUser,
  editUser,
  deleteUser,
  getUsers,
  getUser,
} = require("../controllers/userController");

const verifyFirebaseToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {

  app.post("/users", verifyFirebaseToken, createUser);
  app.get("/users", verifyFirebaseToken, getUsers);

  app.put("/users/:id", verifyFirebaseToken, editUser);
  app.get("/users/:id", verifyFirebaseToken, getUser);

  app.delete("/users/:id",verifyFirebaseToken, deleteUser);
  
};
