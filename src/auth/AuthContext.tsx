import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  signupUser,
  startLoginRedirect,
  startUpdateEmailRedirect,
  type SignupResponse,
  type SignupInput,
} from "./session"

interface AuthContextType {
  error: string | null
  login: (returnTo?: string) => Promise<void>
  startUpdateEmail: (returnTo?: string) => Promise<void>
  signup: (payload: SignupInput) => Promise<SignupResponse>
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (returnTo?: string) => {
    setError(null)
    startLoginRedirect(returnTo)
  }, [])

  const signup = useCallback(async (payload: SignupInput) => {
    setError(null)
    try {
      return await signupUser(payload)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed"
      setError(message)
      throw err
    }
  }, [])

  const startUpdateEmail = useCallback(async (returnTo?: string) => {
    setError(null)
    startUpdateEmailRedirect(returnTo)
  }, [])

  const value = useMemo<AuthContextType>(
    () => ({
      error,
      login,
      startUpdateEmail,
      signup,
      setError,
    }),
    [error, login, startUpdateEmail, signup]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
