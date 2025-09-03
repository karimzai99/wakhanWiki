const Comment = require("../models/Comment.js");
const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

// Creating comment
router.post("/", async (req, res) => {
  try {
    // const commentContent = req.body.comment;
    // const provinceId = req.body.provinceId;
    // const user_name = req.session.logged_in_user;
    // const userObj = await User.findOne({ full_name: user_name }); // findOne search parameter

    // await Comment.create({
    //   Content: commentContent,
    //   province: provinceId,
    //   user: userObj._id,
    // });

    const commentContent = req.body.comment;
    const provinceId = req.body.provinceId;

    await Comment.create({
      Content: commentContent,
      province: provinceId,
      user: req.session.logged_in_user._id,
    });
    res.redirect(`/${provinceId}`);
  } catch (err) {
    console.log(err);
  }
});

// delete route
router.delete("/:id", async (req, res) => {
  try {
    // Find the comment
    const comment = await Comment.findById(req.params.id);

    // for redirection needed to put back province
    const provinceId = comment.province;

    await Comment.findByIdAndDelete(req.params.id);

    res.redirect(`/${provinceId}`);
  } catch (err) {
    console.log(err);
  }
});

// edit comment route
router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const provinceId = comment.province;
    await Comment.findByIdAndUpdate(req.params.id, {
      Content: req.body.Content,
      edited: true,
    });
    res.redirect(`/${provinceId}`);
  } catch (err) {
    console.log(err);
    console.log(err);
  }
});

module.exports = router;
