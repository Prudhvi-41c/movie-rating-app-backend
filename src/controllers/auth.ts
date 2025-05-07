import { UserSignup, SignupSchema, LoginSchema, UserLogin } from "../types";
import {  RequestHandler} from "express";
import { addUserToDb, fetchUserData } from "../models/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


 export const createUser :RequestHandler= async (req, res) =>{
    
        try {
       
        const reqData = SignupSchema.safeParse(req.body)
        if (reqData.success) {
            
            const parsedReqData:UserSignup = reqData.data
            if (parsedReqData.confirm_password != parsedReqData.password) {
                 res.status(400).json({
                    "message": "Passwords do not match ",
                     "field":"confirm_password"
                 })
            }

            const checkUserExist=await fetchUserData(parsedReqData.email)
            
            if (checkUserExist) {
                res.status(409).json({
                    "message": "Email Already Exist",
                    "field": "email"
                })
            } else {

                const newUser = await addUserToDb(parsedReqData);
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
             res.status(400).json({ errors });     
        }
    
    } catch (error) {
        
        res.status(500).json({"message":"Internal Server Error"})
      
   }

}




export const loginUser:RequestHandler = async (req, res) => {
        try {
        const reqData = LoginSchema.safeParse(req.body)
        if (reqData.success) {

            const parsedReqData: UserLogin = reqData.data
            
            const userData = await fetchUserData(parsedReqData.email)
            
            if (!userData) {
                res.status(401).json({
                    "message":"Email not registered."
                })
            }

            if (bcrypt.compareSync(parsedReqData.password, userData.password) ) {
                
                console.log(userData)

                const token = jwt.sign(
                    {
                        id: userData.id, 
                    },
                    process.env.JWT_SECRET_KEY as string,
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
            res.status(400).json({ errors });   
        }
    
   } catch (error) {
    res.status(500).json({"message":"Internal Server Error"})
   }
}




