import { pool } from "../database/pool";

// Get a limited number of members
export const fetchAllMembers = async () => {
  const query = "SELECT * FROM members LIMIT 5";
  const { rows } = await pool.query(query);
  return rows;
};

// Get a member by ID
export const fetchMemberById = async (id: string) => {
  const query = `
    SELECT member_id, first_name, surname 
    FROM members 
    WHERE member_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};

// Get a member by email
export const fetchMemberByEmail = async (email: string) => {
  const query = `
    SELECT member_id, first_name, surname 
    FROM members 
    WHERE email = $1
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};
