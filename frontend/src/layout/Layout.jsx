import { Outlet, Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function Layout() {
    return (
        <div className="app-layout">
            <header className="app-header">
                <div className="header-content">
                    <h1>Code Challenge Generator</h1>
                    <nav>
                        <Link to="/">Generate</Link>
                        <Link to="/history">History</Link>
                        {hasClerk ? (
                            <>
                                <SignedOut>
                                    <Link to="/auth">Sign In</Link>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </>
                        ) : (
                            <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                Auth disabled
              </span>
                        )}
                    </nav>
                </div>
            </header>

            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
}