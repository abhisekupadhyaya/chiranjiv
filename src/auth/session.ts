import { config } from "@/config/env"
import { apiFetch } from "@/lib/api/client"

function authBaseUrl(): URL {
  const base = config.apiBaseUrl.endsWith("/") ? config.apiBaseUrl : `${config.apiBaseUrl}/`
  return new URL(base, window.location.origin)
}

export function startLoginRedirect(returnTo?: string): void {
  const url = new URL("auth/start", authBaseUrl())
  if (returnTo) {
    url.searchParams.set("return_to", returnTo)
  }
  window.location.assign(url.toString())
}

export function startUpdateEmailRedirect(returnTo?: string): void {
  const url = new URL("auth/start-update-email", authBaseUrl())
  if (returnTo) {
    url.searchParams.set("return_to", returnTo)
  }
  window.location.assign(url.toString())
}

export type SignupInput = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  yearOfBirth: number
  password: string
  confirmPassword: string
  referralCode?: string
  consentPrivacyPolicy: boolean
  consentTermsOfService: boolean
}

export type SignupResponse = {
  success: boolean
  message: string
  userId: string
  pendingSignupToken: string
}

export async function signupUser(payload: SignupInput) {
  return apiFetch<SignupResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

