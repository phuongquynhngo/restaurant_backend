import express from "express";
import * as categories from '../controllers/category.controller.js';

// import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

// Create a new category
router.post("/", categories.createCategory);

// Retrieve all categories
router.get("/", categories.getAllCategories );

// Retrieve a single category with id
router.get("/:id", categories.getCategoryByID);

// Update a category with id
router.put("/:id",  categories.updateCategory);

// Delete a category with id
router.delete("/:id", categories.deleteCategory);

// Delete all categories
router.delete("/",  categories.deleteAllCategories);

export default app => {
  app.use('/api/categories', router);
};
