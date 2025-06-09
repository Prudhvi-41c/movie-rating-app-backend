import pool from "../db/setup";
import { ContentTypeData } from "../types/contentType";
export const getContentTypeData = async (type: string): Promise<ContentTypeData | undefined> => {
  const query = "SELECT * FROM content_type WHERE type=$1";
  const data = [type];
  const res = await pool.query(query, data);
  if (res.rowCount) {
    return res.rows[0];
  } else {
    return undefined;
  }
};
