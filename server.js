/* -------------------------------------------------------------------------- */
/*  REVIEW                       POSTGRES BY USING CLIENT                     */
/* -------------------------------------------------------------------------- */

require("dotenv").config();
const express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { Router } = require("./Routes/Joins");
const { Router: InsertRouter } = require("./Routes/insertData");
const { Router: pernRouter } = require("./Routes/Pern");
const port = parseInt(process.env.SERVER_PORT);
app.use(BodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/join", Router);
app.use("/insert", InsertRouter);
app.use("/", pernRouter);

app.listen(port, () => console.log(`Server is Listenning on Port : ${port}`));
