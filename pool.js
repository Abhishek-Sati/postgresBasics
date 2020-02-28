/* -------------------------------------------------------------------------- */
/*  STUB                               BY USING POOL                          */
/* -------------------------------------------------------------------------- */

// const { Pool } = require("pg");
// const dotenv = require("dotenv");
// dotenv.config();
// const express = require("express");
// const app = express();
// const pool = new Pool({
//   user: process.env.USER_NAME,
//   host: process.env.HOST,
//   database: process.env.DB,
//   password: process.env.PASSWORD,
//   port: process.env.PORT
// });
// pool
//   .connect()
//   .then(() =>
//     console.log(`Connected to Postgres Server on Port : ${process.env.PORT}`)
//   )
//   .catch(err => console.log(`Cant Connect to Postgres Database ! : ${err}`));
// app.get("/", (req, res) => {
//   //   const text =
//   //     "insert into student (student_id,first_name,last_name,email) values ($1,$2,$3,$4) returning *";
//   //   const value = [2061480, "abhishek", "sati", "abhishek01sati@gmail.com"];
//   pool.query(
//     "insert into student (student_id,first_name,last_name,email) values (2061485,'shreya', 'joshi', 'sj@gmail.com') ",
//     (err, result) => {
//       if (err) {
//         console.log("error occured", err);
//         return;
//       }
//       res.send(result);
//       pool.end();
//     }
//   );
// });

// app.listen(3000, () => console.log("Server is listenning on Port : 3000"));
