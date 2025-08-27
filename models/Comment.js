const mongoose = require("mongoose");
const User = require("./User");

// const User = require("./User");

const commentScheme = new mongoose.Schema({
  Content: String,
  // refrence of Province for the comment AKA user name
  province: { type: mongoose.Schema.Types.ObjectId, ref: "Province" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", commentScheme);
module.exports = Comment;
