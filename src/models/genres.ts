import pool from "../db/setup";

export const fetchGenreData = async () => {
  const query = "select * from genres";
  const res = await pool.query(query);
  return res.rows;
};
