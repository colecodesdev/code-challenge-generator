# Current Feature

## Status

In Progress

## Goals

Initialize Layout's theme state from the storage/system utility on first render instead of defaulting to `"light"` and patching it from a `useEffect`. The current pattern guarantees a "light → actual theme" state transition on every mount, which can flicker the toggle thumb on slow devices.

## Notes

- Code-scanner finding #10 (low). Site: [frontend/src/layout/Layout.jsx:7-12](frontend/src/layout/Layout.jsx#L7-L12).
- Coding standards explicitly call out "do not duplicate theme state in component state" and "Apply 'You Might Not Need an Effect' before reaching for useEffect" — this is exactly that pattern.
- Use `useState` lazy initializer to read once at mount. Drop the now-unused `useEffect` import.

## History
