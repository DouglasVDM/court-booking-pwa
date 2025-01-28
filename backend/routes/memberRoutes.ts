import express, { Request, Response } from "express";
const { pool } = require("../database_config/pool");

const router = express.Router();

// Get a limited number of members (default 5)
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM members LIMIT 5";
    const { rows } = await pool.query(query);

    res.status(200).json(rows);
    console.log("Success: Get all members");
  } catch (err) {
    console.error("Error fetching members:", (err as Error).message);
    res.status(500).send("Could not get members");
  }
});

// Get a member by their ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract member_id from the URL parameter

    // Validate ID format
    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid member ID format");
    }

    const query = "SELECT member_id, member_name FROM members WHERE member_id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`Member ID ${id} not found`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get member by member_id ${id}`);
  } catch (err) {
    console.error("Error fetching member by ID:", (err as Error).message);
    res.status(500).send("Could not get member by ID");
  }
});

// Get a member by their email
router.get("/email/:email", async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    // Validate email format
    if (!email || !email.includes("@")) {
      return res.status(400).send("Invalid email format");
    }

    const query = "SELECT member_id, member_name FROM members WHERE email = $1";
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).send(`No member found with email: ${email}`);
    }

    res.status(200).json(rows[0]);
    console.log(`Success: Get member by email ${email}`);
  } catch (err) {
    console.error("Error fetching member by email:", (err as Error).message);
    res.status(500).send("Could not get member by email");
  }
});

module.exports = router;
