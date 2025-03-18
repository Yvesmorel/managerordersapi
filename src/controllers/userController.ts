const Users = require("../models/Users");

const createUser = async (email, id, res) => {
  try {
    const userData = {
      email,
      userId: id,
    };

    await Users.create(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};
