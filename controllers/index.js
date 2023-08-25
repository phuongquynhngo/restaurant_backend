import {
    getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
  } from '../services/db.js';
  
  const handleControllerError = (res, error) => {
    console.error(error);
    res.status(500).send({ message: 'An error occurred.' });
  };
  
  export async function getAllCustomersController(req, res) {
    try {
      const customers = await getAllCustomers();
      res.send(customers);
    } catch (error) {
      handleControllerError(res, error);
    }
  }
  
  export async function getCustomerController(req, res) {
    try {
      const id = req.params.id;
      const customer = await getCustomer(id);
  
      if (!customer) {
        res.status(404).send({ message: "Not found Customer with id " + id });
      } else {
        res.send(customer);
      }
    } catch (error) {
      handleControllerError(res, error);
    }
  }
  
  export async function createCustomerController(req, res) {
    try {
      const { name, address, email } = req.body;
      const customer = await createCustomer(name, address, email);
      res.status(201).send(customer);
    } catch (error) {
      handleControllerError(res, error);
    }
  }
  
  export async function updateCustomerController(req, res) {
    try {
      const id = req.params.id;
      const { name, address, email } = req.body;
      const updatedCustomer = await updateCustomer(id, name, address, email);
  
      if (!updatedCustomer) {
        res.status(404).send({ message: "Not found Customer with id " + id });
      } else {
        res.send(updatedCustomer);
      }
    } catch (error) {
      handleControllerError(res, error);
    }
  }
  
  export async function deleteCustomerController(req, res) {
    try {
      const id = req.params.id;
      const deletedCustomer = await deleteCustomer(id);
  
      if (!deletedCustomer) {
        res.status(404).send({ message: "Not found Customer with id " + id });
      } else {
        res.send(deletedCustomer);
      }
    } catch (error) {
      handleControllerError(res, error);
    }
  }
  