import { z } from "zod"

const SignupSchema = z.object({
    name: z.string({
        required_error: "Name is Required",
        invalid_type_error:"Name must be a string"
    }).min(4, {
        message:"Must be 4 characters or long"
    }),
    email: z.string({
        required_error: "email is Required",
        invalid_type_error:"email must be a string"
    }).email({
        message:"Invalid email address"
    }),
    password: z.string({
        required_error: "password is Required",
        invalid_type_error:" password must be a string"
    }).min(8, {
        message:"Must be 8 characters or long"
    }),
    confirm_password: z.string({
        required_error: "confirm password is Required",
        invalid_type_error:"confirm password must be a string"
    }).min(8, {
        message:"Must be 8 characters or long"
    })
})

type UserSignup = z.infer<typeof SignupSchema>

export { SignupSchema, UserSignup }