import { z } from "zod"
import { SignupSchema } from "./user_signup"

const LoginSchema = SignupSchema.pick({
    email: true,
    password:true
})

type UserLogin = z.infer<typeof LoginSchema>

export {LoginSchema,UserLogin}