import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type SignupFormValues = {
  firstName: string
  lastName: string
  email: string
  phoneLocal: string
  countryCode: string
  yearOfBirth: string
  password: string
  confirmPassword: string
  referralCode: string
  consentTermsOfService: boolean
  consentPrivacyPolicy: boolean
}

type SignupFormProps = {
  defaultValues?: Partial<SignupFormValues>
  submitLabel?: string
  className?: string
  errorMessage?: string | null
  onSubmit: (values: SignupFormValues) => Promise<void> | void
}

const CURRENT_YEAR = new Date().getFullYear()
const MIN_YEAR = 1900

function initialValues(defaultValues?: Partial<SignupFormValues>): SignupFormValues {
  return {
    firstName: defaultValues?.firstName ?? "",
    lastName: defaultValues?.lastName ?? "",
    email: defaultValues?.email ?? "",
    phoneLocal: defaultValues?.phoneLocal ?? "",
    countryCode: defaultValues?.countryCode ?? "+91",
    yearOfBirth: defaultValues?.yearOfBirth ?? "",
    password: defaultValues?.password ?? "",
    confirmPassword: defaultValues?.confirmPassword ?? "",
    referralCode: defaultValues?.referralCode ?? "",
    consentTermsOfService: defaultValues?.consentTermsOfService ?? false,
    consentPrivacyPolicy: defaultValues?.consentPrivacyPolicy ?? false,
  }
}

export function SignupForm({
  defaultValues,
  submitLabel = "Create account",
  className,
  errorMessage,
  onSubmit,
}: SignupFormProps) {
  const [formData, setFormData] = useState<SignupFormValues>(() => initialValues(defaultValues))
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const yearOptions = useMemo(() => {
    const years: string[] = []
    for (let year = CURRENT_YEAR; year >= MIN_YEAR; year -= 1) {
      years.push(String(year))
    }
    return years
  }, [])

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!formData.firstName.trim()) errors.firstName = "First name is required"
    if (!formData.lastName.trim()) errors.lastName = "Last name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email address"

    const phoneDigits = formData.phoneLocal.replace(/\D/g, "")
    if (!phoneDigits) errors.phoneLocal = "Phone number is required"
    else if (phoneDigits.length !== 10) errors.phoneLocal = "Phone number must be 10 digits"

    if (!formData.yearOfBirth) errors.yearOfBirth = "Year of birth is required"
    else {
      const year = Number(formData.yearOfBirth)
      if (!Number.isInteger(year) || year < MIN_YEAR || year > CURRENT_YEAR) {
        errors.yearOfBirth = "Invalid year of birth"
      }
    }

    if (!formData.password) errors.password = "Password is required"
    else if (formData.password.length < 8) errors.password = "Password must be at least 8 characters"
    if (!formData.confirmPassword) errors.confirmPassword = "Confirm password is required"
    else if (formData.confirmPassword !== formData.password) errors.confirmPassword = "Passwords do not match"

    if (!formData.consentTermsOfService) errors.consentTermsOfService = "You must accept Terms of Service"
    if (!formData.consentPrivacyPolicy) errors.consentPrivacyPolicy = "You must accept Privacy Policy"

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target
    const checked = "checked" in event.target ? event.target.checked : false
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }))
    setFieldErrors((previous) => {
      if (!previous[name]) return previous
      const next = { ...previous }
      delete next[name]
      return next
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1 text-left">
          <label htmlFor="firstName" className="text-sm font-medium leading-none">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={cn(fieldErrors.firstName && "border-red-500 focus-visible:ring-red-500")}
          />
          {fieldErrors.firstName && <p className="text-xs text-red-500">{fieldErrors.firstName}</p>}
        </div>
        <div className="space-y-1 text-left">
          <label htmlFor="lastName" className="text-sm font-medium leading-none">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={cn(fieldErrors.lastName && "border-red-500 focus-visible:ring-red-500")}
          />
          {fieldErrors.lastName && <p className="text-xs text-red-500">{fieldErrors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-1 text-left">
        <label htmlFor="email" className="text-sm font-medium leading-none">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className={cn(fieldErrors.email && "border-red-500 focus-visible:ring-red-500")}
        />
        {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1 text-left">
          <label htmlFor="phoneLocal" className="text-sm font-medium leading-none">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center w-[70px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
              {formData.countryCode}
            </div>
            <Input
              id="phoneLocal"
              name="phoneLocal"
              type="tel"
              value={formData.phoneLocal}
              onChange={handleInputChange}
              className={cn("flex-1", fieldErrors.phoneLocal && "border-red-500 focus-visible:ring-red-500")}
            />
          </div>
          {fieldErrors.phoneLocal && <p className="text-xs text-red-500">{fieldErrors.phoneLocal}</p>}
        </div>

        <div className="space-y-1 text-left">
          <label htmlFor="yearOfBirth" className="text-sm font-medium leading-none">
            Year of Birth <span className="text-red-500">*</span>
          </label>
          <select
            id="yearOfBirth"
            name="yearOfBirth"
            value={formData.yearOfBirth}
            onChange={handleInputChange}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm",
              fieldErrors.yearOfBirth && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <option value="">Select year</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {fieldErrors.yearOfBirth && <p className="text-xs text-red-500">{fieldErrors.yearOfBirth}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1 text-left">
          <label htmlFor="password" className="text-sm font-medium leading-none">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              className={cn("pr-10", fieldErrors.password && "border-red-500 focus-visible:ring-red-500")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password}</p>}
        </div>

        <div className="space-y-1 text-left">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={cn("pr-10", fieldErrors.confirmPassword && "border-red-500 focus-visible:ring-red-500")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((previous) => !previous)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldErrors.confirmPassword && <p className="text-xs text-red-500">{fieldErrors.confirmPassword}</p>}
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-start gap-2">
          <input
            id="consentTermsOfService"
            name="consentTermsOfService"
            type="checkbox"
            checked={formData.consentTermsOfService}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="consentTermsOfService" className="text-sm leading-none">
            I accept the{" "}
            <Link to="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        {fieldErrors.consentTermsOfService && <p className="text-xs text-red-500 ml-6">{fieldErrors.consentTermsOfService}</p>}

        <div className="flex items-start gap-2">
          <input
            id="consentPrivacyPolicy"
            name="consentPrivacyPolicy"
            type="checkbox"
            checked={formData.consentPrivacyPolicy}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="consentPrivacyPolicy" className="text-sm leading-none">
            I accept the{" "}
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        {fieldErrors.consentPrivacyPolicy && <p className="text-xs text-red-500 ml-6">{fieldErrors.consentPrivacyPolicy}</p>}
      </div>

      {errorMessage && (
        <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">{errorMessage}</div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : submitLabel}
      </Button>
    </form>
  )
}

