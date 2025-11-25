import type { UserManagerSettings } from 'oidc-client-ts'
import type { ResourcesConfig } from 'aws-amplify'
import config from '../config/env'

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

function getUserPoolIdFromAuthority(authority: string): string {
  // Extract user pool ID from authority URL
  // e.g. https://cognito-idp.us-east-2.amazonaws.com/us-east-2_GV16bcF7q
  const match = authority.match(/amazonaws\.com\/([^/]+)/)
  return match?.[1] || ''
}

export function getRuntimeAuthConfig(): RuntimeAuthConfig {
  return {
    authority: config.oidcAuthority,
    clientId: config.oidcClientId,
    redirectUri: config.oidcRedirectUri,
    postLogoutRedirectUri: config.oidcLogoutRedirectUri,
    scope: config.oidcScope,
    cognitoDomain: config.cognitoDomain,
    clientSecret: config.oidcClientSecret,
    addressAttrName: config.cognitoAddressAttrName,
  }
}

export function getAmplifyConfig(): ResourcesConfig {
  const cfg = getRuntimeAuthConfig()
  const userPoolId = getUserPoolIdFromAuthority(cfg.authority)

  return {
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId: cfg.clientId,
        loginWith: {
          email: true,
        },
        signUpVerificationMethod: 'code',
        userAttributes: {
          email: {
            required: true,
          },
          name: {
            required: false,
          },
          phone_number: {
            required: false,
          },
        },
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: true,
        },
      },
    },
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


