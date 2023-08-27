const CategoryModel = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: true // Enable timestamps (createdAt and updatedAt fields)
    });
  
    return Category;
  };
  
  export default CategoryModel;
  
  