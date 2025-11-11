/* API networking temporarily disabled for local development */

export async function postWaitlistStep1(input: { name: string; email: string; phone: string }) {
  /* Temporarily disabled network call
  const url = buildUrl('/waitlist/step1')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await safeParseJson(res)
  if (!res.ok && res.status === 404) {
    console.error('Waitlist step1 endpoint not found (404). URL:', url, 'Check VITE_API_BASE_URL or routing.')
    if (!data?.error) {
      data.error = 'Service unavailable. Please try again later.'
    }
  }
  return { ok: res.ok, status: res.status, data }
  */
  void input
  return { ok: true, status: 200, data: { userId: 'mock-user-123' } }
}

export async function postWaitlistStep2(input: {
  userId: string
  password: string
  addressLine1: string
  addressLine2?: string | null
  city: string
  state: string
  pincode: string
  privacyPolicy: boolean
  termsOfService: boolean
  dataUsagePolicy: boolean
  researchConsent?: boolean
  marketingConsent?: boolean
}) {
  /* Temporarily disabled network call
  const url = buildUrl('/waitlist/step2')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await safeParseJson(res)
  if (!res.ok && res.status === 404) {
    console.error('Waitlist step2 endpoint not found (404). URL:', url, 'Check VITE_API_BASE_URL or routing.')
    if (!data?.error) {
      data.error = 'Service unavailable. Please try again later.'
    }
  }
  return { ok: res.ok, status: res.status, data }
  */
  void input
  return { ok: true, status: 200, data: { referralCode: 'REF-CODE-1234' } }
}


