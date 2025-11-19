import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Amplify } from 'aws-amplify'
import { getCurrentUser, fetchAuthSession, signOut as amplifySignOut } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import { getAmplifyConfig } from './config'
import { signInWithCognito, forgotPassword, confirmForgotPassword, clearTokens } from './cognito'
import type { CognitoTokens } from './cognito'

// Configure Amplify
Amplify.configure(getAmplifyConfig())

type AuthStatus = 'idle' | 'authenticating' | 'authenticated' | 'error'

type AuthUser = {
  sub: string
  email?: string
  name?: string
  phone_number?: string
  [key: string]: unknown
} | null

type AuthContextValue = {
  status: AuthStatus
  user: AuthUser
  tokens: CognitoTokens | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  startPasswordReset: (email: string) => Promise<void>
  completePasswordReset: (email: string, code: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>('idle')
  const [tokens, setTokens] = useState<CognitoTokens | null>(null)
  const [user, setUser] = useState<AuthUser>(null)

  const loadUser = useCallback(async () => {
    try {
      await getCurrentUser()
      const session = await fetchAuthSession()
      
      if (session.tokens?.idToken) {
        const idToken = session.tokens.idToken
        const accessToken = session.tokens.accessToken
        
        const tokenData: CognitoTokens = {
          idToken: idToken.toString(),
          accessToken: accessToken.toString(),
        }
        
        setTokens(tokenData)
        
        // Extract user info from token payload
        const payload = idToken.payload
        setUser({
          sub: String(payload.sub),
          email: typeof payload.email === 'string' ? payload.email : undefined,
          name: typeof payload.name === 'string' ? payload.name : undefined,
          phone_number: typeof payload.phone_number === 'string' ? payload.phone_number : undefined,
          ...payload,
        })
        setStatus('authenticated')
      } else {
        setStatus('idle')
      }
    } catch {
      setStatus('idle')
      setUser(null)
      setTokens(null)
    }
  }, [])

  useEffect(() => {
    loadUser()

    // Listen to auth events
    const hubListener = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          loadUser()
          break
        case 'signedOut':
          setUser(null)
          setTokens(null)
          setStatus('idle')
          break
        case 'tokenRefresh':
          loadUser()
          break
        case 'tokenRefresh_failure':
          setUser(null)
          setTokens(null)
          setStatus('idle')
          break
      }
    })

    return () => hubListener()
  }, [loadUser])

  const signIn = useCallback(async (email: string, password: string) => {
    setStatus('authenticating')
    try {
      const t = await signInWithCognito(email, password)
      setTokens(t)
      await loadUser()
      setStatus('authenticated')
    } catch (e) {
      setStatus('error')
      throw e
    }
  }, [loadUser])

  const signOut = useCallback(async () => {
    try {
      await amplifySignOut()
    } catch {
      // ignore errors during sign out
    }
    clearTokens()
    setTokens(null)
    setUser(null)
    setStatus('idle')
  }, [])

  const startPasswordReset = useCallback(async (email: string) => {
    await forgotPassword(email)
  }, [])

  const completePasswordReset = useCallback(async (email: string, code: string, newPassword: string) => {
    await confirmForgotPassword(email, code, newPassword)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      tokens,
      signIn,
      signOut,
      startPasswordReset,
      completePasswordReset,
    }),
    [status, user, tokens, signIn, signOut, startPasswordReset, completePasswordReset],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
