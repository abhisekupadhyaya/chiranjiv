import { useNavigate } from "react-router-dom"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const ChangeEmail = () => {
  const navigate = useNavigate()
  const { startUpdateEmail, error, setError } = useAuth()

  const handleContinue = async () => {
    setError(null)
    await startUpdateEmail("/verify-email")
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Change email address</CardTitle>
          <CardDescription>Continue to secure email update in Keycloak.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            You will be redirected to Keycloak to verify your identity and submit a new email address. Keycloak will
            send a dedicated confirmation email to the updated address.
          </p>

          {error && (
            <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/signup")}>
            Restart signup
          </Button>
          <Button type="button" className="flex-1" onClick={() => void handleContinue()}>
            Continue in Keycloak
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ChangeEmail

