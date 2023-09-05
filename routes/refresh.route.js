import express from "express";
import refreshTokenController from '../controllers/refreshToken.controller.js';

const router = express.Router();

// handleRefreshToken route
router.get("/", refreshTokenController.handleRefreshToken);

export default app => {
    app.use('/api/refresh', router);
  };
