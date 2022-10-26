const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

function connectToMongoDB() {
  mongoose.connect(MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("connected to mongoDB successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Error occurred while connecting to MongoDB", err);
  });
}

module.exports = { connectToMongoDB };
