const Users = require("../models/Users");

module.exports.createUser = async (req, res) => {
  try {
    
    const userData = {
      name: "yves morel",
      email: "hackerYves842@gmail.com",
      password: "1234567",
    };

    const user = await Users.create(userData);
    res.status(200).json({ message: "user created", user });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
