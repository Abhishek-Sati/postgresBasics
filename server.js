/* -------------------------------------------------------------------------- */
/*  REVIEW                       POSTGRES BY USING CLIENT                     */
/* -------------------------------------------------------------------------- */

require("dotenv").config();
const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const { Router } = require("./Routes/Joins");
const { Router: InsertRouter } = require("./Routes/insertData");
const port = parseInt(process.env.SERVER_PORT);
app.use(BodyParser.json());
app.use("/join", Router);
app.use("/insert", InsertRouter);

// app.use(async (req, res, next) => {
//   try {
//     const result = await client.query("select * from student");
//     console.table(result.rows);
//   } catch (e) {
//     console.log("Something went wrong !");
//   }
//   next();
// });

app.listen(port, () => console.log(`Server is Listenning on Port : ${port}`));
