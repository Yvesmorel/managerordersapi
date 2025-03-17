const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.db_uri);
    console.log("Connected!");
    
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectDB;
