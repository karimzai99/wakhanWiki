const Province = require("../models/Province");

const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { require_writer } = require("../middleware/auth");

/*
// SEED Route:
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
      famous_food: [
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
      famous_food: [
        {
          name: "Daanda",
          description: "famouse amoung friends to have it at the sea shore",
          img: "https://rvlife.com/wp-content/uploads/2022/10/shutterstock_1785324788-1024x683.jpg",
        },
      ],
    },
  ])
    .then((response) => {
      // console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
*/
// Index route
router.get("/", async (req, res) => {
  try {
    const provinces = await Province.find();

    // const comments = await Comment.find();
    res.render("index.ejs", { provinces });
  } catch (err) {
    res.send(err);
  }
});

// New route:
router.get("/new", require_writer, (req, res) => {
  res.render("new");
});

// Delete route:
router.delete("/:id", require_writer, async (req, res) => {
  try {
    await Province.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// UPDATE Route (PUT):
router.put("/:id", require_writer, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, known_for } = req.body;
    // Array.isArray => this changes non array type into array data type
    const pictures = Array.isArray(req.body.pictures)
      ? req.body.pictures
      : [req.body.pictures];
    const names = Array.isArray(req.body.names)
      ? req.body.names
      : [req.body.names];
    const bios = Array.isArray(req.body.bios) ? req.body.bios : [req.body.bios];
    const people_imgs = Array.isArray(req.body.people_imgs)
      ? req.body.people_imgs
      : [req.body.people_imgs];
    const food_names = Array.isArray(req.body.food_names)
      ? req.body.food_names
      : [req.body.food_names];
    const food_descriptions = Array.isArray(req.body.food_descriptions)
      ? req.body.food_descriptions
      : [req.body.food_descriptions];
    const food_imgs = Array.isArray(req.body.food_imgs)
      ? req.body.food_imgs
      : [req.body.food_imgs];

    const famous_people = names.map((personName, i) => ({
      name: personName,
      bio: bios[i],
      img: people_imgs[i],
    }));

    const famous_food = food_names.map((foodName, i) => ({
      name: foodName,
      description: food_descriptions[i],
      img: food_imgs[i],
    }));

    await Province.findByIdAndUpdate(
      id,
      {
        name,
        description,
        known_for,
        pictures: pictures.map((img) => ({ img })),
        famous_people,
        famous_food,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.redirect(`/${id}`);
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).send("Server Error during update");
  }
});

// Create route:
router.post("/", require_writer, async (req, res) => {
  try {
    const { name, description, known_for } = req.body;

    const pictures = Array.isArray(req.body.pictures)
      ? req.body.pictures
      : [req.body.pictures];
    const names = Array.isArray(req.body.names)
      ? req.body.names
      : [req.body.names];
    const bios = Array.isArray(req.body.bios) ? req.body.bios : [req.body.bios];
    const food_names = Array.isArray(req.body.food_names)
      ? req.body.food_names
      : [req.body.food_names];
    const food_descriptions = Array.isArray(req.body.food_descriptions)
      ? req.body.food_descriptions
      : [req.body.food_descriptions];
    const food_imgs = Array.isArray(req.body.food_imgs)
      ? req.body.food_imgs
      : [req.body.food_imgs];
    const people_imgs = Array.isArray(req.body.people_imgs)
      ? req.body.people_imgs
      : [req.body.people_imgs];

    const famous_people = names.map((n, i) => ({
      name: n,
      bio: bios[i],
      img: people_imgs[i],
    }));

    const famous_food = food_names.map((n, i) => ({
      name: n,
      description: food_descriptions[i],
      img: food_imgs[i],
    }));

    await Province.create({
      name,
      description,
      known_for,
      pictures: pictures.map((img) => ({ img })),
      famous_people,
      famous_food,
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Edit form route:
router.get("/:id/edit", require_writer, async (req, res) => {
  try {
    const province = await Province.findById(req.params.id);
    res.render(`edit`, { province });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const province = await Province.findById(req.params.id);
    if (!province) {
      return res.status(404).send("Province not found");
    }

    const comments = await Comment.find({ province: req.params.id }).populate(
      "user"
    );
    res.render("show", { province: province, comments: comments });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
