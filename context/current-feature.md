# Current Feature

## Status

In Progress

## Goals

Migrate the ORM `Base` from the legacy `sqlalchemy.ext.declarative.declarative_base()` shim to SQLAlchemy 2.0's `DeclarativeBase` class, satisfying [coding-standards.md](context/coding-standards.md). The legacy import was confirmed to no longer exist in the currently installed SQLAlchemy 2.0.47, so this is the difference between "deprecation warning" and "ImportError on app start" depending on patch version.
Use the option text as the React `key` for MCQ option buttons instead of the array index. Coding standards prohibit array indexes as keys "when the list can reorder," and although the current parent always remounts on a new challenge, the convention guards against subtle state bugs if the parent ever optimises rendering.

## Notes

- Code-scanner finding #11 (low). Site: [frontend/src/challenge/MCQChallenge.jsx:49-51](frontend/src/challenge/MCQChallenge.jsx#L49-L51).
- Options are unique strings within a single challenge (the AI prompt asks for four distinct answer choices), so option text is a safe stable key.
- One-line change.
Initialize Layout's theme state from the storage/system utility on first render instead of defaulting to `"light"` and patching it from a `useEffect`. The current pattern guarantees a "light → actual theme" state transition on every mount, which can flicker the toggle thumb on slow devices.

## Notes

- Code-scanner finding #10 (low). Site: [frontend/src/layout/Layout.jsx:7-12](frontend/src/layout/Layout.jsx#L7-L12).
- Coding standards explicitly call out "do not duplicate theme state in component state" and "Apply 'You Might Not Need an Effect' before reaching for useEffect" — this is exactly that pattern.
- Use `useState` lazy initializer to read once at mount. Drop the now-unused `useEffect` import.

Stop silently truncating AI responses. `max_tokens=400` is too tight for a 4-option challenge that includes a code snippet plus a real explanation, so longer hard-difficulty challenges get cut off mid-JSON and surface as opaque "not valid JSON" errors.

## Notes

- Code-scanner finding #7 (medium). Site: [backend/src/database/models.py:2](backend/src/database/models.py#L2), [backend/src/database/models.py:7](backend/src/database/models.py#L7).
- Pure rename: `from sqlalchemy.orm import DeclarativeBase` and `class Base(DeclarativeBase): pass`. No table-shape change, no migration.
- Scope intentionally narrow: not splitting models.py engine setup into the `db.py`/`models.py` layout the standards prefer. That's a larger refactor; do it separately.

## History
