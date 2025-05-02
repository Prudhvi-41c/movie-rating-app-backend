import { ZodError } from "zod";
import { userSignup, SignupSchema, LoginSchema, userLogin } from "../types";
import { Request, Response } from "express";
import { createUser, fetchUserData } from "../controllers/authControllers";
require('dotenv').config()

const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

router.post("/signup", async function (req: Request, res: Response) {

    try {
       
        const reqData = SignupSchema.safeParse(req.body)
        if (reqData.success) {
            
            const userData:userSignup = reqData.data
            if (userData.confirm_password != userData.password) {
                res.status(400).json({
                    "message": "Passwords do not match ",
                     "field":"confirm_password"
                 })
            }

            const checkUserExist=await fetchUserData(userData.email)
            
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



router.post("/login", async function (req: Request, res: Response) {
    try {
        const reqData = LoginSchema.safeParse(req.body)
        if (reqData.success) {

            const loginData: userLogin = reqData.data
            
            const userData = await fetchUserData(loginData.email)
            
            if (!userData) {
                res.status(401).json({
                    "message":"Email not registered."
                })
            }

            if (bcrypt.compareSync(loginData.password, userData.password) ) {
                
                console.log(userData)

                const token = jwt.sign(
                    {
                        id: userData.id, 
                    },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn:'1h'
                    }

                )

                res.status(200).json({
                    "message": "Login Sucessful",
                    "token": token,
                    "user": {
                        "id": userData.id,
                        "name": userData.name,
                        "email":userData.email
                    }
                })
                

                
            } else {
                res.status(401).json({
                    "message":"Incorrect password"
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






module.exports=router