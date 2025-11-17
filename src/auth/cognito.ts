import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { getRuntimeAuthConfig } from './config'

function getRegionFromAuthority(authority: string): string {
  // e.g. https://cognito-idp.us-east-2.amazonaws.com/us-east-2_XXXX
  const match = authority.match(/cognito-idp\.([a-z0-9-]+)\.amazonaws\.com/i)
  return match?.[1] || 'us-east-1'
}

async function computeSecretHash(clientId: string, clientSecret: string, username: string): Promise<string> {
  const algo = { name: 'HMAC', hash: 'SHA-256' } as const
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(clientSecret), algo, false, ['sign'])
  const signature = await crypto.subtle.sign(algo, key, enc.encode(username + clientId))
  const bytes = new Uint8Array(signature)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function normalizePhone(phone: string): string | undefined {
  if (!phone) return undefined
  let value = phone.replace(/\s+/g, '')
  // Strip non-digits except leading '+'
  if (value.startsWith('+')) {
    value = `+${value.slice(1).replace(/\D/g, '')}`
  } else {
    value = value.replace(/\D/g, '')
    // Heuristic: if 10 digits, assume India
    if (value.length === 10) {
      value = `+91${value}`
    } else if (value.length > 0) {
      // Default to + value if user included country code without '+'
      value = `+${value}`
    }
  }
  // Very basic E.164 validation
  if (!/^\+[1-9]\d{6,14}$/.test(value)) {
    return undefined
  }
  return value
}

export async function signUpWithCognito(input: {
  email: string
  password: string
  name?: string
  phone?: string
  userAttributes?: Record<string, string>
}) {
  const cfg = getRuntimeAuthConfig()
  const region = getRegionFromAuthority(cfg.authority)
  const client = new CognitoIdentityProviderClient({ region })
  const secretHash = cfg.clientSecret
    ? await computeSecretHash(cfg.clientId, cfg.clientSecret, input.email)
    : undefined
  const cmd = new SignUpCommand({
    ClientId: cfg.clientId,
    Username: input.email,
    Password: input.password,
    ...(secretHash ? { SecretHash: secretHash } : {}),
    UserAttributes: [
      { Name: 'email', Value: input.email },
      ...(input.name ? [{ Name: 'name', Value: input.name }] : []),
      ...(normalizePhone(input.phone || '') ? [{ Name: 'phone_number', Value: normalizePhone(input.phone || '') as string }] : []),
      ...Object.entries(input.userAttributes || {}).map(([Name, Value]) => ({ Name, Value })),
    ],
  })
  const resp = await client.send(cmd)
  return resp
}

export function toFriendlyCognitoError(err: any): string {
  const code = err?.name || err?.__type || 'Error'
  const message = err?.message || 'An error occurred'
  switch (code) {
    case 'InvalidParameterException':
      if (typeof message === 'string' && /USER_PASSWORD_AUTH/i.test(message)) {
        return 'Email/password sign-in is not enabled for this app client.'
      }
      return 'Invalid details provided. Please check your email and phone number.'
    case 'UsernameExistsException':
      return 'An account with this email already exists.'
    case 'UserNotConfirmedException':
      return 'Your account is not confirmed. Please verify your email to continue.'
    case 'UserNotFoundException':
      return 'No account found with this email address.'
    case 'InvalidPasswordException':
      return 'Password does not meet policy (use upper, lower, number, and symbol).'
    case 'NotAuthorizedException':
      if (typeof message === 'string' && /secret hash/i.test(message)) {
        return 'Client secret is required and not configured.'
      }
      return 'Not authorized. Please check credentials or configuration.'
    case 'CodeMismatchException':
      return 'Invalid verification code. Please check the code and try again.'
    case 'ExpiredCodeException':
      return 'Verification code expired. Please request a new code.'
    case 'ResourceNotFoundException':
      return 'User pool or app client not found. Please check configuration.'
    case 'UnexpectedLambdaException':
    case 'UserLambdaValidationException':
      return 'Sign up validation failed. Please contact support.'
    case 'TooManyRequestsException':
      return 'Too many attempts. Please wait and try again.'
    case 'LimitExceededException':
      return 'Request limit exceeded. Please try again later.'
    default:
      return `${code}: ${message}`
  }
}

