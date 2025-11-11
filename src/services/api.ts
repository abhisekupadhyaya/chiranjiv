const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined

function getApiBase(): string {
  if (!API_BASE) {
    // Fallback to same-origin for local dev when running sam local start-api on 3000 proxy or when reverse-proxying
    return ''
  }
  return API_BASE.replace(/\/+$/, '')
}

export async function postWaitlistStep1(input: { name: string; email: string; phone: string }) {
  const res = await fetch(`${getApiBase()}/waitlist/step1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
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
  const res = await fetch(`${getApiBase()}/waitlist/step2`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}


