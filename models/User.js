// user schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
  profile_pictures: String,
  bio: String,

  // roles: writer, editor
  role: {
    type: String,
    enum: ["writer", "editor"], // allows only two fields and enum is the mongoDB keyword.
    default: "editor",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
