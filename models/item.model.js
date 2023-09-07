const ItemModel = (sequelize, Sequelize) => {
  const Item = sequelize.define("items", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    timestamps: true // Enable timestamps (createdAt and updatedAt fields)
  });

  Item.associate = models => {
    Item.belongsTo(models.Category, {
      foreignKey: "category_id"
    });
  };

  Item.associate = models => {
    Item.hasMany(models.OrderItem, { foreignKey: 'item_id' });
  };

  return Item;
};

export default ItemModel;
