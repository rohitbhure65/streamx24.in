import { FieldDescription, Input, Label } from "@/components/ui"
import { ErrorMessage } from "@hookform/error-message"
import React, { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledTextFieldProps
  extends PropsWithoutRef<React.JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<React.JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  description?: React.ReactNode
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, description, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div {...outerProps}>
        <Label {...labelProps} className="flex items-start flex-col">
          {label}
          <Input
            className="pl-4! placeholder:text-gray-400"
            disabled={isSubmitting}
            {...register(name)}
            {...props}
          />
        </Label>

        {description && <FieldDescription>{description}</FieldDescription>}

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: "red" }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />
      </div>
    )
  }
)

LabeledTextField.displayName = "LabeledTextField"

export default LabeledTextField
