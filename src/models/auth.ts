
import { UserSignup } from "../types/user_signup";
import pool from "../db/setup";


export const addUserToDb = async (userData: UserSignup) => {
    
    const query = 'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *'
    const data=[userData.name,userData.email,userData.password]
    const res = await pool.query(query, data)
    return res.rows[0]
}

export const fetchUserData = async (email: string) => {
    const query = 'SELECT * FROM users where email= $1'
    const data = [email]
    const res = await pool.query(query, data)
    return res.rows[0]   
}