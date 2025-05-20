import { Request, Response } from "express"
import express from "express";
import authRoutes from "./routes/auth"
import dotenv from 'dotenv'
dotenv.config()



const app = express()
const port = 3000

app.use(express.json())


app.get('/', (req:Request, res:Response) => {
    res.status(200).json({"message": 'Hello from server'})
})


app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
