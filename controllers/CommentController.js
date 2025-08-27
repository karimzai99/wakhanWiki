const Comment = require("../models/Comment.js");
const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

router.get("/seed", (req, res) => {
  Comment.insertMany([
    {
      Content: "Afghanistan is the greate",
    },
    {
      Content: "Afghanistan is the gravyard of empire",
    },
  ]);
});

// Creating comment
router.post("/", async (req, res) => {
  try {
    const commentContent = req.body.comment;
    const provinceId = req.body.provinceId;
    const user_name = req.session.logged_in_user;
    const userObj = await User.findOne({ full_name: user_name }); // findOne search parameter

    await Comment.create({
      Content: commentContent,
      province: provinceId,
      user: userObj._id,
    });
    res.redirect(`/${provinceId}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
