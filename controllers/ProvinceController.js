const Province = require("../models/Province");

// express
const express = require("express");
const router = express.Router();

// SEED
router.get("/seed", (req, res) => {
  Province.insertMany([
    {
      name: "kabul",
      description: "the Capital City Of Afghanistan",
      knownFor: "Ahmad Shah Baba",
      famousePeople: [
        { name: "Ahmad Shah durrani", bio: "the builder of Afghanistan" },
      ],
      famouseFood: [
        { name: "Qabuli", description: "it is very old food in Kabul" },
      ],
    },
    {
      name: "kunar",
      description: "the beutifull province of Afghanistan",
      knownFor: "Alama sayed jamaluddin afghan",
      famousePeople: [
        {
          name: "sayed jamaluddin afghan",
          bio: "the first genuis of afghanistan",
        },
      ],
      famouseFood: [
        {
          name: "Daanda",
          description: "famouse amoung friends to have it at the sea shore",
        },
      ],
    },
  ])
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
