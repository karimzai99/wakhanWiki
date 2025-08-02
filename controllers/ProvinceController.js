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
      known_for: "Ahmad Shah Baba",
      pictures: [
        {
          img: "https://content.r9cdn.net/rimg/dimg/a7/a2/2674716c-city-1265-172ff1a51b5.jpg?width=1200&height=630&xhint=2071&yhint=1568&crop=true",
        },
        {
          img: "https://images.pexels.com/photos/18338524/pexels-photo-18338524/free-photo-of-cityscape-of-kabul-in-afghanistan.jpeg",
        },
      ],
      famous_people: [
        {
          name: "Ahmad Shah durrani",
          bio: "the builder of Afghanistan",
          img: "2wCEAAkGBxMTEhUTExMVFhUXGBgYFxgYGBgXGhcYGhgYFxgaGBgYHSggHR0lHR0gITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGysmICYvLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf",
        },
      ],
      famous_foodrs: [
        {
          name: "Qabuli",
          description: "it is very old food in Kabul",
          img: "https://www.bandamirrestaurant.at/wp-content/uploads/2024/04/QabuliPalou.webp",
        },

        {
          name: "manto",
          description: "it is very old food in Kabul some extra information",
          img: "https://tasteoftheplace.com/wp-content/uploads/2017/10/Afghan-Mantu-at-TasteOfThePlace.com-inline-5.jpg",
        },
      ],
    },
    {
      name: "kunar",
      description: "the beutifull province of Afghanistan",
      known_for: "Alama sayed jamaluddin afghan",
      pictures: [
        {
          img: "https://i.ytimg.com/vi/zHrtt0zc-tY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGFUgZSgUMA8=&rs=AOn4CLAUdzFvbaMj8DWjDGj2a7VyHRqi_w",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzdBn_q2fORUOBies9qdXATLzvQJmq9c_Og&s",
        },
      ],
      famous_people: [
        {
          name: "sayed jamaluddin afghan",
          bio: "the first genuis of afghanistan",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJu38WpsCmt1IxJ0UHlAAY0p-AswcOzzitA&s",
        },
      ],
      famous_foodrs: [
        {
          name: "Daanda",
          description: "famouse amoung friends to have it at the sea shore",
          img: "https://rvlife.com/wp-content/uploads/2022/10/shutterstock_1785324788-1024x683.jpg",
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

// INDUCES
// index route
router.get("/", async (req, res) => {
  try {
    const provinces = await Province.find();
    res.render("index.ejs", {
      provinces,
    });
  } catch (err) {
    res.send(err);
  }
});

// Show route province
router.get("/:id", async (req, res) => {
  // res.render("show");
  try {
    const province = await Province.findById(req.params.id);
    console.log(province);
    // const provincePeople = await Province.findById({ famous_people });

    res.render("show", {
      province,
      // provincePeople,
    });
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
