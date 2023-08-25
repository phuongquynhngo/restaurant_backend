import { getAllCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } from '../services/db.js';

class CustomerModel {
  static async getAllCustomers() {
    return getAllCustomers();
  }

  static async getCustomer(id) {
    return getCustomer(id);
  }

  static async createCustomer(name, address, email) {
    return createCustomer(name, address, email);
  }

  static async updateCustomer(id, name, address, email) {
    return updateCustomer(id, name, address, email);
  }

  static async deleteCustomer(id) {
    return deleteCustomer(id);
  }
}

export default CustomerModel;
