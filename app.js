import mysql from 'mysql2'

const pool = mysql.createPool({
   host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'restaurant'
}).promise()

// const result = await pool.query("SELECT * FROM customers")
// const rows = result[0]
// console.log(rows)
const [rows] = await pool.query("SELECT * FROM customers")
console.log(rows)

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
