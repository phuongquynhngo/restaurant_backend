const CategoryModel = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
      timestamps: true // Enable timestamps (createdAt and updatedAt fields)
    });
  
    return Category;
  };
  
  export default CategoryModel;
  
  