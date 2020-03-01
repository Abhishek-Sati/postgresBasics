//const { Client } = require("pg");
const express = require("express");
const Router = express.Router();
const { client } = require("../index");

/*//! -------------------------------------------------------------------------- */
/*//!                                  INNER JOIN                                 */
/*//! -------------------------------------------------------------------------- */

Router.use("/customer/address", async (req, res, next) => {
  const query = {
    text: `SELECT first_name,last_name FROM customer INNER JOIN address ON customer.customer_id=address.address_id ORDER BY first_name ASC`
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
Router.get("/customer/address", (req, res) => {
  res.status(200).send(req.data);
  console.log("success !");
  client.end();
});

// ?/* -------------------------------------------------------------------------- */
// ?/*                                  LEFT JOIN                                 */
// ?/* -------------------------------------------------------------------------- */

Router.get("/left_join", async (req, res) => {
  const query = {
    text: `SELECT * FROM customer RIGHT JOIN address ON customer.customer_id=address.address_id WHERE customer.customer_id IS NULL`
  };
  try {
    const { rows } = await client.query(query);
    res.status(200).send(rows);
  } catch (e) {
    res.status(401).send(e);
  } finally {
    client.end();
  }
});

//* /* -------------------------------------------------------------------------- */
//* /*                                  SELF JOIN                                 */
//* /* -------------------------------------------------------------------------- */

Router.get("/film/self_join", async (req, res) => {
  try {
    const query = {
      text: `SELECT b.title title_1,a.title title_2,a.length FROM film a INNER JOIN film b ON a.film_id<>b.film_id AND a.length=b.length`
    };
    const { rows } = await client.query(query);
    res.status(201).send(rows);
    console.log("Success !");
  } catch (e) {
    res.status(401).send(e);
  } finally {
    client.end();
  }
});

// ?/* -------------------------------------------------------------------------- */
// ?/*                             FILM CATEGORY JOIN                             */
// ?/* -------------------------------------------------------------------------- */

Router.post("/film_category", async (req, res) => {
  try {
    const { film_category } = req.body;
    console.log(film_category);
    const query = {
      text: `SELECT category_id FROM category where category.name='${film_category}'`
    };
    const { rows: category } = await client.query(query);
    const category_id = category[0].category_id;
    console.log(category_id);
    const query1 = {
      text: `SELECT t5.title as Movie FROM (SELECT * FROM film t3 INNER JOIN (SELECT * FROM category t1 INNER JOIN film_category t2 ON t1.category_id=t2.category_id) t4 ON t3.film_id=t4.film_id) t5 where t5.category_id=${category_id}`
    };
    const { rows } = await client.query(query1);
    res.send(rows);
  } catch (e) {
    res.status(400).send(e);
  } finally {
    client.end();
  }
});

module.exports = { Router };
