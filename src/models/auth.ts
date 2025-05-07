
import { UserSignup } from "../types";
import pool from "../db/dbConfig";
import bcrypt from "bcrypt"

const salt = 10

export const addUserToDb = async (userData: UserSignup) => {
    
    const query = 'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *'
    const hashedPassword = bcrypt.hashSync(userData.password, salt)
    console.log(hashedPassword)
    const data=[userData.name,userData.email,hashedPassword]
    const res = await pool.query(query, data)
    return res.rows[0]
}

export const fetchUserData = async (email: UserSignup["email"]) => {
    const query = 'SELECT * FROM users where email= $1'
    const data = [email]
    const res = await pool.query(query, data)
    console.log(res.rowCount);
    return res.rows[0]   
}