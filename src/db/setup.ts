import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    max: 10,
    idleTimeoutMillis:10000,
})

async function testDbConnection(){
   try {
       const res = await pool.query('SELECT NOW()')
       console.log('Database is sucessfully connected ')
       console.log(res.rows[0].now);
   } catch (error) {
       console.log("Error in connecting to the database")
       console.log(error)
   }
}

testDbConnection()


export default pool;