import { Outlet, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { applyTheme, getStoredTheme, getSystemTheme, setStoredTheme } from "../utils/theme"
import logo from "../../public/logo.svg";

export function Layout() {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const t = getStoredTheme() || getSystemTheme()
        setTheme(t)
    }, [])

    function toggleTheme() {
        const next = theme === "dark" ? "light" : "dark"
        setTheme(next)
        applyTheme(next)
        setStoredTheme(next)
    }

    return (
        <div className="app-layout">
            <header className="app-header">
                <div className="header-content">
                    <a href="/">
                    <div className="brand">
                            <img src={logo} alt="Reilly Labs Logo" className="brand-logo"/>
                    </div>
                    </a>
                    <nav>
                        <Link to="/">Coding Challenge</Link>
                        <Link to="/history">History</Link>
                        <button
                            type="button"
                            className={`theme-toggle ${theme === "dark" ? "dark" : "light"}`}
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <span className="toggle-thumb"></span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="app-main">
                <Outlet />
            </main>
        </div>
    )
}