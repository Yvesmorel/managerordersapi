const Users = require("../models/Users");

const getUsers = async (req, res) => {

  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

const editUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      res.status(400).json({ message: "user not found" });
    }

    const updateUser = await Users.findByIdAndUpdate(user, req.body, {
      new: true,
    });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    await user.deleteOne({ _id: user });
    res.status(200).json("User deleted" + req.params.id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  editUser,
  deleteUser,
  getUsers,
  getUser,
};
