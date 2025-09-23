import { pool } from "../database/pool";

// Helper function to create the tsrange string
const _createBookingTimeRange = (booking_date: string, start_time: string, end_time: string) => {
  const startTimestamp = `${booking_date} ${start_time}:00`;
  const endTimestamp = `${booking_date} ${end_time}:00`;
  return `[${startTimestamp}, ${endTimestamp})`;
};

// Get all bookings
export const fetchAllBookings = async () => {
  const query = `
    SELECT 
      b.booking_id,
      b.member_id,
      m.first_name,
      m.surname,
      TO_CHAR(b.booked_at, 'YYYY-MM-DD HH24:MI') AS booked_at,
      -- Extract the date from the new booking_time_range column
      TO_CHAR(LOWER(b.booking_time_range), 'YYYY-MM-DD') AS booking_date,
      -- Extract the day name from the new booking_time_range column
      TO_CHAR(LOWER(b.booking_time_range), 'FMDay') AS day_name,
      -- Extract the start time from the new booking_time_range column
      TO_CHAR(LOWER(b.booking_time_range), 'HH24:MI') AS start_time,
      -- Extract the end time from the new booking_time_range column
      TO_CHAR(UPPER(b.booking_time_range), 'HH24:MI') AS end_time,
      b.booking_type_id,
      bt.booking_type_name,
      b.court_id,
      c.court_name
    FROM bookings b
    -- Removed joins to start_times and end_times tables
    JOIN courts c ON b.court_id = c.court_id
    JOIN booking_types bt ON b.booking_type_id = bt.booking_type_id
    JOIN members m ON b.member_id = m.member_id
    ORDER BY LOWER(b.booking_time_range) DESC, b.booking_id
    LIMIT 9;
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
  try {
    const {
      member_id,
      booking_date,
      start_time,
      end_time,
      booking_type_id,
      court_id,
    } = data;

    const bookingTimeRange = _createBookingTimeRange(booking_date, start_time, end_time);

    const insertQuery = `
    INSERT INTO bookings 
    (member_id, court_id, booking_type_id, booking_time_range)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

    const queryValues = [
      member_id,
      court_id,
      booking_type_id,
      bookingTimeRange
    ];

    const { rows } = await pool.query(insertQuery, queryValues);
    return rows[0];
  } catch (err: any) {
    if (err.message.includes("exclude_overlapping_bookings")) {
      throw new Error('The court is already for the selected time slot.');
    }
    throw err;
  }
};

export const updateBooking = async (id: string, data: any) => {
  try {
    const {
      member_id,
      booking_date,
      start_time,
      end_time,
      booking_type_id,
      court_id,
    } = data;

    const bookingTimeRange = _createBookingTimeRange(booking_date, start_time, end_time);

    const query = `
    UPDATE bookings
    SET 
      member_id = $1, 
      court_id = $2,
      booking_type_id = $3, 
      booking_time_range = $4
    WHERE booking_id = $5
    RETURNING *;
  `;
    const { rows } = await pool.query(query, [
      member_id,
      court_id,
      booking_type_id,
      bookingTimeRange,
      id
    ]);
    return rows[0] || null;
  } catch (err: any) {
    if (err.message.includes("exclude_overlapping_bookings")) {
      throw new Error(`The court is already booked for the selected time slot.`);
    }
    throw err;
  }
};

export const deleteBooking = async (id: string) => {
  const query = "DELETE FROM bookings WHERE booking_id = $1 RETURNING *;";
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
