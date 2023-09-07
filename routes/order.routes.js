import express from "express";
import * as order from '../controllers/order.controller.js';
import  authJwt from '../middleware/verify.js';

const router = express.Router();

// Create a new order
router.post("/", order.createOrder);

// Retrieve all orders
router.get("/", [authJwt.verifyToken], order.getAllOrders);

// Retrieve a single order with id
router.get("/:id", [authJwt.verifyToken], order.getOrderById);

// Update an order with id
router.put("/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], order.updateOrder);

// Delete an order with id
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], order.deleteOrder);

export default app => {
    app.use('/api/orders', router);
  };
