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

 //create new user
export async function createUser(name, address, email) {
   const [result] = await pool.query(`
   INSERT INTO customers (name, address, email)
   VALUES (?, ?, ?)
   `, [name, address, email])
   const id = result.insertId
   return getCustomer(id)
 }
const result = await createUser('name', 'address', 'email')
console.log("new user", result)



// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'your_username',
//   password: 'your_password',
//   database: 'your_database'
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// });
//  app.get("/api", (req, res) => {
//     res.json({
//         success : 1,
//         message : "This is rest apis working"
//     });
//  });

//  app.listen(3000, () =>{
//     console.log("Server up and running");
//  });
