"use client"
import { Form, FORM_ERROR } from "@/src/app/components/AuthForm"
import { LocationSelector } from "@/src/app/components/LocationSelector"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import signup from "../mutations/signup"
import { Signup } from "../validations"

type SignupFormProps = {
  onSuccess?: () => void
  nameDescription?: React.ReactNode
  emailDescription?: React.ReactNode
  mobileDescription?: React.ReactNode
  passwordDescription?: React.ReactNode
  countryDescription?: React.ReactNode
  stateDescription?: React.ReactNode
  cityDescription?: React.ReactNode
}

export const SignupForm = ({
  onSuccess,
  nameDescription = "Please enter your full name",
  emailDescription = "your email must be in a valid format",
  mobileDescription = "your mobile number must be 10 digits long",
  passwordDescription = "Your password must be at least 8 characters long",
  countryDescription = "Your country is set to India",
  stateDescription = "Please select your state",
  cityDescription = "Please select your city",
}: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const router = useRouter()
  const [referCode, setReferCode] = useState("")
  const [location, setLocation] = useState<{
    country: "India"
    state: string
    city: string
  }>({
    country: "India",
    state: "",
    city: "",
  })
  const [locationErrors, setLocationErrors] = useState<{
    country?: string
    state?: string
    city?: string
  }>({})

  const handleLocationChange = useCallback(
    (data: { country: string; state: string; city: string }) => {
      setLocation({
        country: "India",
        state: data.state,
        city: data.city,
      })
      // Clear errors when user makes changes
      setLocationErrors({})
    },
    []
  )

  return (
    <Form
      submitText="Create Account"
      schema={Signup}
      title="Create Account"
      headerDescription="Register a new User account below"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
      initialValues={{
        name: "",
        email: "",
        mobileNumber: "",
        password: "",
        country: "India",
        state: "",
        city: "",
      }}
      onSubmit={async (values) => {
        try {
          const result = await signupMutation({
            ...values,
            country: location.country,
            state: location.state,
            city: location.city,
          })
          setReferCode(result.user.referCode)
          router.refresh()
        } catch (error: any) {
          if (error.code === "P2002") {
            if (error.meta?.target?.includes("email")) {
              return { email: "This email is already being used" }
            }
            if (error.meta?.target?.includes("mobileNumber")) {
              return { mobileNumber: "This mobile number is already being used" }
            }
          } else if (error.name === "ZodError") {
            // Handle Zod validation errors for location
            const fieldErrors: any = {}
            error.errors.forEach((err: any) => {
              if (err.path.includes("country")) {
                fieldErrors.country = err.message
              }
              if (err.path.includes("state")) {
                fieldErrors.state = err.message
              }
              if (err.path.includes("city")) {
                fieldErrors.city = err.message
              }
            })
            setLocationErrors(fieldErrors)
            return { [FORM_ERROR]: "Please fix the errors above" }
          } else {
            return { [FORM_ERROR]: error.toString() }
          }
        }
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <LabeledTextField
        name="name"
        label="Name"
        placeholder="Enter your name"
        description={nameDescription}
      />
      <LabeledTextField
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        description={emailDescription}
      />
      <LabeledTextField
        name="mobileNumber"
        label="Mobile Number"
        placeholder="Enter your mobile number"
        type="text"
        description={mobileDescription}
      />
      <LabeledTextField
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        description={passwordDescription}
      />

      <LocationSelector
        onLocationChange={handleLocationChange}
        errors={locationErrors}
        initialValues={location}
        countryDescription={countryDescription}
        stateDescription={stateDescription}
        cityDescription={cityDescription}
      />
    </Form>
  )
}
