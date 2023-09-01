import express from "express";
import * as users from '../controllers/user.controller.js';

const router = express.Router();

// Create a new user
router.post("/", users.createUser);

// Retrieve all users
router.get("/", users.getAllUsers);

// Retrieve a single User with id
router.get("/:id", users.getUserByID);

// Update an user with id
router.put("/:id", users.updateUser);

// Delete an user with id
router.delete("/:id", users.deleteUser);

// Delete all users
router.delete("/", users.deleteAllUsers);

export default app => {
    app.use('/api/users', router);
  };
