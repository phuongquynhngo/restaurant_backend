import express from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.routes.js';
import itemRoutes from './routes/item.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoute from './routes/auth.route.js';
import refreshRoute from './routes/refresh.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import verifyJWT from './middleware/verify.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for cookies
app.use(cookieParser());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to restaurant backend application." });
});

// Set up routes using the exported functions
categoryRoutes(app);
itemRoutes(app);
authRoute(app);
refreshRoute(app);

// app.use(verifyJWT);
userRoutes(app);



import db from './models/index.js';

// const Role = db.role;
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    // initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  // function initial() {
  //   Role.create({
  //     id: 1,
  //     name: "user"
  //   });
   
  //   Role.create({
  //     id: 2,
  //     name: "moderator"
  //   });
   
  //   Role.create({
  //     id: 3,
  //     name: "admin"
  //   });
  // }

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
