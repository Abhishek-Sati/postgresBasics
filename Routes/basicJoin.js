const { Client } = require("pg");
require("dotenv").config();
const express = require("express");
const Router = express.Router();

//TODO====================================================================================================================
//TODO====================================================================================================================
//TODO====================================================================================================================

const client = new Client({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});
client
  .connect()
  .then(() =>
    console.log(`Connected to Postgres Server on Port : ${process.env.DB_PORT}`)
  )
  .catch(err => console.log(`Cant Connect to Postgres Database ! : ${err}`));

//?=====================================================================================================================
//?=====================================================================================================================
//?=====================================================================================================================

Router.use("/join/customer/address", async (req, res, next) => {
  const query = {
    text:
      "SELECT first_name, last_name FROM customer INNER JOIN address ON customer.customer_id=address.address_id ORDER BY first_name ASC"
  };
  try {
    const response = await client.query(query);
    const { rows } = response;
    req.data = rows;
  } catch (e) {
    res.status(400).send(e);
  }
  next();
});
Router.get("/join/customer/address", (req, res) => {
  res.status(200).send(req.data);
  console.log("success !");
  client.end();
});
module.exports = { Router };
