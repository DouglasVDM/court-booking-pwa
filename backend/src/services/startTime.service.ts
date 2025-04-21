import { pool } from "../database/pool";

export const fetchAllStartTimes = async () => {
  const query = `
    SELECT start_time_id, TO_CHAR(start_time, 'HH24:MI') AS start_time
    FROM start_times
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const fetchStartTimeById = async (id: string) => {
  const query = `
    SELECT start_time_id, TO_CHAR(start_time, 'HH24:MI') AS start_time
    FROM start_times
    WHERE start_time_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};