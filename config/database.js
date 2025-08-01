// database connection

const mongoose = require("mongoose");

// .env require
require("dotenv").config();

// access key .env
const MONGODBURI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODBURI)
  .then(() => {
    console.log(" MongoDB connected");
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log(" MongoDB disconnected");
});
