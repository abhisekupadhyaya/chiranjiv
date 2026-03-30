import { useEffect } from "react"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const VerifyEmailComplete = () => {
  const { login } = useAuth()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void login()
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [login])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Email verified</CardTitle>
          <CardDescription>Your email has been verified successfully. Continue to sign in.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">We are redirecting you to sign in.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => void login()}>
            Continue to sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerifyEmailComplete

