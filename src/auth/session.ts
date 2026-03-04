import { config } from "@/config/env"
import { ApiError, apiFetch } from "@/lib/api/client"

export type AccountStatus = "waitlisted" | "onboarding" | "onboarded" | "blocked"

export type AuthUser = {
  id: string
  email: string
  name: string
  roles: string[]
  accountStatus: AccountStatus
  onboardingStage?: string | null
}

type AuthMeResponse = {
  userId: string
  email: string
  displayName?: string | null
  roles: string[]
  accountStatus: AccountStatus
  onboardingStage?: string | null
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiFetch<AuthMeResponse>("/auth/me", {
    method: "GET",
  })

  return {
    id: response.userId,
    email: response.email,
    name: response.displayName?.trim() || response.email.split("@")[0] || response.email,
    roles: response.roles.map((item) => item.toLowerCase()),
    accountStatus: response.accountStatus,
    onboardingStage: response.onboardingStage,
  }
}

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

export function startLogoutRedirect(): void {
  window.location.assign(new URL("auth/logout/start", authBaseUrl()).toString())
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401
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

export type WaitlistStats = {
  status?: AccountStatus | null
  rank?: number | null
  totalUsers: number
  totalReferrals: number
  referralsCount?: number | null
  referralCode?: string | null
}

export async function getWaitlistStats() {
  return apiFetch<WaitlistStats>("/waitlist/stats", {
    method: "GET",
  })
}
