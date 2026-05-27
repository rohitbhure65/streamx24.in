import { z } from "zod"
import { INDIA_STATES, getCitiesForState } from "src/data/indiaLocations"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

// Cast INDIA_STATES to the tuple type that z.enum() requires
const statesEnum = INDIA_STATES as [string, ...string[]]

// Mobile number validation: must be exactly 10 digits, Indian format
export const mobileNumber = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits")

export const Signup = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email,
  mobileNumber,
  password,
  country: z.literal("India", { message: "Country must be India" }),
  state: z.enum(statesEnum, { message: "Please select a valid state" }),
  city: z.string().min(1, "City is required"),
}).refine((data) => {
  const validCities = getCitiesForState(data.state)
  return validCities.includes(data.city)
}, {
  message: "City does not belong to selected state",
  path: ["city"],
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
