let getToken = async () => null

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "")

function normalizePath(path) {
    const p = path.startsWith("/") ? path : `/${path}`
    if (p.startsWith("/api/")) return p
    return `/api${p}`
}

async function getClerkTokenIfAvailable() {
    if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) return null
    try {
        const clerk = window?.Clerk
        if (!clerk?.session?.getToken) return null
        const token = await clerk.session.getToken()
        return token || null
    } catch {
        return null
    }
}

getToken = getClerkTokenIfAvailable

function toFriendlyErrorMessage(data, fallback) {
    const raw =
        (typeof data === "string" && data) ||
        data?.detail ||
        data?.message ||
        fallback ||
        "Request failed"

    const msg = String(raw)

    if (msg.toLowerCase().includes("insufficient_quota")) return "OpenAI quota exceeded. Add billing or use a key with available quota."
    if (msg.toLowerCase().includes("invalid_api_key")) return "OpenAI API key is invalid. Check OPENAI_API_KEY in your backend environment."
    if (msg.toLowerCase().includes("api key") && msg.toLowerCase().includes("missing")) return "OpenAI API key is missing on the backend. Set OPENAI_API_KEY and retry."
    if (msg.toLowerCase().includes("billing")) return "OpenAI billing issue detected. Verify billing status for the API key."

    return msg
}

async function request(path, options = {}) {
    const token = await getToken()

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    }

    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch(`${API_BASE_URL}${normalizePath(path)}`, {
        ...options,
        headers,
    })

    const text = await res.text()

    let data = null
    try {
        data = text ? JSON.parse(text) : null
    } catch {
        data = text
    }

    if (!res.ok) {
        const msg = toFriendlyErrorMessage(data, "Request failed")
        const err = new Error(msg)
        err.status = res.status
        err.data = data
        throw err
    }

    return data
}

export function makeRequest(path, options = {}) {
    return request(path, options)
}

export async function getQuota() {
    return request("quota")
}

export async function generateChallenge(difficulty) {
    return request("generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty }),
    })
}

export async function getHistory() {
    return request("history")
}

export function useApi() {
    return {
        makeRequest,
        getQuota,
        generateChallenge,
        getHistory,
    }
}