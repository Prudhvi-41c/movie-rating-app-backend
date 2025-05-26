import pool from "../db/setup";

export const getTypeId = async (type: string) => {
  const query = "SELECT id FROM content_type WHERE type=$1";
  const data = [type];
  const res = await pool.query(query, data);
  return res.rows[0];
};
