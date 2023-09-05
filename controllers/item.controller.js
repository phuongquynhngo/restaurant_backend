import db from "../models/index.js";
const Item = db.item;

// Create and Save a new Item
export const createItem = (req, res) => {
  const { name, description, price, image, category_id } = req.body;

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
    image,
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


// List all items
export const getAllItems = (req, res) => {
  Item.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items."
      });
    });
};


// Get Item by ID
export const getItemByID = (req, res) => {
  const id = req.params.id;

  Item.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Item not found." });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving item with ID=" + id
      });
    });
};


// Update Item
export const updateItem = (req, res) => {
  const id = req.params.id;

  Item.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Item was updated successfully." });
      } else {
        res.send({ message: `Cannot update item with ID=${id}. Item not found or req.body is empty.` });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating item with ID=" + id
      });
    });
};

// Delete Item
export const deleteItem = (req, res) => {
  const id = req.params.id;

  Item.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Item was deleted successfully." });
      } else {
        res.send({ message: `Cannot delete item with ID=${id}. Item not found.` });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete item with ID=" + id
      });
    });
};

// Delete All Items
export const deleteAllItems = (req, res) => {
  Item.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} items were deleted successfully.` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all items."
      });
    });
};


