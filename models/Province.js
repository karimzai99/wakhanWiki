const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  name: String, // name of province
  description: String, // a short paragraph about province
  known_for: String, // what the province famouse for
  pictures: [
    {
      img: String,
    },
  ], // multiple images
  famous_people: [
    {
      name: String,
      bio: String,
      img: String,
    },
  ],
  famous_food: [
    {
      name: String,
      description: String,
      img: String,
    },
  ],
});

const Province = mongoose.model("Province", provinceSchema);
module.exports = Province;
