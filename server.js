const express = require("express");
const app = express();
require("./config/database.js");

const methodOverRide = require("method-override");
const provinceController = require("./controllers/ProvinceController.js");
const userController = require("./controllers/UserController.js");

// data

// MIDDLE WARE
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.static("public")); // public folder connected
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverRide("_method"));

// routes
// app.get("/", (req, res) => {
//   res.send(`<h1> everything is working </h1>`);
// });

app.use("/", provinceController);
app.use("/user", userController);
app.listen(port, (req, res) => {
  console.log(`app is working at port ${port}`);
});
