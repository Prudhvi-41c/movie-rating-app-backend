import { createUser,loginUser } from "../controllers/auth"
import express from "express"

const router = express.Router()

router.post("/signup",createUser)
router.post("/login",loginUser)


export default router