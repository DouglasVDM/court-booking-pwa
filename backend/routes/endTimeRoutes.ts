import express, { Request, Response } from "express";
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT to_char(end_time, 'HH24:MI') AS end_time FROM end_times";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all end times");
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get end times");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract court from the URL parameter
    const query = "SELECT * FROM end_times WHERE id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`end time id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get end time by id ${id}`);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get end time by id");
  }
});

module.exports = router;
