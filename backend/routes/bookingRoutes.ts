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
    const query = `
    SELECT 
          b.booking_id,
          b.member_id,
          m.first_name,
          m.surname,
          TO_CHAR(b.booked_at, 'YYYY-MM-DD HH24:MI') AS booked_at,
          TO_CHAR(b.booking_date, 'YYYY-MM-DD') AS booking_date,
          TO_CHAR(b.booking_date, 'FMDay') AS day_name,
          TO_CHAR(s.start_time, 'HH24:MI') AS start_time,
          TO_CHAR(e.end_time, 'HH24:MI') AS end_time,
          b.booking_type_id,
          bt.booking_type_name,
          b.court_id,
          c.court_name
      FROM bookings b
      JOIN start_times s ON b.start_time_id = s.start_time_id
      JOIN end_times e ON b.end_time_id = e.end_time_id
      JOIN courts c ON b.court_id = c.court_id
      JOIN booking_types bt ON b.booking_type_id = bt.booking_type_id
      JOIN members m ON b.member_id = m.member_id
      ORDER BY b.booking_date DESC, b.booking_id
      LIMIT 4;`;

    const { rows } = await pool.query(query);

    res.status(200).json(rows);
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
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
    court_id,
  } = req.body;

  console.log(req.body);

  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 14); // 2 weeks into the future

  const requestedDate = new Date(booking_date);

  // Check: Booking date cannot be more than 2 weeks into the future
  if (requestedDate > twoWeeksLater) {
    return res.status(400).json({
      message: "You cannot book a court more than 2 weeks in advance.",
    });
  }

  try {
    // Query DB to check last booking within the past 2 weeks
    const recentBookings = await pool.query(
      `
    SELECT MAX(booking_date) AS last_booking_date
    FROM bookings
    WHERE member_id = $1 AND booking_date >= CURRENT_DATE - INTERVAL '14 days'
    `,
      [member_id]
    );

    if (recentBookings.rows[0].last_booking_date) {
      const nextEligibleDate = new Date(
        recentBookings.rows[0].last_booking_date
      );
      nextEligibleDate.setDate(nextEligibleDate.getDate() + 14); // Add 14 days to last booking date

      // Check: Booking date must not be before the next eligible date
      if (requestedDate < nextEligibleDate) {
        return res.status(400).json({
          message: `You can only book once every 2 weeks. Your next eligible date is ${
            nextEligibleDate.toISOString().split("T")[0]
          }.`,
        });
      }
    }

    // Check for existing booking
    const checkQuery = `
          SELECT * FROM bookings 
          WHERE court_id = $1 
            AND booking_date = $2 
            AND (
              (start_time_id <= $3 AND end_time_id > $3) OR 
              (start_time_id < $4 AND end_time_id >= $4)
              )
        `;
    const { rows } = await pool.query(checkQuery, [
      court_id,
      booking_date,
      start_time_id,
      end_time_id,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({
        error: "The court is already booked for the selected time slot.",
      });
    }

    // Insert booking if no conflict
    const insertQuery = `
              INSERT INTO bookings (member_id, booking_date, start_time_id, end_time_id, booking_type_id, court_id)
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING *;
            `;
    const result = await pool.query(insertQuery, [
      member_id,
      booking_date,
      start_time_id,
      end_time_id,
      booking_type_id,
      court_id,
    ]);

    res.status(201).json(result.rows[0]);
    console.log("Booking created successfully!");
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).send("Failed not create booking");
  }
});

// Update an existing booking
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
    court_id,
  } = req.body;

  try {
    const query = `
      UPDATE bookings
      SET member_id = $1, booking_date = $2, start_time_id = $3, end_time_id = $4, booking_type_id = $5,court_id = $6 
      WHERE booking_id = $7
      RETURNING *;
    `;
    const values = [
      member_id,
      booking_date,
      start_time_id,
      end_time_id,
      booking_type_id,
      court_id,
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
