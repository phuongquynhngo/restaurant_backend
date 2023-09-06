import express from "express";
import * as categories from '../controllers/category.controller.js';
import  authJwt from '../middleware/verify.js';

const router = express.Router();

// Create a new category
router.post("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], categories.createCategory);

// Retrieve all categories
router.get("/", categories.getAllCategories );

// Retrieve a single category with id
router.get("/:id", categories.getCategoryByID);

// Update a category with id
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], categories.updateCategory);

// Delete a category with id
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], categories.deleteCategory);

// Delete all categories
router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], categories.deleteAllCategories);

export default app => {
  app.use('/api/categories', router);
};
