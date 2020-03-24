const express = require("express");
const Router = express.Router();
const { client } = require("../index");

// ====================================================== //
// ==================== POST REQUEST ==================== //
// ====================================================== //

Router.post("/pern", async (req, res) => {
  try {
    const { first_name, last_name, email, store_id } = req.body;
    const query = {
      text:
        "insert into customer (first_name,last_name,email,store_id,address_id) values ($1,$2,$3,$4,$5)",
      values: [first_name, last_name, email, store_id, "16"]
    };
    const response = await client.query(query);
    console.log(response);
    const { rows } = response;
    res.send(rows);
  } catch (e) {
    console.error(e);
  } finally {
    client.end();
  }
});

// ====================================================== //
// =================== DELETE REQUEST =================== //
// ====================================================== //

Router.delete("/pern", async (req, res) => {
  try {
    const { customer_id } = req.body;
    const query = {
      text: `delete from customer where customer_id= ${customer_id}`
    };
    await client.query(query);
    res.status(200).send("Customer Data Deleted");
  } catch (err) {
    console.error("Cant Delete Cutomer !", err);
    res.status(400).send("Cant Delete Customer !");
  } finally {
    client.end();
  }
});

// ====================================================== //
// =================== UPDATE REQUEST =================== //
// ====================================================== //

Router.patch("/pern", async (req, res) => {
  try {
    const { customer_name, customer_id } = req.body;
    const query = {
      text: `update customer set first_name='${customer_name}' where customer_id=${customer_id}`
    };
    await client.query(query);
    res.status(200).send("Customer Data Updated Successfully !");
  } catch (err) {
    res
      .status(400)
      .send(`Cant update the customer data,Something went wrong : ${err}`);
  } finally {
    client.end();
  }
});

// ====================================================== //
// ==================== READ REQUEST ==================== //
// ====================================================== //

Router.get("/pern", async (req, res) => {
  try {
    const { address_id } = req.query;
    const query = {
      text: `select concat_ws(' ','Hello','I am',customer.first_name,customer.last_name,'from',address.address) as complete_details from customer inner join address on customer.address_id=address.address_id  where customer.address_id=${address_id}`
    };
    const { rows } = await client.query(query);
    res.status(200).send(rows);
  } catch (err) {
    res.status(400).send(`Something went wrong ! ${err}`);
  } finally {
    client.end();
  }
});

module.exports = { Router };
