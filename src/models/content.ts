import pool from "../db/setup";
import { Content } from "../types/content";

export const getSearchContent = async (query_value: string,typeId:number|null):Promise<Content[]> => {
    const query = `SELECT c.id, c.name, c.release_date, c.watch_time, c.description, c.poster, c.trailer_link, ct.type,COALESCE(AVG(r.stars)::NUMERIC(10,1), 0)::FLOAT AS average_rating 
                   FROM content c JOIN content_type ct ON c.type_id = ct.id 
                   LEFT JOIN reviews r ON c.id = r.content_id 
                   WHERE LOWER(c.name) LIKE $1 AND ( c.type_id=$2 OR $2 IS NULL)
                   GROUP BY c.id, c.name, c.release_date, c.watch_time, c.description, c.poster, c.trailer_link, ct.type`
    const data = [`%${query_value}%`,typeId]
    const res = await pool.query(query, data)
    return res.rows
    
}

export const getFilteredContent = async (typeId: number, genres: number[]):Promise<Content[]>=>{
    const query=`SELECT c.id,c.name,c.release_date,c.watch_time,c.description,c.poster,c.trailer_link,ct.type AS content_type,COALESCE(AVG(r.stars)::NUMERIC(10,1), 0)::FLOAT AS average_rating
                FROM content c JOIN content_type ct ON c.type_id = ct.id
                LEFT JOIN reviews r ON c.id = r.content_id
                JOIN content_genres cg ON c.id = cg.content_id
                WHERE c.type_id = $1 AND ( cardinality($2::int[]) = 0 OR cg.genre_id = ANY($2::int[]))
                GROUP BY c.id, ct.type`
    const data = [typeId, genres]
    const res = await pool.query(query, data)
    return res.rows
}