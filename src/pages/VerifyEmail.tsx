import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const VerifyEmail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, error } = useAuth()

  const email = searchParams.get("email")?.trim() ?? ""

  const handleChangeEmail = () => {
    navigate("/change-email")
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Thank you for signing up</CardTitle>
          <CardDescription>
            We sent a verification link to <span className="font-medium">{email || "your email"}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            After you click the link in your email, use the button below to continue to sign in.
          </p>

          <Button onClick={() => void login()} className="w-full">
            I have verified my email
          </Button>

          <Button type="button" variant="outline" className="w-full" onClick={handleChangeEmail}>
            Change email address
          </Button>
          {error && (
            <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  )
}

export default VerifyEmail

