import express, { Request, Response } from "express";
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM courts LIMIT 5";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all courts");
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get courts");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract court from the URL parameter
    const query = "SELECT court_id, court_name FROM courts WHERE court_id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`court id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get court by court_id ${id}`);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get court by id");
  }
});

module.exports = router;
