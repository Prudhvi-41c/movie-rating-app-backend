import { ZodError } from "zod";
import { userSignup, SignupSchema } from "../types";
import { Request, Response } from "express";
import { createUser,ifUserExist } from "../controllers/authControllers";

const express = require("express")
const router = express.Router()

router.post("/signup", async function (req: Request, res: Response) {

    try {
       
        const reqData = SignupSchema.safeParse(req.body)
        if (reqData.success) {
            
            const userData = reqData.data
            if (userData.confirm_password != userData.password) {
                res.status(400).json({
                    "message": "Passwords do not match ",
                     "field":"confirm_password"
                 })
            }

            const checkUserExist=await ifUserExist(userData.email)
            
            if (checkUserExist) {
                res.status(409).json({
                    "message": "Email Already Exist",
                    "field": "email"
                })
            } else {

                const newUser = await createUser(userData);
                res.status(201).json({
                    "message": "User registered successfully.",
                    "email": newUser.email
                })
            }

    
        } else {
            const errors = reqData.error.errors.map((zodError) => ({
                message: zodError.message,
                field: zodError.path[0]
            }));
            return res.status(400).json({ errors });     
        }
    
    } catch (error) {
        
        res.status(500).json({"message":"Internal Server Error"})
      
   }
})



router.post("/login", function (req: Request, res: Response) {
    console.log("login API")
})






module.exports=router