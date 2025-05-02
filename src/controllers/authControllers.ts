
import { userSignup } from "../types";
import pool from "../db/dbConfig";
const bcrypt = require('bcrypt');

const salt=10

export const createUser = async (userData: userSignup) => {
    
    const query = 'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *'
    const hashedPassword = bcrypt.hashSync(userData.password, salt)
    console.log(hashedPassword)
    const data=[userData.name,userData.email,hashedPassword]
    const res = await pool.query(query, data)
    return res.rows[0]
}


export const ifUserExist = async (email: userSignup["email"]) => {
    const query = 'SELECT * FROM users where email= $1'
    const data = [email]
    const res = await pool.query(query, data)
    console.log(res.rowCount);
    return res.rowCount
    
    
}

