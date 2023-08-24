import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
   host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

// const result = await pool.query("SELECT * FROM customers")
// const rows = result[0]
// console.log(rows)
async function getAllnotes() {
   const [rows] = await pool.query("SELECT * FROM customers")
   return rows
 }
 
 const notes = await getAllnotes()
 console.log(notes)

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
