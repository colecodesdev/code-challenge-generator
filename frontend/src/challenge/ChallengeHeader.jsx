import { NavLink } from "react-router-dom";

export function ChallengeHeader() {
    return (
        <div className="tool-header">
            <h2 className="tool-title">Coding Challenge Generator</h2>

            <div className="tool-links">
                <NavLink to="/" end className={({ isActive }) => (isActive ? "tool-link active" : "tool-link")}>
                    Generate
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => (isActive ? "tool-link active" : "tool-link")}>
                    History
                </NavLink>
            </div>
        </div>
    );
}