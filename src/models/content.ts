import pool from "../db/setup";



export const getSearchContent = async (query_value: string) => {
    const query = `SELECT c.id, c.name, c.release_date, c.watch_time, c.description, c.poster, c.trailer_link, ct.type, AVG(r.stars) AS average_rating 
                   FROM content c JOIN content_type ct ON c.type_id = ct.id 
                   LEFT JOIN reviews r ON c.id = r.content_id 
                   WHERE LOWER(c.name) LIKE $1 
                   GROUP BY c.id, c.name, c.release_date, c.watch_time, c.description, c.poster, c.trailer_link, ct.type`
    const data = [`%${query_value}%`]
    const res = await pool.query(query, data)
    return res.rows
    
}

export const getFilteredContent = async (typeId: number, genres: number[])=>{
    const query=`SELECT c.id,c.name,c.release_date,c.watch_time,c.description,c.poster,c.trailer_link,ct.type AS content_type,COALESCE(AVG(r.stars), 0) AS average_rating
                FROM content c
                JOIN content_type ct ON c.type_id = ct.id
                LEFT JOIN reviews r ON c.id = r.content_id
                JOIN content_genres cg ON c.id = cg.content_id
                WHERE c.type_id = $1
                AND (
                    cardinality($2::int[]) = 0 OR cg.genre_id = ANY($2::int[])
                )
                GROUP BY c.id, ct.type;
`
    const data = [typeId, genres]
    
    const res = await pool.query(query, data)
    return res.rows
}