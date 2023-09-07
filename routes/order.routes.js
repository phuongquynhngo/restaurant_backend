import express from "express";
import * as order from '../controllers/order.controller.js';

const router = express.Router();

// Create a new order
router.post("/", order.createOrder);

// Retrieve all orders
router.get("/", order.getAllOrders);

// Retrieve a single order with id
router.get("/:id", order.getOrderById);

// Update an order with id
router.put("/:id", order.updateOrder);

// Delete an order with id
router.delete("/:id", order.deleteOrder);

export default app => {
    app.use('/api/orders', router);
  };
