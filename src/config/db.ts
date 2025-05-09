const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.db_uri);
    console.log("Mongo onnected!");
  } catch (error) {
    process.exit();
  }
};

module.exports = connectDB;
