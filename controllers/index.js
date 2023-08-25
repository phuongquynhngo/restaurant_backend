import { getAllCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } from '../services/db.js';

export async function getAllCustomersController(req, res, next) {
  try {
    const customers = await getAllCustomers();
    res.send(customers);
  } catch (error) {
    next(error);
  }
}

export async function getCustomerController(req, res, next) {
  try {
    const id = req.params.id;
    const customer = await getCustomer(id);
    res.send(customer);
  } catch (error) {
    next(error);
  }
}

export async function createCustomerController(req, res, next) {
  try {
    const { name, address, email } = req.body;
    const customer = await createCustomer(name, address, email);
    res.status(201).send(customer);
  } catch (error) {
    next(error);
  }
}

export async function updateCustomerController(req, res, next) {
  try {
    const id = req.params.id;
    const { name, address, email } = req.body;
    const updatedCustomer = await updateCustomer(id, name, address, email);
    res.send(updatedCustomer);
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomerController(req, res, next) {
  try {
    const id = req.params.id;
    const deletedCustomer = await deleteCustomer(id);
    res.send(deletedCustomer);
  } catch (error) {
    next(error);
  }
}
