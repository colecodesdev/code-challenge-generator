# Current Feature

## Status

In Progress

## Goals

Use the option text as the React `key` for MCQ option buttons instead of the array index. Coding standards prohibit array indexes as keys "when the list can reorder," and although the current parent always remounts on a new challenge, the convention guards against subtle state bugs if the parent ever optimises rendering.

## Notes

- Code-scanner finding #11 (low). Site: [frontend/src/challenge/MCQChallenge.jsx:49-51](frontend/src/challenge/MCQChallenge.jsx#L49-L51).
- Options are unique strings within a single challenge (the AI prompt asks for four distinct answer choices), so option text is a safe stable key.
- One-line change.

## History
