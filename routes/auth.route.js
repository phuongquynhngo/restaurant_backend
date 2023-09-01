import express from "express";
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// handleLogin route
router.post("/", authController.handleLogin);

export default app => {
    app.use('/api/auth', router);
  };
