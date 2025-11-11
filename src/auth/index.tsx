import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { CognitoTokens } from './cognito'
import { clearTokens, getSavedTokens, saveTokens, signInWithCognito } from './cognito'

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
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function base64UrlDecode(input: string): string {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  try {
    return atob(padded)
  } catch {
    return ''
  }
}

function decodeJwtPayload<T>(jwt: string): T | null {
  const parts = jwt.split('.')
  if (parts.length < 2) return null
  const json = base64UrlDecode(parts[1])
  if (!json) return null
  try {
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>('idle')
  const [tokens, setTokens] = useState<CognitoTokens | null>(null)
  const [user, setUser] = useState<AuthUser>(null)

  useEffect(() => {
    const existing = getSavedTokens()
    if (existing?.idToken) {
      setTokens(existing)
      const claims = decodeJwtPayload<Record<string, unknown>>(existing.idToken)
      if (claims && typeof claims === 'object' && claims.sub) {
        setUser({
          sub: String(claims.sub),
          email: typeof claims.email === 'string' ? claims.email : undefined,
          name: typeof claims.name === 'string' ? claims.name : undefined,
          phone_number: typeof claims.phone_number === 'string' ? claims.phone_number : undefined,
          ...claims,
        })
        setStatus('authenticated')
      } else {
        setStatus('idle')
      }
    } else {
      setStatus('idle')
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setStatus('authenticating')
    try {
      const t = await signInWithCognito(email, password)
      saveTokens(t)
      setTokens(t)
      const claims = decodeJwtPayload<Record<string, unknown>>(t.idToken)
      setUser(
        claims && typeof claims === 'object' && (claims as any).sub
          ? {
              sub: String((claims as any).sub),
              email: typeof (claims as any).email === 'string' ? (claims as any).email : undefined,
              name: typeof (claims as any).name === 'string' ? (claims as any).name : undefined,
              phone_number:
                typeof (claims as any).phone_number === 'string' ? (claims as any).phone_number : undefined,
              ...claims,
            }
          : null,
      )
      setStatus('authenticated')
    } catch (e) {
      setStatus('error')
      throw e
    }
  }, [])

  const signOut = useCallback(() => {
    clearTokens()
    setTokens(null)
    setUser(null)
    setStatus('idle')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      tokens,
      signIn,
      signOut,
    }),
    [status, user, tokens, signIn, signOut],
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
