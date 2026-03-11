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

export type SignupAddressInput = {
  label: "home" | "work" | "other"
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault?: boolean
}

export type SignupInput = {
  email: string
  phone: string
  firstName: string
  lastName: string
  biologicalSex: "male" | "female"
  dateOfBirth: string
  consentPrivacyPolicy: boolean
  consentTermsOfService: boolean
  consentDataUsagePolicy: boolean
  consentMarketing: boolean
  referralCode?: string
  address: SignupAddressInput
}

export async function signupUser(payload: SignupInput) {
  return apiFetch<{ success: boolean; message: string }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

