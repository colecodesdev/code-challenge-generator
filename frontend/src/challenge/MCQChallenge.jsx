import { useState } from "react";

function formatPrompt(text) {
    if (!text || typeof text !== "string") return "";
    return text
        .replace(/```[a-zA-Z]*\n?/g, "")
        .replace(/```/g, "")
        .trim();
}

export function MCQChallenge({ challenge, showExplanation = false }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation);

    const options =
        typeof challenge.options === "string" ? JSON.parse(challenge.options) : challenge.options;

    const prompt =
        challenge?.prompt && typeof challenge.prompt === "string"
            ? formatPrompt(challenge.prompt)
            : "";

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        setShouldShowExplanation(true);
    };

    const getOptionClass = (index) => {
        if (selectedOption === null) return "option";
        if (index === challenge.correct_answer_id) return "option correct";
        if (selectedOption === index && index !== challenge.correct_answer_id) return "option incorrect";
        return "option";
    };

    return (
        <div>
            <div className="quota-display">
                <p>
                    <strong>Difficulty:</strong> {challenge.difficulty}
                </p>
            </div>

            <div className="challenge-title">{challenge.title}</div>

            {prompt && <pre className="challenge-prompt">{prompt}</pre>}

            <div className="options">
                {options.map((option, index) => (
                    <button
                        key={index}
                        type="button"
                        className={getOptionClass(index)}
                        onClick={() => handleOptionSelect(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {shouldShowExplanation && selectedOption !== null && (
                <div className="explanation">
                    <h4>Explanation</h4>
                    <p>{challenge.explanation}</p>
                </div>
            )}
        </div>
    );
}