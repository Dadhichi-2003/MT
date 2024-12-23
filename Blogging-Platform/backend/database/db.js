const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connection Successfull");
  } catch (err) {
    console.log("Database Connection Fail");
  }
};

module.exports = connectToDB;
