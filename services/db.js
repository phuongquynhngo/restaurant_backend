import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

export async function getAllCustomers() {
  const [rows] = await pool.query("SELECT * FROM customers");
  return rows;
}

export async function getCustomer(id) {
  const [rows] = await pool.query(`SELECT * FROM customers WHERE id = ?`, [id]);
  return rows[0];
}

export async function createCustomer(name, address, email) {
  const [result] = await pool.query(`INSERT INTO customers (name, address, email) VALUES (?, ?, ?)`, [name, address, email]);
  const id = result.insertId;
  return getCustomer(id);
}

export async function updateCustomer(id, name, address, email) {
  await pool.query(`UPDATE customers SET name = ?, address = ?, email = ? WHERE id = ?`, [name, address, email, id]);
  return getCustomer(id);
}

export async function deleteCustomer(id) {
  const customerToDelete = await getCustomer(id);
  await pool.query(`DELETE FROM customers WHERE id = ?`, [id]);
  return customerToDelete;
}
