import { signUp, signIn, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword, fetchAuthSession } from 'aws-amplify/auth'

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
  const userAttributes: Record<string, string> = {
    email: input.email,
    ...(input.name ? { name: input.name } : {}),
    ...(normalizePhone(input.phone || '') ? { phone_number: normalizePhone(input.phone || '') as string } : {}),
    ...input.userAttributes,
  }

  const result = await signUp({
    username: input.email,
    password: input.password,
    options: {
      userAttributes,
    },
  })

  return {
    UserSub: result.userId,
    UserConfirmed: result.isSignUpComplete,
  }
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
      return 'An account with this email already exists. Please sign in or reset your password.'
    case 'UserNotConfirmedException':
      return 'Your account is not confirmed. Please check your email for the verification link.'
    case 'UserNotFoundException':
      return 'No account found with this email address.'
    case 'InvalidPasswordException':
      return 'Password does not meet policy (use upper, lower, number, and symbol).'
    case 'NotAuthorizedException':
      if (typeof message === 'string' && /secret hash/i.test(message)) {
        return 'Client secret is required and not configured.'
      }
      if (typeof message === 'string' && /incorrect username or password/i.test(message.toLowerCase())) {
        return 'Incorrect email or password.'
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
      // Return just the message for unknown errors
      return message || `${code}: ${message}`
  }
}

export async function confirmSignUpCode(email: string, code: string) {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  })
}

export async function resendConfirmationCode(email: string) {
  return await resendSignUpCode({
    username: email,
  })
}

export type CognitoTokens = {
  idToken: string
  accessToken: string
  refreshToken?: string
}

export async function signInWithCognito(email: string, password: string): Promise<CognitoTokens> {
  const result = await signIn({
    username: email,
    password,
  })

  if (!result.isSignedIn) {
    throw new Error('Authentication failed')
  }

  // Fetch the session to get tokens
  const session = await fetchAuthSession()
  
  if (!session.tokens?.idToken || !session.tokens.accessToken) {
    throw new Error('Failed to get authentication tokens')
  }

  const tokens: CognitoTokens = {
    idToken: session.tokens.idToken.toString(),
    accessToken: session.tokens.accessToken.toString(),
  }

  saveTokens(tokens)
  return tokens
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
  return await resetPassword({
    username: email,
  })
}

export async function confirmForgotPassword(email: string, code: string, newPassword: string) {
  return await confirmResetPassword({
    username: email,
    confirmationCode: code,
    newPassword,
  })
}

