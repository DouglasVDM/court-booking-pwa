import express, { Request, Response } from "express";
const { pool } = require("../database_config/pool");

const router = express.Router();

// Helper function to format dates to remove the time
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns only the date part (YYYY-MM-DD)
};

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM bookings LIMIT 5";
    const { rows } = await pool.query(query);

    // Format date fields in the response
    const formattedRows = rows.map((row: any) => ({
      ...row,
      booked_at: row.booked_at ? formatDate(row.booked_at) : null,
      booking_date: row.booking_date ? formatDate(row.booking_date) : null,
    }));

    res.status(200).json(formattedRows);
    console.log("Success: Get all bookings");
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get bookings");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract bookings from the URL parameter
    const query = "SELECT * FROM bookings WHERE booking_id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`bookings id ${id} not found`);
    }

    // Format date fields in the response
    const formattedRow = {
      ...rows[0],
      booked_at: rows[0].booked_at ? formatDate(rows[0].booked_at) : null,
      booking_date: rows[0].booking_date
        ? formatDate(rows[0].booking_date)
        : null,
    };

    res.status(200).json(formattedRow);
    console.log(`Success: Get bookings by bookings_id ${id}`);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not get bookings by id");
  }
});

// Create a new booking
router.post("/", async (req, res) => {
  const {
    court_id,
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
  } = req.body;

  try {
    const query = `
      INSERT INTO bookings (court_id, member_id, booking_date, start_time_id, end_time_id, booking_type_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      court_id,
      member_id,
      booking_date,
      start_time_id,
      end_time_id,
      booking_type_id,
    ];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not create booking");
  }
});

// Update an existing booking
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    court_id,
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
  } = req.body;

  try {
    const query = `
      UPDATE bookings
      SET court_id = $1, member_id = $2, booking_date = $3, start_time_id = $4, end_time_id = $5, booking_type_id = $6
      WHERE booking_id = $7
      RETURNING *;
    `;
    const values = [
      court_id,
      member_id,
      booking_date,
      start_time_id,
      end_time_id,
      booking_type_id,
      id,
    ];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).send(`Booking ID ${id} not found`);
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not update booking");
  }
});

// Delete a booking by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM bookings WHERE booking_id = $1 RETURNING *;";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send(`Booking ID ${id} not found`);
    }

    res.status(200).send(`Booking ID ${id} deleted successfully`);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Could not delete booking");
  }
});

module.exports = router;
