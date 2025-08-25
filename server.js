const express = require("express");
const app = express();
require("./config/database.js");

const methodOverRide = require("method-override");
const provinceController = require("./controllers/ProvinceController.js");
const userController = require("./controllers/UserController.js");
const commentController = require("./controllers/CommentController.js");
var session = require("express-session");

// data

// MIDDLE WARE
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.static("public")); // public folder connected
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverRide("_method"));

// cookies initialize
app.use(
  session({
    secret: "afghanistan123@", // client site ecrypt
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // make true when deploying to https
  })
);

// routes
// app.get("/", (req, res) => {
//   res.send(`<h1> everything is working </h1>`);
// });

//
app.use((req, res, next) => {
  res.locals.logged_in_user = req.session.logged_in_user || null;
  res.locals.logged_in_role = req.session.logged_in_role || null;
  next(); // work is done go forward
});
app.use("/", provinceController);

app.use("/user", userController);

app.use("/comment", commentController);

app.listen(port, (req, res) => {
  console.log(`app is working at port ${port}`);
});
