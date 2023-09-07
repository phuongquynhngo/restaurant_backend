const OrderItemModel = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_items", {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return OrderItem;
  };
  
  export default OrderItemModel;
  