const ItemModel = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
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
    }
  }, {
    timestamps: true // Enable timestamps (createdAt and updatedAt fields)
  });

  Item.associate = models => {
    Item.belongsTo(models.Category, {
      foreignKey: "category_id"
    });
  };

  return Item;
};

export default ItemModel;
