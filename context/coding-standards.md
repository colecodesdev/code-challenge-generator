# Coding Standards

Rules that apply to this project specifically. The global `code-scanner` and `refactor-scanner` agents read this file to decide what counts as a "violation" versus an intentional convention.

## Python (backend)

### Style and lint

- Follow [PEP 8](https://peps.python.org/pep-0008/) and [PEP 257](https://peps.python.org/pep-0257/) (docstrings).
- Use [Ruff](https://docs.astral.sh/ruff/) when adding linting (subsumes flake8, isort, pyupgrade). Not yet configured; if you add it, default ruleset is fine.
- 4-space indentation. No tabs.
- Imports: stdlib, third-party, first-party, in that order, with one blank line between groups.

### Type hints

- All public function signatures must have parameter and return types.
- Use [PEP 604](https://peps.python.org/pep-0604/) union syntax: `str | None`, not `Optional[str]`.
- FastAPI dependencies and Pydantic models rely on these hints; missing types break OpenAPI generation.

### FastAPI

- Endpoints are `async def` only when they actually `await`. Sync work in `async def` blocks the event loop. See https://fastapi.tiangolo.com/async/.
- One `APIRouter` per domain in `src/routes/`. Mount under a prefix in `app.py` (already done with `/api`).
- Use `response_model=` on every endpoint. The current routes return raw dicts, which works at runtime but skips OpenAPI validation. New endpoints should declare a Pydantic response model.
- Define request bodies as Pydantic models, never as `dict`. Already done in `ChallengeRequest`.

### Pydantic

- Pydantic v2 syntax. `model_config` (not `class Config`) for new models when adding non-trivial config.
- Validators go in the model with `@field_validator`, not in the route handler.

### SQLAlchemy

- Use **SQLAlchemy 2.0** style: `from sqlalchemy.orm import DeclarativeBase` instead of the legacy `declarative_base()` from `sqlalchemy.ext.declarative`. Migration guide: https://docs.sqlalchemy.org/en/20/changelog/migration_20.html.
- File layout:
  - `src/database/models.py`: ORM classes only. No engine, no session factory.
  - `src/database/db.py`: engine, `SessionLocal`, `get_db()` dependency, CRUD helpers.
  - The current code mixes engine setup into `models.py`; new code should follow the split.
- DB sessions are injected with `Depends(get_db)`. Never instantiate `SessionLocal()` directly inside route handlers.
- No migrations until the project moves off SQLite. `Base.metadata.create_all(engine)` at startup is the current pattern.

### CORS and security

- `CORSMiddleware` must list explicit origins. `allow_origins=["*"]` combined with `allow_credentials=True` is rejected by the CORS spec and should be fixed when auth becomes mandatory.
- Read secrets from environment variables, never hardcode. `python-dotenv` loads `.env` for local dev only.

### Error handling

- Raise `HTTPException(status_code=..., detail="...")` for client-visible errors.
- The frontend reads `data.detail`. If you return any other shape, update `frontend/src/utils/api.js` in the same change.
- Catch `RuntimeError` from `ai_generator` and map to HTTP statuses: `400` for missing API key, `502` for upstream OpenAI failures, `500` for everything else. See [backend/src/routes/challenge.py](backend/src/routes/challenge.py) for the existing mapping.

### Files and naming

- Modules: `lower_snake_case.py`.
- Classes: `PascalCase`.
- Functions and variables: `lower_snake_case`.
- Constants: `UPPER_SNAKE_CASE`.

## JavaScript / React (frontend)

### Style and lint

- ESLint flat config in [frontend/eslint.config.js](frontend/eslint.config.js) is the authoritative ruleset: `js.configs.recommended` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`. Do not weaken these rules.
- 4-space indentation (matches existing files).
- Run `npm run lint` before committing frontend changes.

### React 19 patterns

- Functional components only. No classes.
- Apply [react.dev: "You Might Not Need an Effect"](https://react.dev/learn/you-might-not-need-an-effect) before reaching for `useEffect`. Effects are for syncing with external systems, not for derived state.
- Hooks rules are enforced by `eslint-plugin-react-hooks`. Do not call hooks conditionally.
- `key` on every list item, no array index when the list can reorder.
- Co-locate component, its CSS, and any tightly-coupled helpers in the same feature folder (`src/auth/`, `src/challenge/`, `src/history/`, `src/layout/`).

### State and data fetching

- Local component state with `useState` is the default. No Redux, no Zustand, no Context unless three or more components need the same value.
- Server state is fetched directly via `useApi().makeRequest()` in the component that needs it. Do not introduce React Query / TanStack Query at this size.
- The single fetch helper lives in [frontend/src/utils/api.js](frontend/src/utils/api.js). Add new endpoints there as named exports rather than scattering `fetch` calls.

### Styling

- Plain CSS in `App.css` and `index.css`. CSS variables for theming, set on `:root[data-theme="..."]`.
- Do not introduce Tailwind, CSS-in-JS, or a component library.
- Theme state is read once at startup ([frontend/src/utils/theme.js](frontend/src/utils/theme.js)) and toggled via `data-theme` on `<html>`. Do not duplicate theme state in component state.

### Files and naming

- Components: `PascalCase.jsx`. One component export per file. Default export only when the component is the file's primary export.
- Utilities: `camelCase.js`.
- Folders: `lowercase`.

### Auth

- `ClerkProviderWithRoutes` gracefully degrades when `VITE_CLERK_PUBLISHABLE_KEY` is missing (renders just `BrowserRouter`). Preserve this behavior; it's how local dev works without Clerk.
- Tokens are read on demand in [api.js](frontend/src/utils/api.js) via `window.Clerk.session.getToken()`. Do not pass tokens through React props.

## Cross-cutting

### Commits

- [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`. One feature or fix per commit.
- Do not include AI-attribution trailers (`Co-Authored-By: Claude`, "Generated with..."). The user-level CLAUDE.md prohibits this.

### Environment variables

- 12-factor: every environment-specific value comes from env, never from code. https://12factor.net/config.
- `.env` files are gitignored. `.env.example` is the source of truth for which variables exist.
- New backend env vars: add to `backend/.env.example`. New frontend env vars: add to `frontend/.env.example` and prefix with `VITE_` so Vite exposes them.

### Security baseline

- [OWASP Top 10](https://owasp.org/Top10/) is the floor. The global `code-scanner` agent enforces these.
- Never log API keys, tokens, or full request bodies that include them.
- Validate every user-controlled input at the route boundary (Pydantic on the backend, type checks on the frontend before sending).

## Testing

**Status: not configured. Pre-committed stack below.** Do not invent test commands until the framework is installed.

- **Backend:** [pytest](https://docs.pytest.org/) + `pytest-asyncio` for async routes. Tests live in `backend/tests/`, file pattern `test_*.py`. Run with `uv run pytest`.
- **Frontend:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Tests co-located next to source, file pattern `*.test.jsx`. Run with `npm run test`.

Scope when tests are added:
- Pure functions and parsers: full coverage of happy path + meaningful error paths (e.g., `generate_challenge_with_ai` JSON extraction).
- API routes: integration tests with a fresh in-memory SQLite per test.
- React components: behavior tests, not snapshot tests. Skip purely-presentational components.

Do not write tests "for the sake of writing tests." Skip view-layer scaffolding.

## Code Quality

- No commented-out code unless explicitly requested.
- No unused imports or variables. ESLint and Ruff will flag these.
- Keep functions under 50 lines when possible. The existing `generate_challenge_with_ai` is right at the edge; new code should aim shorter.
- No em dashes in user-facing copy or docs.
- Prefer composition over inheritance. The codebase has no class hierarchies today; keep it that way.
