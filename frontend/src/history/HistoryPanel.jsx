import { useEffect, useState } from "react";
import { MCQChallenge } from "../challenge/MCQChallenge.jsx";
import { useApi } from "../utils/api.js";

export function HistoryPanel() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { makeRequest } = useApi();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await makeRequest("history");
            setHistory(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load history.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading history...</div>;
    }

    if (error) {
        return (
            <div className="history-panel">
                <h2>History</h2>
                <div className="error-message">{error}</div>
                <button type="button" className="generate-button" onClick={fetchHistory}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="history-panel">
            <h2>History</h2>

            {history.length === 0 ? (
                <div className="history-note">
                    <p>No challenge history (or backend endpoint not available).</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((challenge) => (
                        <div key={challenge.id ?? `${challenge.title}-${challenge.created_at ?? ""}`} className="history-item">
                            <MCQChallenge challenge={challenge} showExplanation />
                            {challenge.created_at && <div className="timestamp">{new Date(challenge.created_at).toLocaleString()}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}