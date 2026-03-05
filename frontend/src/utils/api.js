let getToken = async () => null

if (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    const mod = await import("@clerk/clerk-react")
    const { useAuth } = mod

    getToken = async () => {
        try {
            const auth = useAuth()
            if (!auth || !auth.getToken) return null
            return await auth.getToken()
        } catch {
            return null
        }
    }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

async function request(path, options = {}) {
    const token = await getToken()
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
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
        const msg = data?.detail || data?.message || "Request failed"
        throw new Error(msg)
    }

    return data
}

export async function getQuota() {
    return request("/api/quota")
}

export async function generateChallenge(difficulty) {
    return request("/api/generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty }),
    })
}

export async function getHistory() {
    return request("/api/history")
}

export function useApi() {
    return {
        getQuota,
        generateChallenge,
        getHistory,
    }
}