import express from "express";
import * as item from '../controllers/item.controller.js';
import authJwt from '../middleware/verify.js';

const router = express.Router();

// Create a new item
router.post("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], item.createItem);

// Retrieve all items
router.get("/", item.getAllItems);

// Retrieve a single item with id
router.get("/:id", item.getItemByID);

// Update an item with id
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], item.updateItem);

// Delete an item with id
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], item.deleteItem);

// Delete all items
router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], item.deleteAllItems);

export default app => {
    app.use('/api/items', router);
  };