export async function confirmSignUp(email: string, code: string) {
  const cfg = getRuntimeAuthConfig()
  const region = getRegionFromAuthority(cfg.authority)
  const client = new CognitoIdentityProviderClient({ region })
  const secretHash = cfg.clientSecret
    ? await computeSecretHash(cfg.clientId, cfg.clientSecret, email)
    : undefined
  const cmd = new ConfirmSignUpCommand({
    ClientId: cfg.clientId,
    Username: email,
    ConfirmationCode: code,
    ...(secretHash ? { SecretHash: secretHash } : {}),
  })
  return await client.send(cmd)
}

export async function resendConfirmationCode(email: string) {
  const cfg = getRuntimeAuthConfig()
  const region = getRegionFromAuthority(cfg.authority)
  const client = new CognitoIdentityProviderClient({ region })
  const secretHash = cfg.clientSecret
    ? await computeSecretHash(cfg.clientId, cfg.clientSecret, email)
    : undefined
  const cmd = new ResendConfirmationCodeCommand({
    ClientId: cfg.clientId,
    Username: email,
    ...(secretHash ? { SecretHash: secretHash } : {}),
  })
  return await client.send(cmd)
}

export type CognitoTokens = {
  idToken: string
  accessToken: string
  refreshToken?: string
}

export async function signInWithCognito(email: string, password: string): Promise<CognitoTokens> {
  const cfg = getRuntimeAuthConfig()
  const region = getRegionFromAuthority(cfg.authority)
  const client = new CognitoIdentityProviderClient({ region })
  const secretHash = cfg.clientSecret
    ? await computeSecretHash(cfg.clientId, cfg.clientSecret, email)
    : undefined
  const init = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: cfg.clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      ...(secretHash ? { SECRET_HASH: secretHash } : {}),
    },
  })
  const res = await client.send(init)
  if (res.ChallengeName) {
    // Basic handling for NEW_PASSWORD_REQUIRED or others could be added here
    throw new Error(`Auth challenge: ${res.ChallengeName}`)
  }
  const tokens = res.AuthenticationResult
  if (!tokens?.IdToken || !tokens.AccessToken) {
    throw new Error('Authentication failed')
  }
  const result: CognitoTokens = {
    idToken: tokens.IdToken,
    accessToken: tokens.AccessToken,
    refreshToken: tokens.RefreshToken,
  }
  saveTokens(result)
  return result
}

const TOKENS_KEY = 'cjv_cognito_tokens'

export function saveTokens(tokens: CognitoTokens) {
  try {
    window.localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens))
  } catch {
    // ignore
  }
}

export function getSavedTokens(): CognitoTokens | null {
  try {
    const raw = window.localStorage.getItem(TOKENS_KEY)
    return raw ? (JSON.parse(raw) as CognitoTokens) : null
  } catch {
    return null
  }
}

export function clearTokens() {
  try {
    window.localStorage.removeItem(TOKENS_KEY)
  } catch {
    // ignore
  }
}

export async function forgotPassword(email: string) {
  const cfg = getRuntimeAuthConfig()
  const region = getRegionFromAuthority(cfg.authority)
  const client = new CognitoIdentityProviderClient({ region })
  const secretHash = cfg.clientSecret
    ? await computeSecretHash(cfg.clientId, cfg.clientSecret, email)
    : undefined
  const cmd = new ForgotPasswordCommand({
    ClientId: cfg.clientId,
    Username: email,
    ...(secretHash ? { SecretHash: secretHash } : {}),
  })
  return await client.send(cmd)
}

export async function confirmForgotPassword(email: string, code: string, newPassword: string) {
  const cfg = getRuntimeAuthConfig()
  const region = getRegionFromAuthority(cfg.authority)
  const client = new CognitoIdentityProviderClient({ region })
  const secretHash = cfg.clientSecret
    ? await computeSecretHash(cfg.clientId, cfg.clientSecret, email)
    : undefined
  const cmd = new ConfirmForgotPasswordCommand({
    ClientId: cfg.clientId,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
    ...(secretHash ? { SecretHash: secretHash } : {}),
  })
  return await client.send(cmd)
}


