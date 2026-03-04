import { Link, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const SignIn = () => {
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  const handleContinue = async () => {
    await login(location.state?.from || `${window.location.origin}/profile`)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Continue with Chiranjiv secure login powered by Keycloak.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button type="button" className="w-full" onClick={() => void handleContinue()}>
            Continue
          </Button>
          <div className="text-center">
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Need help resetting your password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn
