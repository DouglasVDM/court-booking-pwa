import express, { Request, Response } from "express";
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT to_char(start_time, 'HH24:MI') AS start_time FROM start_times";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all time slots");
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get time slots");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract court from the URL parameter
    const query = "SELECT * FROM start_times WHERE id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`time slot id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get time slot by id ${id}`);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get time slot by id");
  }
});

module.exports = router;
