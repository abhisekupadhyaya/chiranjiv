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
}

const DEFAULT_API_BASE_URL =
  'https://e92h9q3h03.execute-api.us-east-2.amazonaws.com/default'

/**
 * Validates and returns the API base URL from environment variables.
 */
function getApiBaseUrl(): string {
  const apiUrl = import.meta.env.VITE_API_BASE_URL

  if (!apiUrl) {
    console.warn(
      'VITE_API_BASE_URL is not defined. Falling back to hardcoded default API base URL.'
    )
    return DEFAULT_API_BASE_URL
  }

  // Remove trailing slash if present to keep URL construction consistent
  return apiUrl.replace(/\/$/, '')
}

/**
 * Application environment configuration.
 * Exported as a frozen object to prevent accidental mutations.
 */
const apiBaseUrl = getApiBaseUrl()

const oidcAuthority =
  import.meta.env.VITE_OIDC_AUTHORITY ||
  'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_GV16bcF7q'

const oidcClientId =
  import.meta.env.VITE_OIDC_CLIENT_ID || '146k1biivtve0064088ei715ns'

const oidcRedirectUri =
  import.meta.env.VITE_OIDC_REDIRECT_URI ||
  'https://d84l1y8p4kdic.cloudfront.net'

const oidcLogoutRedirectUri =
  import.meta.env.VITE_OIDC_LOGOUT_REDIRECT_URI || oidcRedirectUri

const oidcScope = import.meta.env.VITE_OIDC_SCOPE || 'phone openid email'

const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN || undefined

const oidcClientSecret = import.meta.env.VITE_OIDC_CLIENT_SECRET || undefined

const cognitoAddressAttrName =
  import.meta.env.VITE_COGNITO_ADDRESS_ATTR_NAME || 'address'

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
})

export default config


