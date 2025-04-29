import express from "express";
import pool from "./db/dbConfig";

const app = express()
const port = 3000


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

app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
