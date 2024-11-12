import express, { Request, Response } from "express";
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT * FROM visitors LIMIT 5";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all visitors");
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get visitors");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract visitor_id from the URL parameter
    const query =
      "SELECT visitor_id, visitor_name FROM visitors WHERE visitor_id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`visitor id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get visitor by visitor_id ${id}`);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get visitor by id");
  }
});

module.exports = router;
