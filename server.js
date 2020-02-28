/* -------------------------------------------------------------------------- */
/*  REVIEW                       BY USING CLIENT                              */
/* -------------------------------------------------------------------------- */

const { Client } = require("pg");
require("dotenv").config();
const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const { Router } = require("./Routes/basicJoin");
const port = parseInt(process.env.SERVER_PORT);
app.use(BodyParser.json());
app.use("/user", Router);

//?======================================================================================================================
//?======================================================================================================================
//?======================================================================================================================

//TODO  const client = new Client({
//   user: process.env.USER_NAME,
//   host: process.env.HOST,
//   database: process.env.DB,
//   password: process.env.PASSWORD,
//   port: process.env.DB_PORT
// });
// client
//   .connect()
//   .then(() =>
//     console.log(`Connected to Postgres Server on Port : ${process.env.DB_PORT}`)
//   )
//   .catch(err => console.log(`Cant Connect to Postgres Database ! : ${err}`));

//TODO====================================================================================================================
//TODO====================================================================================================================
//TODO====================================================================================================================

// app.use(async (req, res, next) => {
//   try {
//     const result = await client.query("select * from student");
//     console.table(result.rows);
//   } catch (e) {
//     console.log("Something went wrong !");
//   }
//   next();
// });

//*======================================================================================================================
//*======================================================================================================================
//*======================================================================================================================

app.use("/insert/student", async (req, res, next) => {
  const { rows } = await client.query("select * from actor");
  console.table(rows);
  next();
});
app.post("/insert/student", async (req, res, next) => {
  const query = {
    text:
      "insert into student (student_id,first_name,last_name,email) values ($1,$2,$3,$4)",
    values: [
      req.body.id,
      req.body.first_name,
      req.body.last_name,
      req.body.email
    ]
  };
  client.query(query, async (err, result) => {
    if (err) {
      console.log("error occured", err);
      res.status(400).send(err);
      return;
    }
    console.log("Query Successfull");
    const { rows } = await client.query("select * from student");
    console.table(rows);
    res.send(rows);
    client.end();
    // FIXME  next();
  });
});
app.listen(port, () => console.log(`Server is Listenning on Port : ${port}`));
//REVIEW module.exports = { client };
