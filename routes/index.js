import express from 'express';
import {
  getAllCustomersController,
  getCustomerController,
  createCustomerController,
  updateCustomerController,
  deleteCustomerController
} from '../controllers/index.js';

const router = express.Router();

router.get('/customers', getAllCustomersController);
router.get('/customers/:id', getCustomerController);
router.post('/customers', createCustomerController);
router.put('/customers/:id', updateCustomerController);
router.delete('/customers/:id', deleteCustomerController);

export default router;
