const Comment = require("../models/Comment.js");
const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

// Creating comment
// router.post("/", async (req, res) => {
//   try {
//     // const commentContent = req.body.comment;
//     // const provinceId = req.body.provinceId;
//     // const user_name = req.session.logged_in_user;
//     // const userObj = await User.findOne({ full_name: user_name }); // findOne search parameter

//     // await Comment.create({
//     //   Content: commentContent,
//     //   province: provinceId,
//     //   user: userObj._id,
//     // });

//     const commentContent = req.body.comment;
//     const provinceId = req.body.provinceId;

//     await Comment.create({
//       Content: commentContent,
//       province: provinceId,
//       user: req.session.logged_in_user._id,
//     });
//     res.redirect(`/${provinceId}`);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/", async (req, res) => {
  try {
    if (!req.session.logged_in_user) {
      return res.redirect("/user/log_in?msg=login_required");
    }

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
    // checking if user is logged in
    if (!req.session.logged_in_user) {
      return res.redirect("/user/log_in?msg=login_required");
    }

    // Find the comment
    const comment = await Comment.findById(req.params.id);

    // check if the logged_in_user is the owner of the comment
    const commnetOwnerId = comment.user.toString();
    const logInUser_id = req.session.logged_in_user._id;

    // condition to check the ownership
    if (commnetOwnerId !== logInUser_id) {
      return res.send("Access denied: you can delete only your own comments");
    }

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
    // check if user is logged in
    if (!req.session.logged_in_user) {
      return res.redirect("/user/log_in?msg=login_required");
    }

    // find the comment
    const comment = await Comment.findById(req.params.id);

    // check if user own the comment
    const commentOwnerId = comment.user.toString();
    const logInUserId = req.session.logged_in_user._id;

    // condition to check ownership
    if (commentOwnerId !== logInUserId) {
      return res.send("Access denied: you can edit only your own comments");
    }

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
