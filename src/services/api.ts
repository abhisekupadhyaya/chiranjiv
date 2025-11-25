import config from '../config/env'

// AWS Lambda API Base URL (centralized via VITE_API_BASE_URL in env config)
const API_BASE_URL = config.apiBaseUrl

// TypeScript interfaces for API request/response types
export interface WaitlistSignupRequest {
  id: string
  name: string
  email: string
  phone: string
  address: string
  age: number
  consentPrivacyPolicy?: string | null
  consentTermsOfService?: string | null
  consentDataUsagePolicy?: string | null
  consentResearchContact?: string | null
  consentMarketing?: string | null
  referralCode?: string
}

export interface WaitlistSignupResponse {
  message: string
  item: {
    id: string
    createdAt: number
    name: string
    email: string
    phone: string
    address: string
    age: number
    consentPrivacyPolicy?: string
    consentTermsOfService?: string
    consentDataUsagePolicy?: string
    consentResearchContact?: string
    consentMarketing?: string
    referralCode: string
    usedReferralCode?: string
    referredBy?: string
    isDummy: boolean
    referralsCount: number
    referredUserIds: string[]
  }
  referralCode: string
}

export interface WaitlistRankResponse {
  id: string
  rank: number
  totalUsers: number
  referralsCount: number
  referralCode: string
}

export interface WaitlistStatsResponse {
  totalUsers: number
  totalReferrals: number
}

export async function postWaitlistSignup(input: WaitlistSignupRequest): Promise<{
  ok: boolean
  status: number
  data: WaitlistSignupResponse | { error: string }
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/chiranjiv-waitlist-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    
    let data: WaitlistSignupResponse | { error: string }
    try {
      data = await res.json()
    } catch {
      data = { error: 'Invalid response from server' }
    }
    
    if (!res.ok) {
      if (!('error' in data)) {
        data = { error: 'Failed to complete signup' }
      }
    }
    
    return { ok: res.ok, status: res.status, data }
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return {
      ok: false,
      status: 500,
      data: { error: 'Network error. Please try again.' },
    }
  }
}

export async function getWaitlistRank(userId: string): Promise<{
  ok: boolean
  status: number
  data: WaitlistRankResponse | { error: string }
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/chiranjiv-waitlist-rank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId }),
    })
    
    let data: WaitlistRankResponse | { error: string }
    try {
      data = await res.json()
    } catch {
      data = { error: 'Invalid response from server' }
    }
    
    if (!res.ok) {
      if (!('error' in data)) {
        data = { error: 'Failed to fetch rank' }
      }
    }
    
    return { ok: res.ok, status: res.status, data }
  } catch (error) {
    console.error('Waitlist rank error:', error)
    return {
      ok: false,
      status: 500,
      data: { error: 'Network error. Please try again.' },
    }
  }
}

export async function getWaitlistStats(): Promise<{
  ok: boolean
  status: number
  data: WaitlistStatsResponse | { error: string }
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/chiranjiv-waitlist-stats`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    
    let data: WaitlistStatsResponse | { error: string }
    try {
      data = await res.json()
    } catch {
      data = { error: 'Invalid response from server' }
    }
    
    if (!res.ok) {
      if (!('error' in data)) {
        data = { error: 'Failed to fetch stats' }
      }
    }
    
    return { ok: res.ok, status: res.status, data }
  } catch (error) {
    console.error('Waitlist stats error:', error)
    return {
      ok: false,
      status: 500,
      data: { error: 'Network error. Please try again.' },
    }
  }
}


