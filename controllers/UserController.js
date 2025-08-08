// const Province = require("../models/");
const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("./user/sign_up");
});

module.exports = router;
