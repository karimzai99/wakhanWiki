const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  name: String, // name of province
  description: String, // a short paragraph about province
  knownFor: String, // what the province famouse for
  famousePeople: [
    {
      name: String,
      bio: String,
    },
  ],
  famouseFood: [
    {
      name: String,
      description: String,
    },
  ],
});

const Province = mongoose.model("Province", provinceSchema);
module.exports = Province;
