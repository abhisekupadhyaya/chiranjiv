/**
 * Centralized environment configuration for the Chiranjiv frontend.
 * All environment variables should be accessed through this module.
 *
 * Required: VITE_API_BASE_URL
 * Optional: VITE_CSRF_COOKIE_NAME, VITE_GTM_ID
 */

export interface EnvironmentConfig {
  apiBaseUrl: string
  csrfCookieName: string
  isDevelopment: boolean
  isProduction: boolean
  gtmId?: string
}

function getEnv(): Record<string, unknown> & { DEV?: boolean; PROD?: boolean } {
  return ((import.meta as unknown as { env?: Record<string, unknown> & { DEV?: boolean; PROD?: boolean } }).env ?? {})
}

function getRequiredEnvVar(name: string): string {
  const value = getEnv()[name] as string | undefined
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function getOptionalEnvVar(name: string): string | undefined {
  const value = getEnv()[name] as string | undefined
  return value || undefined
}

function getApiBaseUrl(): string {
  return getRequiredEnvVar('VITE_API_BASE_URL').replace(/\/$/, '')
}

const apiBaseUrl = getApiBaseUrl()
const csrfCookieName = getOptionalEnvVar('VITE_CSRF_COOKIE_NAME') ?? 'chiranjiv_user_csrf'
const gtmId = getOptionalEnvVar('VITE_GTM_ID')

export const config: Readonly<EnvironmentConfig> = Object.freeze({
  apiBaseUrl,
  csrfCookieName,
  isDevelopment: Boolean(getEnv().DEV),
  isProduction: Boolean(getEnv().PROD),
  gtmId,
})

export default config
