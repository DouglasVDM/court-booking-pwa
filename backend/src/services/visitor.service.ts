import { pool } from "../database/pool";

export const fetchAllVisitors = async () => {
  const query = "SELECT * FROM visitors LIMIT 5";
  const { rows } = await pool.query(query);
  return rows;
};

export const fetchVisitorById = async (id: string) => {
  const query = `
    SELECT visitor_id, visitor_name
    FROM visitors
    WHERE visitor_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
