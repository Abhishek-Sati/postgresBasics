const express = require("express");
const Router = express.Router();
const { client } = require("../index");

/*-------------------------------------------------------------------------- */
/*                                   INSERT DATA                             */
/*-------------------------------------------------------------------------- */

Router.use("/student", async (req, res, next) => {
  const query = {
    text: `insert into student (student_id,first_name,last_name,email) values ($1,$2,$3,$4)`,
    values: [
      req.body.id,
      req.body.first_name,
      req.body.last_name,
      req.body.email
    ]
  };
  client.query(query, async (err, result) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    const { rows } = await client.query(`select * from student`);
    req.rows = rows;
  });
  next();
});
Router.post("/student", async (req, res, next) => {
  console.table(req.rows);
  res.status(200).send(req.rows);
  client.end();
});
module.exports = { Router };
