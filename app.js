import express from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.routes.js';
import itemRoutes from './routes/item.routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';

dotenv.config();

const app = express();
app.use(express.json());

// var corsOptions = {
//   origin: "http://localhost:5173"
// };
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Set up category and item routes using the exported functions
categoryRoutes(app);
itemRoutes(app);


import db from './models/index.js';
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to restaurant backend application." });
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
