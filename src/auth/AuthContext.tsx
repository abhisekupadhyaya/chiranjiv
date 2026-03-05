import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  getCurrentUser,
  isUnauthorizedError,
  signupUser,
  startLoginRedirect,
  startLogoutRedirect,
  type AuthUser,
  type SignupInput,
} from "./session"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  isLoggingOut: boolean
  isAuthenticated: boolean
  refreshAuth: () => Promise<void>
  login: (returnTo?: string) => Promise<void>
  logout: () => Promise<void>
  signup: (payload: SignupInput) => Promise<{ success: boolean; message: string }>
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

  const refreshAuth = useCallback(async () => {
    try {
      const current = await getCurrentUser()
      setUser(current)
    } catch (err) {
      if (isUnauthorizedError(err)) {
        setUser(null)
      } else {
        const message = err instanceof Error ? err.message : "Failed to load session"
        setError(message)
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshAuth()
  }, [refreshAuth])

  const login = useCallback(async (returnTo?: string) => {
    setError(null)
    setIsLoggingOut(false)
    startLoginRedirect(returnTo ?? window.location.href)
  }, [])

  const logout = useCallback(async () => {
    setError(null)
    setIsLoggingOut(true)
    setUser(null)
    startLogoutRedirect()
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

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      error,
      isLoggingOut,
      isAuthenticated: !!user,
      refreshAuth,
      login,
      logout,
      signup,
      setError,
    }),
    [user, loading, error, isLoggingOut, refreshAuth, login, logout, signup]
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
