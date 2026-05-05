# Current Feature

## Status

In Progress

## Goals

Use the option text as the React `key` for MCQ option buttons instead of the array index. Coding standards prohibit array indexes as keys "when the list can reorder," and although the current parent always remounts on a new challenge, the convention guards against subtle state bugs if the parent ever optimises rendering.

## Notes

- Code-scanner finding #11 (low). Site: [frontend/src/challenge/MCQChallenge.jsx:49-51](frontend/src/challenge/MCQChallenge.jsx#L49-L51).
- Options are unique strings within a single challenge (the AI prompt asks for four distinct answer choices), so option text is a safe stable key.
- One-line change.

Stop silently truncating AI responses. `max_tokens=400` is too tight for a 4-option challenge that includes a code snippet plus a real explanation, so longer hard-difficulty challenges get cut off mid-JSON and surface as opaque "not valid JSON" errors.

## Notes

- Code-scanner finding #6 (medium). Site: [backend/src/ai_generator.py:45](backend/src/ai_generator.py#L45).
- Bump default to 800 (agent's recommendation) and expose it as `OPENAI_MAX_TOKENS` env so future tuning does not require a deploy. Mirrors the existing `OPENAI_MODEL` pattern.
- Add an explicit `finish_reason == "length"` check after the API call. If the model hit the cap, raise a clear `RuntimeError("AI response was truncated...")` before attempting JSON parsing, so the operator log shows the actual cause instead of "not valid JSON".

Stop emitting every SQL statement to stdout in production. SQLAlchemy's `echo=True` is hardcoded in [backend/src/database/models.py:6](backend/src/database/models.py#L6), which means CloudWatch (or whatever ships container logs) gets a row-by-row stream of queries plus their bound parameters: user IDs, challenge content, etc.

## Notes

- Code-scanner finding #4 (medium).
- Make `echo` opt-in via `SQL_ECHO` env (default off). Local dev can flip it on for debugging without code changes.
- Add `SQL_ECHO=` to `.env.example` so the knob is discoverable.

Make Clerk's `authorized_parties` aware of the production frontend origin. Currently hardcoded to `http://localhost:5173` / `http://localhost:5174`, so any Clerk JWT issued to the CloudFront origin fails the check and returns 401 in production.

## Notes

- Code-scanner finding #1 (high). Site: [backend/src/utils.py:24](backend/src/utils.py#L24).
- Reuses the existing `CORS_ORIGINS` env (same set of trusted frontend origins) rather than introducing a new `FRONTEND_URL`. The list of origins we accept browser requests from is exactly the list of origins whose JWTs we trust.
- Parser extracted into [backend/src/config.py](backend/src/config.py) so [backend/src/app.py](backend/src/app.py) and [backend/src/utils.py](backend/src/utils.py) share one source of truth.
- `.env.example` comment expanded to mention both uses.

Stop forwarding internal exception messages to API clients via `detail=str(e)`. Log the underlying error server-side and return a generic message so OpenAI SDK strings, stack details, and library version info do not appear in HTTP responses.

## Notes

- Code-scanner finding #2 (high). Sites: [backend/src/utils.py:41](backend/src/utils.py#L41), [backend/src/routes/challenge.py:65](backend/src/routes/challenge.py#L65), [backend/src/routes/challenge.py:67](backend/src/routes/challenge.py#L67).
- The `OPENAI_API_KEY is not set` branch in `challenge.py` keeps `str(e)` because the message is operator-friendly and not sensitive. The catch-all branch and the unknown-error path in `utils.py` switch to generic copy.
- Logging uses the stdlib `logging` module with `.exception()` so the full traceback lands in container stdout (CloudWatch).

Push history sorting into the database and add an index on `challenges.created_by` so the history endpoint stops doing a full-table fetch + Python sort on every request.

## Notes

- Code-scanner finding #5 (medium). Sites: [backend/src/database/db.py:63](backend/src/database/db.py#L63) (no ORDER BY) and [backend/src/routes/challenge.py:93](backend/src/routes/challenge.py#L93) (Python `sorted()`).
- `get_user_challenges` now returns rows already ordered by `date_created DESC`. Removed the `sorted(...)` call from the route handler and dropped the now-unused `datetime` import there.
- Added `index=True` to `Challenge.created_by`. SQLite picks this up via `Base.metadata.create_all(engine)` for fresh DBs. The container's SQLite file is ephemeral on every redeploy (per project-overview), so existing prod databases will get the index automatically on next deploy. No migration needed.
Add a header comment to `frontend/.env.production` warning that it must never hold sensitive values. The file is intentionally tracked in git (`!.env.production` carve-out in `.gitignore`), but every `VITE_*` variable is baked into the public JS bundle, so any secret added here would leak permanently into git history.

## Notes

- Code-scanner finding #12 (low). Sites: [frontend/.env.production](frontend/.env.production), [.gitignore:16](.gitignore#L16).
- Pure documentation change. No behavior change.
- Clerk publishable keys are not secrets, so the file remains usable for that case if Clerk auth is wired up later.

## History
