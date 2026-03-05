import { Routes, Route } from "react-router-dom";
import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx";
import { Layout } from "./layout/Layout.jsx";
import { ChallengeGenerator } from "./challenge/ChallengeGenerator.jsx";
import { HistoryPanel } from "./history/HistoryPanel.jsx";
import { AuthenticationPage } from "./auth/AuthenticationPage.jsx";
import "./App.css";

function App() {
    return (
        <ClerkProviderWithRoutes>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<ChallengeGenerator />} />
                    <Route path="/history" element={<HistoryPanel />} />
                    <Route path="/auth" element={<AuthenticationPage />} />
                </Route>
            </Routes>
        </ClerkProviderWithRoutes>
    );
}

export default App;