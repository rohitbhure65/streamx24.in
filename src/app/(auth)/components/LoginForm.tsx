"use client"
import { Form, FORM_ERROR } from "@/src/app/components/AuthForm"
import { useMutation } from "@blitzjs/rpc"
import { AuthenticationError, PromiseReturnType } from "blitz"
import type { Route } from "next"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import login from "../mutations/login"
import { Login } from "../validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
  emailDescription?: React.ReactNode
  passwordDescription?: React.ReactNode
}

export const LoginForm = ({ onSuccess, emailDescription, passwordDescription }: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")
  return (
    <Form
      submitText="Login"
      schema={Login}
      title="Login"
      headerDescription="Welcome back, gamer"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkHref="/signup"
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        try {
          await loginMutation(values)
          router.refresh()
          if (next) {
            router.push(next as Route)
          } else {
            router.push("/")
          }
        } catch (error: any) {
          if (error instanceof AuthenticationError) {
            const errorMessage = error.message || "Sorry, those credentials are invalid"
            return { [FORM_ERROR]: errorMessage }
          } else {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <LabeledTextField
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        description={emailDescription}
      />
      <LabeledTextField
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        description={passwordDescription}
      />
      <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot your password?
        </Link>
      </div>
    </Form>
  )
}
