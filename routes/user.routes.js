import express from "express";
import * as users from '../controllers/user.controller.js';
import  authJwt from '../middleware/verify.js';

const router = express.Router();

// Create a new user
router.post("/",
           [ authJwt.isAdmin],  // Middleware functions in the desired order
           users.createUser);

// Retrieve all users
router.get("/", users.getAllUsers);

// Retrieve a single User with id
router.get("/:id", users.getUserByID);

// Update an user with id
router.put("/:id", [authJwt.isAdmin], users.updateUser);

// Delete an user with id
router.delete("/:id", [authJwt.isAdmin],  users.deleteUser);

// Delete all users
router.delete("/", [authJwt.isAdmin], users.deleteAllUsers);

export default app => {
    app.use('/api/users', router);
  };
