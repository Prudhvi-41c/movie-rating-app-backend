import { Pool } from 'pg';
require('dotenv').config()

const pool = new Pool({
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    max: 10,
    idleTimeoutMillis:10000,
})

export default pool;