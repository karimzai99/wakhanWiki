// user schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
  //   profile_pictures: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
