import db from "../models/index.js";
const Item = db.items;

// Create and Save a new Item
export const createItem = (req, res) => {
  const { name, description, price, category_id } = req.body;

  // Validate request
  if (!name || !price || !category_id) {
    res.status(400).send({
      message: "Name, price, and category_id cannot be empty!"
    });
    return;
  }

  // Create an Item
  const item = {
    name,
    description,
    price,
    category_id
  };

  // Save Item in the database
  Item.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};
