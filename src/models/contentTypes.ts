import pool from "../db/setup";
import { ContentTypeData } from "../types/contentType";
export const getTypeId = async (type: string): Promise<ContentTypeData> => {
  const query = "SELECT * FROM content_type WHERE type=$1";
  const data = [type];
  const res = await pool.query(query, data);
  return res.rows[0];
};
