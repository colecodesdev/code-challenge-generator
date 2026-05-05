# Current Feature

## Status

In Progress

## Goals

Push history sorting into the database and add an index on `challenges.created_by` so the history endpoint stops doing a full-table fetch + Python sort on every request.

## Notes

- Code-scanner finding #5 (medium). Sites: [backend/src/database/db.py:63](backend/src/database/db.py#L63) (no ORDER BY) and [backend/src/routes/challenge.py:93](backend/src/routes/challenge.py#L93) (Python `sorted()`).
- `get_user_challenges` now returns rows already ordered by `date_created DESC`. Removed the `sorted(...)` call from the route handler and dropped the now-unused `datetime` import there.
- Added `index=True` to `Challenge.created_by`. SQLite picks this up via `Base.metadata.create_all(engine)` for fresh DBs. The container's SQLite file is ephemeral on every redeploy (per project-overview), so existing prod databases will get the index automatically on next deploy. No migration needed.

## History
