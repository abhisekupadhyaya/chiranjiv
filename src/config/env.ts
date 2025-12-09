/**
 * Centralized environment configuration for the Chiranjiv frontend.
 * All environment variables should be accessed through this module.
 */

export interface EnvironmentConfig {
  apiBaseUrl: string
  isDevelopment: boolean
  isProduction: boolean

  oidcAuthority: string
  oidcClientId: string
  oidcRedirectUri: string
  oidcLogoutRedirectUri: string
  oidcScope: string
  cognitoDomain?: string
  oidcClientSecret?: string
  cognitoAddressAttrName: string
  gtmId?: string
}

/**
 * Reads a required environment variable from Vite's import.meta.env.
 * Throws a runtime error if the variable is missing or empty.
 */
function getRequiredEnvVar(name: string): string {
  const value = (import.meta.env as any)[name] as string | undefined

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

/**
 * Reads an optional environment variable from Vite's import.meta.env.
 * Returns undefined when the variable is not set or empty.
 */
function getOptionalEnvVar(name: string): string | undefined {
  const value = (import.meta.env as any)[name] as string | undefined
  return value || undefined
}

/**
 * Validates and returns the API base URL from environment variables.
 */
function getApiBaseUrl(): string {
  const apiUrl = getRequiredEnvVar('VITE_API_BASE_URL')

  // Remove trailing slash if present to keep URL construction consistent
  return apiUrl.replace(/\/$/, '')
}

/**
 * Application environment configuration.
 * Exported as a frozen object to prevent accidental mutations.
 */
const apiBaseUrl = getApiBaseUrl()

const oidcAuthority = getRequiredEnvVar('VITE_OIDC_AUTHORITY')

const oidcClientId = getRequiredEnvVar('VITE_OIDC_CLIENT_ID')

const oidcRedirectUri = getRequiredEnvVar('VITE_OIDC_REDIRECT_URI')

const oidcLogoutRedirectUri = getRequiredEnvVar('VITE_OIDC_LOGOUT_REDIRECT_URI')

const oidcScope = getRequiredEnvVar('VITE_OIDC_SCOPE')

const cognitoDomain = getOptionalEnvVar('VITE_COGNITO_DOMAIN')

const oidcClientSecret = getOptionalEnvVar('VITE_OIDC_CLIENT_SECRET')

const cognitoAddressAttrName = getRequiredEnvVar(
  'VITE_COGNITO_ADDRESS_ATTR_NAME'
)

const gtmId = getOptionalEnvVar('VITE_GTM_ID')

export const config: Readonly<EnvironmentConfig> = Object.freeze({
  apiBaseUrl,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,

  oidcAuthority,
  oidcClientId,
  oidcRedirectUri,
  oidcLogoutRedirectUri,
  oidcScope,
  cognitoDomain,
  oidcClientSecret,
  cognitoAddressAttrName,
  gtmId,
})

export default config


