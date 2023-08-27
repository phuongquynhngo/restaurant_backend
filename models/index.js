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
import dotenv from 'dotenv';

dotenv.config();


// Initialize Sequelize instance
const sequelize = new Sequelize({
    dialect: 'mysql', // Specify the database dialect
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = CategoryModel(sequelize, Sequelize);
db.items = ItemModel(sequelize, Sequelize);

//define associations between models
//one category can have multiple items
db.categories.hasMany(db.items, {
    as: "items",
    foreignKey: "category_id"
  });
//each item belongs to only one category 
db.items.belongsTo(db.categories, {
    foreignKey: "category_id"
  });

export default db;
