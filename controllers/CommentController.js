const Comment = require("../models/Comment.js");
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

    await Comment.create({
      Content: commentContent,
      province: provinceId,
    });
    res.redirect(`/${provinceId}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
