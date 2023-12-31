
const OrderModel = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      }}, {
        timestamps: true // Enable timestamps (createdAt and updatedAt fields)
      });
  
    return Order;
  };
  
export default OrderModel;
  