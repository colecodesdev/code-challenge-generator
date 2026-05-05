# Current Feature

## Status

Not Started

## Goals

<!-- Goals for the next feature. Populated by `/feature load`. -->

## Notes

<!-- Additional context, constraints, or details from the spec. -->

## History

<!--
Append completed features to the end (oldest first, newest last).
Each entry should be a single concise paragraph capturing what shipped, files touched, and any non-obvious decisions.
The `/feature complete` action handles this automatically.
-->

- **Constrain `difficulty` to `Literal` + Pydantic v2 `ConfigDict`** (code-scanner #3 high, #8 medium). Restricted `ChallengeRequest.difficulty` in [backend/src/routes/challenge.py](backend/src/routes/challenge.py) to `Literal["easy", "medium", "hard"]` so non-allowed strings return 422 at the route boundary instead of being interpolated into the OpenAI prompt template (a prompt-injection vector). Same edit migrated `class Config` to `model_config = ConfigDict(...)`.
- **Stop leaking internal error messages** (code-scanner #2 high). Replaced `detail=str(e)` on 500/502 responses in [backend/src/utils.py](backend/src/utils.py) and [backend/src/routes/challenge.py](backend/src/routes/challenge.py) with generic copy and `logger.exception()` server-side. The OpenAI-key-not-set branch keeps `str(e)` since that message is operator-friendly.
- **Make Clerk `authorized_parties` production-aware** (code-scanner #1 high). Reused the existing `CORS_ORIGINS` env (the set of trusted frontend origins is identical for both checks) instead of introducing a new `FRONTEND_URL`. Extracted the parser into a new [backend/src/config.py](backend/src/config.py) so [backend/src/app.py](backend/src/app.py) and [backend/src/utils.py](backend/src/utils.py) share one source of truth. Updated `.env.example` to document both uses.
- **Push history `ORDER BY` into the DB and index `created_by`** (code-scanner #5 medium). Replaced the Python-side `sorted()` in [backend/src/routes/challenge.py](backend/src/routes/challenge.py) with `order_by(desc(date_created))` in [backend/src/database/db.py](backend/src/database/db.py), and added `index=True` to `Challenge.created_by` in [backend/src/database/models.py](backend/src/database/models.py). SQLite ephemerality means no migration is needed; `Base.metadata.create_all()` creates the index on next deploy.
- **Make SQLAlchemy `echo` opt-in** (code-scanner #4 medium). Hardcoded `echo=True` was emitting every SQL statement plus bound parameters to CloudWatch. Switched to `SQL_ECHO` env (default off) in [backend/src/database/models.py](backend/src/database/models.py) and added the knob to `.env.example`.
- **Raise OpenAI `max_tokens` to 800 + detect truncation** (code-scanner #6 medium). 400 tokens silently truncated longer hard-difficulty challenges and surfaced as opaque "not valid JSON" errors. Bumped the default in [backend/src/ai_generator.py](backend/src/ai_generator.py), exposed it as `OPENAI_MAX_TOKENS`, and added a `finish_reason == "length"` check that raises a clear `RuntimeError` before parsing.
- **Migrate to SQLAlchemy 2.0 `DeclarativeBase`** (code-scanner #7 medium). Swapped the legacy `sqlalchemy.ext.declarative.declarative_base()` shim (which is gone in SQLAlchemy 2.0.47) for `class Base(DeclarativeBase): pass` in [backend/src/database/models.py](backend/src/database/models.py). Pure rename, no schema change.
- **Add return type annotations** (code-scanner #9 medium). Filled in missing return annotations across [backend/src/ai_generator.py](backend/src/ai_generator.py), [backend/src/utils.py](backend/src/utils.py), [backend/src/database/db.py](backend/src/database/db.py), and [backend/src/routes/challenge.py](backend/src/routes/challenge.py) plus parameter types on `serialize_quota` / `serialize_challenge`. PEP 604 union syntax (`X | None`).
- **Initialize Layout theme via `useState` lazy initializer** (code-scanner #10 low). Replaced `useState("light")` + `useEffect` in [frontend/src/layout/Layout.jsx](frontend/src/layout/Layout.jsx) with a single `useState(() => getStoredTheme() || getSystemTheme())` to avoid the guaranteed "light → actual theme" mount transition.
- **Use option text as MCQ React key** (code-scanner #11 low). Switched [frontend/src/challenge/MCQChallenge.jsx](frontend/src/challenge/MCQChallenge.jsx) from `key={index}` to `key={option}` per coding-standards' rule against array-index keys. Options are unique strings within a challenge.
- **Document `.env.production` safety** (code-scanner #12 low). Added an in-file warning to [frontend/.env.production](frontend/.env.production) explaining that every `VITE_*` variable is baked into the public JS bundle and tracked in git, so secrets must never go there.
