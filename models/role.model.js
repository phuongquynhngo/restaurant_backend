const RoleModel  = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: true // Enable timestamps (createdAt and updatedAt fields)
      });
  
    return Role;
  };

export default RoleModel;