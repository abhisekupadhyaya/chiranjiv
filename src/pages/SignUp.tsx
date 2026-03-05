import { useEffect, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUpStep1Form, type Step1Data } from "@/components/auth/SignUpStep1Form"

type Step = 1 | 2 | 3
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

const SignUp = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signup, login, error, setError } = useAuth()
  const profileReturnTo = `${window.location.origin}/profile`
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [signupMessage, setSignupMessage] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneLocal: "",
    countryCode: "+91",
    referralCode: "",
    biologicalSex: "female" as "male" | "female",
    dateOfBirth: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    privacyPolicy: false,
    termsOfService: false,
    dataUsagePolicy: false,
    marketingConsent: false,
  })

  useEffect(() => {
    const stepParam = searchParams.get("step")
    const firstName = searchParams.get("firstName")?.trim() ?? ""
    const lastName = searchParams.get("lastName")?.trim() ?? ""
    const email = searchParams.get("email")?.trim() ?? ""
    const phoneFromQuery = searchParams.get("phone")?.trim() ?? searchParams.get("phoneLocal")?.trim() ?? ""
    const referralCode = searchParams.get("ref")?.trim() ?? ""

    setFormData((prev) => ({
      ...prev,
      firstName: firstName || prev.firstName,
      lastName: lastName || prev.lastName,
      email: email || prev.email,
      phoneLocal: phoneFromQuery || prev.phoneLocal,
      referralCode: referralCode || prev.referralCode,
    }))

    if (stepParam === "2") {
      setStep(2)
    }
  }, [searchParams])

  const handleStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setFieldErrors({})
    setError(null)
    setStep(2)
  }

  const validateStep2 = () => {
    const nextErrors: Record<string, string> = {}
    if (!formData.dateOfBirth) nextErrors.dateOfBirth = "Date of birth is required"
    if (!formData.addressLine1.trim()) nextErrors.addressLine1 = "Address is required"
    if (!formData.city.trim()) nextErrors.city = "City is required"
    if (!formData.state.trim()) nextErrors.state = "State is required"
    if (!formData.zip.trim()) nextErrors.zip = "ZIP code is required"
    if (!formData.privacyPolicy) nextErrors.privacyPolicy = "You must accept the Privacy Policy"
    if (!formData.termsOfService) nextErrors.termsOfService = "You must accept the Terms of Service"
    if (!formData.dataUsagePolicy) nextErrors.dataUsagePolicy = "You must accept the Data Usage Policy"
    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = "checked" in e.target ? e.target.checked : false
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    setError(null)
    setLoading(true)
    try {
      const phoneDigits = formData.phoneLocal.replace(/\D/g, "")
      const phone = `${formData.countryCode}${phoneDigits}`
      const street = [formData.addressLine1, formData.addressLine2].filter(Boolean).join(", ")
      const result = await signup({
        email: formData.email.trim(),
        phone,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        biologicalSex: formData.biologicalSex,
        dateOfBirth: formData.dateOfBirth,
        consentPrivacyPolicy: formData.privacyPolicy,
        consentTermsOfService: formData.termsOfService,
        consentDataUsagePolicy: formData.dataUsagePolicy,
        consentMarketing: formData.marketingConsent,
        referralCode: formData.referralCode.trim() || undefined,
        address: {
          label: "home",
          street,
          city: formData.city.trim(),
          state: formData.state.trim(),
          zipCode: formData.zip.trim(),
          country: formData.country,
          isDefault: true,
        },
      })
      setSignupMessage(result.message)
      setStep(3)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {step === 1 && "Create your account"}
            {step === 2 && "Complete your profile"}
            {step === 3 && "Check your email"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && "Get started with your basic information"}
            {step === 2 && "A few details are needed to complete registration"}
            {step === 3 && "Your signup request has been received"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <SignUpStep1Form
              defaultValues={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneLocal: formData.phoneLocal,
                countryCode: formData.countryCode,
                referralCode: formData.referralCode,
              }}
              onSubmit={handleStep1Submit}
            />
          )}

          {step === 2 && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="biologicalSex" className="text-sm font-medium leading-none">
                    Biological sex <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="biologicalSex"
                    name="biologicalSex"
                    value={formData.biologicalSex}
                    onChange={handleInputChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dateOfBirth" className="text-sm font-medium leading-none">
                    Date of birth <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    lang="en-IN"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={fieldErrors.dateOfBirth ? "border-red-500" : ""}
                  />
                  {fieldErrors.dateOfBirth && <p className="text-xs text-red-500">{fieldErrors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="addressLine1" className="text-sm font-medium leading-none">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    placeholder="Street Address"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={fieldErrors.addressLine1 ? "border-red-500" : ""}
                  />
                  {fieldErrors.addressLine1 && <p className="text-xs text-red-500">{fieldErrors.addressLine1}</p>}
                  <Input
                    name="addressLine2"
                    placeholder="Apt, Suite, etc. (Optional)"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium leading-none">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={fieldErrors.city ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium leading-none">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm ${
                        fieldErrors.state ? "border-red-500" : "border-input"
                      }`}
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.state && <p className="text-xs text-red-500">{fieldErrors.state}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label htmlFor="zip" className="text-sm font-medium leading-none">
                      ZIP code <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="zip"
                      name="zip"
                      placeholder="ZIP / Pincode"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={fieldErrors.zip ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium leading-none">
                      Country
                    </label>
                    <Input id="country" name="country" value={formData.country} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      name="privacyPolicy"
                      checked={formData.privacyPolicy}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="privacyPolicy" className="text-sm leading-none">
                      I accept the{" "}
                      <Link to="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {fieldErrors.privacyPolicy && <p className="text-xs text-red-500 ml-6">{fieldErrors.privacyPolicy}</p>}

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="termsOfService"
                      name="termsOfService"
                      checked={formData.termsOfService}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="termsOfService" className="text-sm leading-none">
                      I accept the{" "}
                      <Link to="/terms-of-service" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {fieldErrors.termsOfService && <p className="text-xs text-red-500 ml-6">{fieldErrors.termsOfService}</p>}

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="dataUsagePolicy"
                      name="dataUsagePolicy"
                      checked={formData.dataUsagePolicy}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="dataUsagePolicy" className="text-sm leading-none">
                      I accept the{" "}
                      <Link to="/data-usage-policy" className="text-primary hover:underline">
                        Data Usage Policy
                      </Link>{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {fieldErrors.dataUsagePolicy && <p className="text-xs text-red-500 ml-6">{fieldErrors.dataUsagePolicy}</p>}

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="marketingConsent"
                      name="marketingConsent"
                      checked={formData.marketingConsent}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="marketingConsent" className="text-sm leading-none">
                      I agree to receive product updates and marketing communication (optional)
                    </label>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">{error}</div>
              )}

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Signup submitted</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {signupMessage || "Check your email to verify your account and set your password."}
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Button onClick={() => void login(profileReturnTo)} className="w-full">
                  Continue to sign in
                </Button>
                <Button variant="ghost" onClick={() => navigate("/")} className="text-sm">
                  Back to home
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        {step !== 3 && (
          <CardFooter className="flex flex-col gap-2">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={() => void login(profileReturnTo)}
              >
                Sign in
              </button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default SignUp
