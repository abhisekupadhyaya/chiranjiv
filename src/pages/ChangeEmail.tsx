import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const ChangeEmail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { changePendingEmail, error, setError } = useAuth()
  const [newEmail, setNewEmail] = useState("")

  const userId = searchParams.get("userId")?.trim() ?? ""
  const pendingSignupToken = searchParams.get("pendingSignupToken")?.trim() ?? ""
  const currentEmail = searchParams.get("email")?.trim() ?? ""
  const hasContext = Boolean(userId && pendingSignupToken)

  const handleContinue = async () => {
    if (!hasContext) {
      setError("Missing signup context. Please restart signup.")
      return
    }
    const normalizedEmail = newEmail.trim()
    if (!normalizedEmail) {
      setError("Please enter a new email address.")
      return
    }
    if (currentEmail && normalizedEmail.toLowerCase() === currentEmail.toLowerCase()) {
      setError("Please enter a different email address.")
      return
    }
    setError(null)
    const result = await changePendingEmail({
      userId,
      newEmail: normalizedEmail,
      pendingSignupToken,
    })
    const params = new URLSearchParams({
      userId,
      pendingSignupToken: result.pendingSignupToken,
      email: normalizedEmail,
    })
    navigate(`/thank-you?${params.toString()}`)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Change email address</CardTitle>
          <CardDescription>Enter a new email and we will send a verification link.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentEmail && <p className="text-sm text-muted-foreground text-center">Current email: {currentEmail}</p>}

          {!hasContext && (
            <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">
              Missing signup context. Restart signup to change email.
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="new-email" className="text-sm font-medium text-foreground">
              New email
            </label>
            <Input
              id="new-email"
              type="email"
              placeholder="you@example.com"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              autoComplete="email"
            />
          </div>

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
          <Button type="button" className="flex-1" onClick={() => void handleContinue()} disabled={!hasContext}>
            Send verification
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ChangeEmail

