import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";

const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function AuthenticationPage() {
    if (!hasClerk) {
        return (
            <div className="auth-container">
                <div style={{ padding: "1.5rem", textAlign: "center" }}>
                    <h2>Authentication Disabled</h2>
                    <p style={{ marginTop: "0.75rem" }}>
                        Set VITE_CLERK_PUBLISHABLE_KEY in a .env file to enable Clerk.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container" style={{ padding: "1.5rem" }}>
            <SignedOut>
                <div style={{ width: "100%" }}>
                    <SignIn routing="hash" />
                    <div style={{ marginTop: "1.5rem" }}>
                        <SignUp routing="hash" />
                    </div>
                </div>
            </SignedOut>
            <SignedIn>
                <div style={{ textAlign: "center" }}>
                    <h2>You are already signed in.</h2>
                </div>
            </SignedIn>
        </div>
    );
}