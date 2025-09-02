// controllers/UserController.js
const User = require("../models/User");
const express = require("express");
const router = express.Router();

/// seed data

router.get("/register/seed", (req, res) => {
  User.insertMany([
    {
      full_name: "naseer",
      email: "naseer@wiki.com",
      password: "1234567",
    },
    {
      full_name: "uzair",
      email: "uzair@wiki.com",
      password: "abcdefg",
    },
  ])
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/register", (req, res) => {
  const _msg = req.query.msg;
  res.render("user/sign_up", { msg: _msg });
});

router.get("/log_in", (req, res) => {
  const _msg = req.query.msg;
  res.render("user/log_in", { msg: _msg });
});

router.post("/register", async (req, res) => {
  // database logic
  try {
    ///////////////
    const { full_name, email, password, confirm_password } = req.body;
    let _msg = "";
    if (full_name.length < 3 || full_name.trim().length < full_name.length) {
      // trim() removes extra space befor and after
      _msg = "wrong_name";
    }

    if (email.length < 6 || !email.includes("@") || !email.includes(".")) {
      _msg = "wrong_email";
    }

    if (password.length < 6) {
      _msg = "wrong_password";
    }

    if (password !== confirm_password) {
      _msg = "wrong_match";
    }

    if (_msg !== "") {
      return res.redirect("/user/register/?msg=" + _msg);
    }
    /////////////
    const exit_user = await User.findOne({ email });
    if (exit_user) {
      return res.redirect("/user/register/?msg=email_exists");
    }
    // email already exist error
    await User.create({
      full_name,
      email,
      password,
    });
    res.redirect("/user/register/?msg=complete");
  } catch (err) {
    // res.redirect;
    console.log(err);
    res.redirect("/user/register/msg=database_err" + err);
  }
  //   res.redirect("/user/register/?msg=complete");
});

router.post("/log_in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/user/log_in/?msg=wrong_email");
    }
    if (user.password !== password) {
      return res.redirect("/user/log_in/?msg=wrong_password");
    }

    // console.log(user.full_name);

    // req.session.logged_in_user = user.full_name; // previousely
    // new changes: made avialable the entire user object.
    req.session.logged_in_user = {
      _id: user._id.toString(),
      full_name: user.full_name,
      email: user.email,
    };
    req.session.logged_in_role = "user";

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/log_out", (req, res) => {
  req.session.logged_in_user = null;
  req.session.logged_in_role = null;
  res.redirect("/");
});

module.exports = router;
