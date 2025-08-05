function add_picture() {
  let container = document.getElementById("pictures_section");
  let newInput = document.createElement("div");
  newInput.classList.add("picture-group");
  newInput.innerHTML = `
        <label>Picture</label>
        <input type="text" name="pictures" required />
    `;
  container.appendChild(newInput);
}

function add_bio() {
  let container = document.getElementById("people_section");
  let newInput = document.createElement("div");
  newInput.classList.add("people-group");
  newInput.innerHTML = `
        <label>Name</label>
        <input type="text" name="names" required />
        <label>Bio</label>
        <input type="text" name="bios" required />
        <label> image </label>
        <input type="text" name="people_imgs" placeholder="Image URL" />
    `;
  container.appendChild(newInput);
}

function add_food() {
  let container = document.getElementById("food_section");
  let newInput = document.createElement("div");
  newInput.classList.add("food-group");
  newInput.innerHTML = `
        <label>Name</label>
        <input type="text" name="food_names" required />
        <label>Description</label>
        <input type="text" name="food_descriptions" required />
        <label>Image</label>
        <input type="text" name="food_imgs" required />
    `;
  container.appendChild(newInput);
}
