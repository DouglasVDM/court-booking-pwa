import { pool } from "../database/pool";

// Get all bookings
export const fetchAllBookings = async () => {
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
      s.start_time_id,
      TO_CHAR(e.end_time, 'HH24:MI') AS end_time,
      e.end_time_id,
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
    LIMIT 4;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const fetchBookingById = async (id: string) => {
  const query = "SELECT * FROM bookings WHERE booking_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};

export const createBooking = async (data: any) => {
  const {
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
    court_id,
  } = data;

  // Check for conflicts
  const conflictQuery = `
    SELECT * FROM bookings 
    WHERE court_id = $1 
      AND booking_date = $2 
      AND (
        (start_time_id <= $3 AND end_time_id > $3) OR 
        (start_time_id < $4 AND end_time_id >= $4)
      )
  `;
  const { rows: conflicts } = await pool.query(conflictQuery, [
    court_id,
    booking_date,
    start_time_id,
    end_time_id,
  ]);
  if (conflicts.length > 0) {
    throw new Error("The court is already booked for the selected time slot.");
  }

  const insertQuery = `
    INSERT INTO bookings 
    (member_id, booking_date, start_time_id, end_time_id, booking_type_id, court_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const { rows } = await pool.query(insertQuery, [
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
    court_id,
  ]);
  return rows[0];
};

export const updateBooking = async (id: string, data: any) => {
  const {
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
    court_id,
  } = data;

  const query = `
    UPDATE bookings
    SET member_id = $1, booking_date = $2, start_time_id = $3, end_time_id = $4, booking_type_id = $5, court_id = $6
    WHERE booking_id = $7
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    member_id,
    booking_date,
    start_time_id,
    end_time_id,
    booking_type_id,
    court_id,
    id,
  ]);
  return rows[0] || null;
};

export const deleteBooking = async (id: string) => {
  const query = "DELETE FROM bookings WHERE booking_id = $1 RETURNING *;";
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
