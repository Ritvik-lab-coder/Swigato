import { z } from 'zod'

export const userSignupSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    contact: z.string().length(10, "Contact number must be of 10 digits only").regex(/^\d+$/, "\nContact number must contain only digits")
})

export type SignupInputState = z.infer<typeof userSignupSchema>

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export type LoginInputState = z.infer<typeof userLoginSchema>