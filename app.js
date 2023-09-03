import express from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.routes.js';
import itemRoutes from './routes/item.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import verifyJWT from './middleware/verifyJWT.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to restaurant backend application." });
});

// Set up routes using the exported functions
categoryRoutes(app);
itemRoutes(app);
authRoutes(app);

app.use(verifyJWT);
userRoutes(app);

import db from './models/index.js';
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
