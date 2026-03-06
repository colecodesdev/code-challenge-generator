const STORAGE_KEY = "ccg_theme"

export function getStoredTheme() {
    const t = localStorage.getItem(STORAGE_KEY)
    if (t === "light" || t === "dark") return t
    return null
}

export function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
}

export function initTheme() {
    const stored = getStoredTheme()
    const theme = stored || getSystemTheme()
    applyTheme(theme)
    return theme
}

export function setStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme)
}