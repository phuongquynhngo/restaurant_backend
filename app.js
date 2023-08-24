import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// simple route
app.get("/customers", (req, res) => {
  res.send("all customers");
  // res.json({ message: "all customers" });
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
  
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to user fullstack application." });
});