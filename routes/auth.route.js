import express from "express";
import * as users from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

//route for signing up
router.post("/signup", users.createUser);

// handleLogin route
router.post("/signin", authController.handleLogin);

//route for signing out using POST request 
router.post('/signout', authController.signOut);

export default app => {
    app.use('/api/auth', router);
  };
