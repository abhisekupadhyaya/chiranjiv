import { useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignupForm, type SignupFormValues } from "@/components/auth/SignupForm"

const SignUp = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signup, login, error, setError } = useAuth()

  const defaultValues = useMemo<Partial<SignupFormValues>>(
    () => ({
      firstName: searchParams.get("firstName")?.trim() ?? "",
      lastName: searchParams.get("lastName")?.trim() ?? "",
      email: searchParams.get("email")?.trim() ?? "",
      phoneLocal: searchParams.get("phone")?.trim() ?? searchParams.get("phoneLocal")?.trim() ?? "",
      referralCode: searchParams.get("ref")?.trim() ?? "",
      yearOfBirth: searchParams.get("yearOfBirth")?.trim() ?? "",
    }),
    [searchParams]
  )

  const handleSignupSubmit = async (values: SignupFormValues) => {
    setError(null)
    const phoneNumber = `${values.countryCode}${values.phoneLocal.replace(/\D/g, "")}`
    const result = await signup({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phoneNumber,
      yearOfBirth: Number(values.yearOfBirth),
      password: values.password,
      confirmPassword: values.confirmPassword,
      referralCode: values.referralCode.trim() || undefined,
      consentTermsOfService: values.consentTermsOfService,
      consentPrivacyPolicy: values.consentPrivacyPolicy,
    })
    const params = new URLSearchParams({
      userId: result.userId,
      pendingSignupToken: result.pendingSignupToken,
      email: values.email.trim(),
    })
    navigate(`/thank-you?${params.toString()}`)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
          <CardDescription className="text-center">Complete the form below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm defaultValues={defaultValues} onSubmit={handleSignupSubmit} errorMessage={error} submitLabel="Create account" />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={() => void login()}
            >
              Sign in
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
