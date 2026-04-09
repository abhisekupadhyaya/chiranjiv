import { useSearchParams } from "react-router-dom"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const VerifyEmailComplete = () => {
  const [searchParams] = useSearchParams()
  const { login } = useAuth()

  const fullName = searchParams.get("fullName")?.trim() || ""
  const email = searchParams.get("email")?.trim() || ""

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Email verified</CardTitle>
          <CardDescription>
            {fullName ? `Thank you ${fullName}, your` : "Your"} email
            {email ? ` ${email}` : ""} has been verified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">
            You can now sign in to your account.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => void login()}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerifyEmailComplete
