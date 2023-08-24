import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

//using pool to reuse connections to the database 
//.promise() method allows using async/await
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

//get all customers
// const result = await pool.query("SELECT * FROM customers")
// const rows = result[0]
// console.log(rows)
export async function getAllcustomers() {
   const [rows] = await pool.query("SELECT * FROM customers")
   return rows
 }
 const customers = await getAllcustomers()
 console.log("all customers:", customers)

 //get a single customer
//using parameterized query to keeps user input separate from the actual commands to prevent SQL injection
 export async function getCustomer(id) {
   const [rows] = await pool.query(`
   SELECT * 
   FROM customers
   WHERE id = ?
   `, [id])
   return rows[0]
 }
 const customer = await getCustomer(10)
 console.log("single customer:", customer)

 //create new customer
export async function createCustomer(name, address, email) {
   const [result] = await pool.query(`
   INSERT INTO customers (name, address, email)
   VALUES (?, ?, ?)
   `, [name, address, email])
   const id = result.insertId
   return getCustomer(id)
 }
// const result = await createCustomer('name', 'address', 'email')
// console.log("new customer", result)

//update customer
export async function updateCustomer(id, name, address, email) {
  await pool.query(`
  UPDATE customers
  SET name = ?, address = ?, email = ?
  WHERE id = ?
  `, [name, address, email, id]);
  return getCustomer(id);
}
// const updatedCustomer = await updateCustomer(6, 'new name6', 'new address', 'newemail@example.com');
// console.log("updated customer:", updatedCustomer);

//delete customer
export async function deleteCustomer(id) {
  const customerToDelete = await getCustomer(id); // Get the customer details before deleting
  await pool.query(`
  DELETE FROM customers
  WHERE id = ?
  `, [id]);
  return customerToDelete;
}
// const deletedCustomer = await deleteCustomer(1);
// console.log("deleted customer:", deletedCustomer);
