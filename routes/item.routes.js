import express from "express";
import * as items from '../controllers/item.controller.js';
import verifyJWT from '../middleware/verify.js';

const router = express.Router();

// Create a new item
router.post("/",  items.createItem);

// Retrieve all items
router.get("/", items.getAllItems);

// Retrieve a single item with id
router.get("/:id", items.getItemByID);

// Update an item with id
router.put("/:id",  items.updateItem);

// Delete an item with id
router.delete("/:id",  items.deleteItem);

// Delete all items
router.delete("/",  items.deleteAllItems);

export default app => {
    app.use('/api/items', router);
  };
