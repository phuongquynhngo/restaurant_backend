import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/', routes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to restaurant backend application." });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
