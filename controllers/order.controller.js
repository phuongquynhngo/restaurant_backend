import db from "../models/index.js";
const  Order  = db.order;
const  Item  = db.item;
const OrderItem = db.orderItem;

// Create a new order

export const createOrder =  async (req, res) => {
  try {
    const { customerName, customerEmail, customerAddress, products } = req.body;

    const order = await Order.create({
      customerName,
      customerEmail,
      customerAddress
    });

    // Associate items with quantities to the order
    for (const product of products) {
      const item = await Item.findByPk(product.itemId);

      if (!item) {
        return res.status(404).json({ error: `Item with ID ${product.itemId} not found` });
      }

      await OrderItem.create({
        order_id: order.id,
        item_id: product.itemId,
        quantity: product.quantity
      });
    }

    return res.status(201).json({ order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    // const orders = await Order.findAll();
    // const orders = await Order.findAll({
    //     include: [{ model: OrderItem, include: [Item] }]
    //   });

    const orders = await Order.findAll({
        include: [
          { 
            model: OrderItem,
            as: 'order_items',
            attributes: ['quantity', 'item_id'],
            include: [
              {
                model: Item,
                attributes: ['name', 'description', 'price', 'image']
              }
            ]
          }
        ]
      });
  

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [{ model: OrderItem, include: [Item] }]
    });

    if (!order) {
      return res.status(404).json({ error: `Order with ID ${orderId} not found` });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { customerName, customerEmail, customerAddress, products } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: `Order with ID ${orderId} not found` });
    }

    await order.update({
      customerName,
      customerEmail,
      customerAddress
    });

    // Delete existing order items and re-create them
    await OrderItem.destroy({ where: { order_id: orderId } });
    for (const product of products) {
      const item = await Item.findByPk(product.itemId);

      if (!item) {
        return res.status(404).json({ error: `Item with ID ${product.itemId} not found` });
      }

      await OrderItem.create({
        order_id: orderId,
        item_id: product.itemId,
        quantity: product.quantity
      });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: `Order with ID ${orderId} not found` });
    }

    await OrderItem.destroy({ where: { order_id: orderId } });
    await order.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

