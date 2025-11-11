import type { UserManagerSettings } from 'oidc-client-ts'

type RuntimeAuthConfig = {
  authority: string
  clientId: string
  redirectUri: string
  postLogoutRedirectUri: string
  scope: string
  cognitoDomain?: string
  clientSecret?: string
  addressAttrName?: string
}

function getWindowOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return ''
}

export function getRuntimeAuthConfig(): RuntimeAuthConfig {
  const authority =
    import.meta.env.VITE_OIDC_AUTHORITY ||
    'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_GV16bcF7q'

  const clientId =
    import.meta.env.VITE_OIDC_CLIENT_ID || '146k1biivtve0064088ei715ns'

  const redirectUri =
    import.meta.env.VITE_OIDC_REDIRECT_URI || 'https://d84l1y8p4kdic.cloudfront.net'

  const postLogoutRedirectUri =
    import.meta.env.VITE_OIDC_LOGOUT_REDIRECT_URI ||
    redirectUri

  const scope =
    import.meta.env.VITE_OIDC_SCOPE || 'phone openid email'

  const cognitoDomain =
    import.meta.env.VITE_COGNITO_DOMAIN || undefined
  const clientSecret =
    import.meta.env.VITE_OIDC_CLIENT_SECRET || undefined
  const addressAttrName =
    import.meta.env.VITE_COGNITO_ADDRESS_ATTR_NAME || 'address'

  return {
    authority,
    clientId,
    redirectUri,
    postLogoutRedirectUri,
    scope,
    cognitoDomain,
    clientSecret,
    addressAttrName,
  }
}

export function getOidcClientSettings(): UserManagerSettings {
  const cfg = getRuntimeAuthConfig()
  const settings: UserManagerSettings = {
    authority: cfg.authority,
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    response_type: 'code',
    scope: cfg.scope,
    post_logout_redirect_uri: cfg.postLogoutRedirectUri,
    automaticSilentRenew: true,
    loadUserInfo: true,
  }
  return settings
}


