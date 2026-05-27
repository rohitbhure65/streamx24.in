import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  FieldDescription,
  FieldError,
} from "@/components/ui/index"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import React, { PropsWithoutRef, ReactNode, useState } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { z } from "zod"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<React.JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
  footerText?: string
  footerLinkText?: string
  footerLinkHref?: string
  title?: string
  headerDescription?: string
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  footerText,
  footerLinkText,
  footerLinkHref,
  title = "Login to your account",
  headerDescription = "Enter your email below to login to your account",
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? (zodResolver(schema) as any) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <div className="flex justify-center bg-background items-center min-h-screen">
      <Card style={{ padding: "1em" }} className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {headerDescription && <CardDescription>{headerDescription}</CardDescription>}
        </CardHeader>
        <FormProvider {...ctx}>
          <form
            onSubmit={ctx.handleSubmit(async (values) => {
              const result = (await onSubmit(values)) || {}
              for (const [key, value] of Object.entries(result)) {
                if (key === FORM_ERROR) {
                  setFormError(value)
                } else {
                  ctx.setError(key as any, {
                    type: "submit",
                    message: value,
                  })
                }
              }
            })}
            className="form"
            {...props}
          >
            {/* Form fields supplied as children are rendered here */}
            {children}

            {formError && (
              <FieldError role="alert" style={{ color: "red" }}>
                {formError}
              </FieldError>
            )}

            {submitText && (
              <Button type="submit" disabled={ctx.formState.isSubmitting}>
                {submitText}
              </Button>
            )}
          </form>
        </FormProvider>
        {(footerText || footerLinkText) && (
          <FieldDescription className="px-6 text-center">
            {footerText}{" "}
            {footerLinkHref && footerLinkText ? (
              <Link href={footerLinkHref as any}>{footerLinkText}</Link>
            ) : (
              footerLinkText
            )}
          </FieldDescription>
        )}
      </Card>
    </div>
  )
}

export default Form
