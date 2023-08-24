import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { getAllcustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } from './database.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8080

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to user fullstack application." });
});

// get all customers 
app.get("/customers", async (req, res) => {
  const customers = await getAllcustomers();
  res.send(customers);
});

// get single customer 
app.get("/customers/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await getCustomer(id);
  res.send(customer);
});

// create new customer 
app.post("/customers", async (req, res) => {
  const {name, address, email} = req.body;
  const customer = await createCustomer(name, address, email);
  res.status(201).send(customer);
});

// delete customer 
app.delete("/customers/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await deleteCustomer(id);
  res.send( customer);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
  
