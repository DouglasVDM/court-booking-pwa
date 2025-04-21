import { pool } from "../database/pool";

export const fetchAllBookingTypes = async () => {
  const query = "SELECT * FROM booking_types LIMIT 4";
  const { rows } = await pool.query(query);
  return rows;
};

export const fetchBookingTypeById = async (id: string) => {
  const query = `
    SELECT booking_type_id, booking_type_name 
    FROM booking_types 
    WHERE booking_type_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
