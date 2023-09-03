import express from "express";
import * as items from '../controllers/item.controller.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

// Create a new item
router.post("/", verifyJWT, items.createItem);

// Retrieve all items
router.get("/", items.getAllItems);

// Retrieve a single item with id
router.get("/:id", items.getItemByID);

// Update an item with id
router.put("/:id", verifyJWT, items.updateItem);

// Delete an item with id
router.delete("/:id", verifyJWT, items.deleteItem);

// Delete all items
router.delete("/", verifyJWT, items.deleteAllItems);

export default app => {
    app.use('/api/items', router);
  };
