const { Client } = require("pg");
require("dotenv").config();
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
module.exports = { client };
