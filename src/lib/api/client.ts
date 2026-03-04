export class ApiError extends Error {
  status: number
  payload?: unknown

  constructor(message: string, status: number, payload?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.payload = payload
  }
}

import { config } from '@/config/env'

const API_BASE_URL = config.apiBaseUrl
const CSRF_COOKIE_NAME = config.csrfCookieName
const CSRF_HEADER_NAME = "X-CSRF-Token"

type ApiFetchOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined>
}

function getCookie(name: string): string | null {
  if (!document.cookie) {
    return null
  }

  const encodedName = `${encodeURIComponent(name)}=`
  const match = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(encodedName))

  if (!match) {
    return null
  }

  return decodeURIComponent(match.slice(encodedName.length))
}

function buildUrl(path: string, query?: ApiFetchOptions["query"]): string {
  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path
  const url = new URL(normalizedPath, new URL(base, window.location.origin))

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

export async function apiFetch<TResponse>(path: string, options: ApiFetchOptions = {}): Promise<TResponse> {
  const { query, headers, ...rest } = options
  const method = (rest.method ?? "GET").toUpperCase()
  const requestHeaders = new Headers(headers)
  if (!requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json")
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(method) && !requestHeaders.has(CSRF_HEADER_NAME)) {
    const csrfToken = getCookie(CSRF_COOKIE_NAME)
    if (csrfToken) {
      requestHeaders.set(CSRF_HEADER_NAME, csrfToken)
    }
  }

  const response = await fetch(buildUrl(path, query), {
    ...rest,
    method,
    credentials: rest.credentials ?? "include",
    headers: requestHeaders,
  })

  const contentType = response.headers.get("content-type") ?? ""
  const isJson = contentType.includes("application/json")
  const payload = isJson ? await response.json().catch(() => null) : null

  if (!response.ok) {
    const message =
      (payload as { message?: string; detail?: string } | null)?.message ??
      (payload as { detail?: string } | null)?.detail ??
      `Request failed with status ${response.status}`
    throw new ApiError(message, response.status, payload)
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  if (isJson) {
    return payload as TResponse
  }

  return (await response.text()) as TResponse
}
