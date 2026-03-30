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

  const userId = searchParams.get("userId")?.trim() ?? ""
  const pendingSignupToken = searchParams.get("pendingSignupToken")?.trim() ?? ""
  const currentEmail = searchParams.get("email")?.trim() ?? ""

  const [newEmail, setNewEmail] = useState(currentEmail)
  const [loading, setLoading] = useState(false)

  const hasContext = Boolean(userId && pendingSignupToken)

  const handleSubmit = async () => {
    if (!hasContext) {
      setError("Missing signup context. Please start signup again.")
      return
    }
    if (!newEmail.trim()) {
      setError("Please enter a new email address.")
      return
    }

    setError(null)
    setLoading(true)
    try {
      const result = await changePendingEmail({
        userId,
        newEmail: newEmail.trim(),
        pendingSignupToken,
      })
      const params = new URLSearchParams({
        userId,
        pendingSignupToken: result.pendingSignupToken,
        email: newEmail.trim(),
      })
      navigate(`/thank-you?${params.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Change email address</CardTitle>
          <CardDescription>Update your email to receive a new verification link.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasContext ? (
            <>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground text-left">Current email</p>
                <p className="text-sm font-medium text-left">{currentEmail || "Not available"}</p>
              </div>
              <div className="space-y-2 text-left">
                <label htmlFor="newEmail" className="text-sm font-medium leading-none">
                  New email
                </label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  placeholder="Enter new email"
                />
              </div>
            </>
          ) : (
            <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">
              Missing signup context. Please restart signup.
            </div>
          )}

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
          <Button type="button" className="flex-1" onClick={() => void handleSubmit()} disabled={!hasContext || loading}>
            {loading ? "Updating..." : "Update email"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ChangeEmail

