import { Link } from "react-router-dom"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const ForgotPassword = () => {
  const { login } = useAuth()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset password</CardTitle>
          <CardDescription className="text-center">
            Password reset is handled through Chiranjiv secure login.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Continue to secure login and use the &quot;Forgot password&quot; option on the Keycloak sign-in page.
          </p>
          <Button type="button" className="w-full" onClick={() => void login(window.location.href)}>
            Continue to secure login
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/signin" className="text-sm font-medium text-primary hover:underline">
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForgotPassword
