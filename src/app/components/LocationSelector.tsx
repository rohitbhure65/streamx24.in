"use client"

import {
  FieldDescription,
  FieldError,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { INDIA_STATES, getCitiesForState } from "src/data/indiaLocations"

interface LocationSelectorProps {
  onLocationChange: (data: { country: string; state: string; city: string }) => void
  errors?: {
    country?: string
    state?: string
    city?: string
  }
  initialValues?: {
    country?: string
    state?: string
    city?: string
  }
  countryDescription?: React.ReactNode
  stateDescription?: React.ReactNode
  cityDescription?: React.ReactNode
}

const triggerClass = (hasError: boolean, disabled = false) =>
  [
    "w-full h-12 rounded-lg text-sm",
    "pl-4 [&>span]:pl-1",
    "border-none outline-none shadow-none focus:ring-0",
    "transition-all duration-300",
    disabled ? "cursor-not-allowed opacity-50" : "",
  ].join(" ")

export function LocationSelector({
  onLocationChange,
  errors = {},
  initialValues = {},
  countryDescription = "Your country is set to India",
  stateDescription = "Please select your state",
  cityDescription = "Please select your city",
}: LocationSelectorProps) {
  const { setValue } = useFormContext()
  const [country, setCountry] = useState(initialValues.country || "India")
  const [state, setState] = useState(initialValues.state || "")
  const [city, setCity] = useState(initialValues.city || "")

  const prevLocation = useRef({ country, state, city })

  useEffect(() => {
    if (
      prevLocation.current.country !== country ||
      prevLocation.current.state !== state ||
      prevLocation.current.city !== city
    ) {
      onLocationChange({ country, state, city })
      prevLocation.current = { country, state, city }
    }
  }, [country, state, city, onLocationChange])

  const handleStateChange = (newState: string) => {
    setState(newState)
    setCity("")
    setValue("state", newState, { shouldValidate: true })
    setValue("city", "", { shouldValidate: false })
  }

  const handleCityChange = (newCity: string) => {
    setCity(newCity)
    setValue("city", newCity, { shouldValidate: true })
  }

  const availableCities = state ? getCitiesForState(state) : []

  return (
    <div className="flex flex-col gap-4">
      {/* Country Field */}
      <div>
        <Label htmlFor="country" className="block text-sm font-medium mb-2">
          Country
        </Label>
        <Select value={country} disabled>
          <SelectTrigger id="country" className={triggerClass(!!errors.country, true)}>
            <SelectValue placeholder="Select a Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="pl-4!">Countries</SelectLabel>
              <SelectItem value="India" className="pl-4!">
                India
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {countryDescription && <FieldDescription>{countryDescription}</FieldDescription>}
        {errors.country && <FieldError>{errors.country}</FieldError>}
      </div>

      {/* State Field */}
      <div>
        <Label htmlFor="state" className="block text-sm font-medium mb-2">
          State <span className="text-red-500">*</span>
        </Label>
        <Select value={state} onValueChange={handleStateChange}>
          <SelectTrigger
            id="state"
            className={triggerClass(!!errors.state)}
            style={{
              boxShadow: state && !errors.state ? "0 0 10px rgba(124, 58, 237, 0.3)" : "none",
            }}
          >
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-60 overflow-y-auto">
              <SelectLabel className="pl-4!">States</SelectLabel>
              {INDIA_STATES.map((s) => (
                <SelectItem key={s} value={s} className="pl-4!">
                  {s}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {stateDescription && <FieldDescription>{stateDescription}</FieldDescription>}
        {errors.state && <FieldError>{errors.state}</FieldError>}
      </div>

      {/* City Field */}
      <div>
        <Label htmlFor="city" className="block text-sm font-medium mb-2">
          City <span className="text-red-500">*</span>
        </Label>
        <Select value={city} onValueChange={handleCityChange} disabled={!state}>
          <SelectTrigger
            id="city"
            className={triggerClass(!!errors.city, !state)}
            style={{
              boxShadow:
                state && city && !errors.city ? "0 0 10px rgba(124, 58, 237, 0.3)" : "none",
            }}
          >
            <SelectValue placeholder={!state ? "Select State First" : "Select City"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-60 overflow-y-auto">
              <SelectLabel className="pl-4!">Cities</SelectLabel>
              {availableCities.map((c) => (
                <SelectItem key={c} value={c} className="pl-4!">
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {cityDescription && <FieldDescription>{cityDescription}</FieldDescription>}
        {errors.city && <FieldError>{errors.city}</FieldError>}
      </div>
    </div>
  )
}
