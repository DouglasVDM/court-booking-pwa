import express, { Request, Response } from "express";
const { pool } = require("../database_config/pool");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM booking_types";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
    console.log("Success: Get all booking_types");
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get booking_types");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract booking_type from the URL parameter
    const query = "SELECT booking_type_id, booking_type_name FROM booking_types WHERE booking_type_id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`booking_type id ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get booking_type by booking_type_id ${id}`);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get booking_type by id");
  }
});

module.exports = router;
