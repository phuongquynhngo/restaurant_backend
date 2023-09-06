import express from "express";
import * as items from '../controllers/item.controller.js';
import authJwt from '../middleware/verify.js';

const router = express.Router();

// Create a new item
router.post("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], items.createItem);

// Retrieve all items
router.get("/", items.getAllItems);

// Retrieve a single item with id
router.get("/:id", items.getItemByID);

// Update an item with id
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], items.updateItem);

// Delete an item with id
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], items.deleteItem);

// Delete all items
router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], items.deleteAllItems);

export default app => {
    app.use('/api/items', router);
  };
