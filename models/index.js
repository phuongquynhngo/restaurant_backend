// const dbConfig = require("../config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

// module.exports = db;

//using ES6 import and export syntax
import { Sequelize } from "sequelize";
import CategoryModel from "./category.model.js";
import ItemModel from "./item.model.js";
import UserModel from "./user.model.js";
import RoleModel from "./role.model.js";
import OrderModel from "./order.model.js";
import OrderItemModel from "./orderItem.model.js";
import dotenv from 'dotenv';

dotenv.config();


// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0,  // Minimum number of connections in the pool
    acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being closed
  },
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = CategoryModel(sequelize, Sequelize);
db.item = ItemModel(sequelize, Sequelize);
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);
db.order = OrderModel(sequelize, Sequelize);
db.orderItem = OrderItemModel(sequelize, Sequelize);


//define associations between models
//one category can have multiple items
db.category.hasMany(db.item, {
    as: "items",
    foreignKey: "category_id"
  });
//each item belongs to only one category 
db.item.belongsTo(db.category, {
    foreignKey: "category_id"
  });

// One Role can be taken on by many Users
db.role.belongsToMany(db.user, {
    through: "user_role",
    foreignKey: 'roleId'
    
  });
// One User can have several Roles
// retrieve the user's roles
// This association uses the roles field in the users table, which is an array of role IDs
db.user.belongsToMany(db.role, {
    through: "user_role",
    foreignKey: 'userId' 

  });

      //role-based access control (RBAC) system
      //Junction table (user_role): This table establishes the many-to-many relationship between users and roles.  
db.ROLES = ["user", "admin", "moderator"];

db.order.hasMany(db.orderItem, { foreignKey: 'order_id' });
db.item.hasMany(db.orderItem, { foreignKey: 'item_id' });

export default db;
