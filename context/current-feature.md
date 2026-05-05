# Current Feature

## Status

In Progress

## Goals

Stop emitting every SQL statement to stdout in production. SQLAlchemy's `echo=True` is hardcoded in [backend/src/database/models.py:6](backend/src/database/models.py#L6), which means CloudWatch (or whatever ships container logs) gets a row-by-row stream of queries plus their bound parameters: user IDs, challenge content, etc.

## Notes

- Code-scanner finding #4 (medium).
- Make `echo` opt-in via `SQL_ECHO` env (default off). Local dev can flip it on for debugging without code changes.
- Add `SQL_ECHO=` to `.env.example` so the knob is discoverable.

## History
