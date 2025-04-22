import { pool } from "../database/pool";

export const fetchAllEndTimes = async () => {
  const query = `
    SELECT end_time_id, TO_CHAR(end_time, 'HH24:MI') AS end_time
    FROM end_times
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const fetchEndTimeById = async (id: string) => {
  const query = `
    SELECT end_time_id, TO_CHAR(end_time, 'HH24:MI') AS end_time
    FROM end_times
    WHERE end_time_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
