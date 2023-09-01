const UserModel = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: true // Enable timestamps (createdAt and updatedAt fields)
    });
  
    return User;
  };
  
  export default UserModel;
  