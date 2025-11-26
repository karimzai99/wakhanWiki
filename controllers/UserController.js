// controllers/UserController.js
const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

/*
/// seed data

router.get("/register/seed", (req, res) => {
  User.insertMany([
    {
      full_name: "naseer",
      email: "naseer@wiki.com",
      password: "1234567",
    },
    {
      full_name: "gharani",
      email: "gharani@gmail.com",
      password: "12345678",
      profile_pictures:
        "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg",
      bio: "he is guniuse",
    },
  ])
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

*/
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
    const {
      full_name,
      email,
      password,
      confirm_password,
      profile_pictures,
      bio,
    } = req.body;
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

    // hashing password
    const hashed_password = await bcrypt.hash(password, 10);
    // email already exist error
    await User.create({
      full_name,
      email,
      password: hashed_password,
      profile_pictures,
      bio,
    });
    res.redirect("/user/register/?msg=complete");
  } catch (err) {
    // res.redirect;
    console.log(err);
    res.redirect("/user/register/msg=database_err" + err);
  }
  //   res.redirect("/user/register/?msg=complete");
});

// UPDATE ROUTE: ( put )

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, profile_pictures, bio } = req.body;

    await User.findByIdAndUpdate(
      id,
      { full_name, email, profile_pictures, bio },
      { new: true, runValidators: true }
    );

    req.session.logged_in_user = {
      ...req.session.logged_in_user,
      full_name,
      email,
      profile_pictures,
      bio,
    };

    res.redirect("/user/profile");
  } catch (err) {
    console.log(err);
    res.redirect("/user/edit/" + req.params.id + "?msg=error");
  }
});

// Create route:
router.post("/log_in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const is_match = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.redirect("/user/log_in/?msg=wrong_email");
    }
    if (!is_match) {
      return res.redirect("/user/log_in/?msg=wrong_password");
    }

    // console.log(user.full_name);

    // req.session.logged_in_user = user.full_name; // previousely
    // new changes: made avialable the entire user object.
    req.session.logged_in_user = {
      _id: user._id.toString(),
      full_name: user.full_name,
      email: user.email,
      profile_pictures: user.profile_pictures || "/images/defualt-avtar.png",
      bio: user.bio,
    };
    // req.session.logged_in_role = "user";

    // new code
    // this is indicates that the user role comes from the db  /-> req.session.logged_in_role = user.role || "editor";
    req.session.logged_in_role = user.role || "editor";

    // testing
    // console.log("ROLE FROM DB", user.role);
    // console.log("ROLE IN SESSION", req.session.logged_in_role);
    // end of new code

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

router.get("/profile", (req, res) => {
  res.render("user/user_profile", { user: req.session.logged_in_user });
});

// edite route
router.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("user/user_edit", { user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
