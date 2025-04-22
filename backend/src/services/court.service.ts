import { pool } from "../database/pool";

export const fetchAllCourts = async () => {
  const query = "SELECT * FROM courts LIMIT 5";
  const { rows } = await pool.query(query);
  return rows;
};

export const fetchCourtById = async (id: string) => {
  const query = `
    SELECT court_id, court_name 
    FROM courts 
    WHERE court_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
