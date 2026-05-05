# Project Overview: Code Challenge Generator

> **Full-stack AI portfolio app: React 19 + FastAPI + OpenAI, deployed on AWS via GitHub Actions OIDC.**

---

## Table of Contents

1. [Problem & Vision](#1-problem--vision)
2. [Target Users](#2-target-users)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Data Models](#5-data-models)
6. [Features](#6-features)
7. [API Surface](#7-api-surface)
8. [UI/UX Guidelines](#8-uiux-guidelines)
9. [URL Structure](#9-url-structure)
10. [Integrations](#10-integrations)
11. [Key Dependencies & Links](#11-key-dependencies--links)

---

## 1. Problem & Vision

The project exists as a portfolio demonstration of practical AI-into-production engineering: containerized API, static frontend, OIDC-based CI/CD, secret management via SSM, all on a deliberately low-cost AWS footprint. It is not aiming to be a learning platform of record; the value is in the integration patterns, not the challenge content.

**Solves:** demonstrating end-to-end AI app delivery in a way an interviewer can actually open in a browser.

---

## 2. Target Users

| Persona | Core Need |
|---|---|
| **Hiring managers / interviewers** | A live, working demo of full-stack + cloud + AI integration |
| **The author (practice)** | A sandbox for iterating on AWS deploys, prompt design, and React 19 patterns |

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend framework** | React 19 + Vite 7 |
| **Routing** | React Router v6 |
| **Frontend language** | JavaScript (no TypeScript) |
| **Styling** | Plain CSS with CSS variables for theming |
| **Backend framework** | FastAPI 0.116 + Uvicorn |
| **Backend language** | Python 3.13 |
| **Package manager (BE)** | `uv` |
| **Database** | SQLite (single file, ephemeral on EC2) |
| **ORM** | SQLAlchemy 2.0 |
| **AI provider** | OpenAI (default model: `gpt-4.1-mini`) |
| **Auth** | Clerk (optional; backend falls back to `local-dev` user) |
| **Frontend hosting** | S3 + CloudFront |
| **Backend hosting** | EC2 (Docker container, systemd-managed) |
| **Container registry** | Amazon ECR |
| **CI/CD** | GitHub Actions with AWS OIDC |
| **Secret store** | AWS Systems Manager Parameter Store |
| **Testing** | None configured (see `context/coding-standards.md` for the planned stack) |

> **Database rule:** SQLite is ephemeral inside the container. Do not introduce migrations or assume durable history until the project moves off SQLite.

> **Secrets rule:** `OPENAI_API_KEY` is fetched from SSM at runtime. Never commit it; never read it from the frontend.

---

## 4. Architecture Overview

```
        User browser
             │
             ▼
       CloudFront CDN
       /             \
      /               \
     ▼                 ▼
  S3 bucket        EC2 instance
  (Vite build)     (Docker: FastAPI)
                       │
                       ├──> SQLite file (ephemeral)
                       ├──> AWS SSM (OPENAI_API_KEY)
                       └──> OpenAI API
```

CloudFront routes `/*` to S3 and `/api/*` to the EC2 origin so the SPA and API share one domain. The backend is a single container per instance; no orchestration layer.

---

## 5. Data Models

```python
# backend/src/database/models.py

class Challenge(Base):
    __tablename__ = 'challenges'
    id = Column(Integer, primary_key=True)
    difficulty = Column(String, nullable=False)
    date_created = Column(DateTime, default=datetime.now)
    created_by = Column(String, nullable=False)        # user_id from Clerk, or "local-dev"
    title = Column(String, nullable=False)
    options = Column(String, nullable=False)            # JSON-encoded list of strings
    prompt = Column(String, nullable=True)
    correct_answer_id = Column(Integer, nullable=False) # 0-based index into options
    explanation = Column(String, nullable=False)

class ChallengeQuota(Base):
    __tablename__ = 'challenge_quotas'
    id = Column(Integer, primary_key=True)
    user_id = Column(String, nullable=False, unique=True)
    quota_remaining = Column(Integer, nullable=False, default=50)
    last_reset_date = Column(DateTime, default=datetime.now)
```

Notes:
- `options` is stored as a JSON string and parsed at the route boundary. This avoids a separate join table at the cost of needing `json.loads`/`json.dumps` in the serializer.
- Quota resets when `now - last_reset_date > 24h`. Default cap is 50 per user per day.

---

## 6. Features

### Core (all users, including unauthenticated `local-dev`)

- **AI challenge generation** — POSTs `{ difficulty }`, returns `{ title, prompt, options[], correct_answer_id, explanation }`.
- **Defensive AI response parsing** — strips markdown fences, locates the JSON object, validates every required field. See `generate_challenge_with_ai()` in [backend/src/ai_generator.py](backend/src/ai_generator.py).
- **Challenge history** — per-user list, sorted newest-first.
- **Daily quota** — 50 challenges/user/day; 429 when exceeded.
- **Light/dark theme** — stored in `localStorage`, applied via `data-theme` on `<html>`.

### Optional / authenticated

- **Clerk auth** — when `VITE_CLERK_PUBLISHABLE_KEY` is set on the frontend and `CLERK_SECRET_KEY` on the backend, requests are scoped to the real user ID. Otherwise everything bucket-scopes to `local-dev`.

---

## 7. API Surface

| Method | Path | Body | Returns | Auth |
|---|---|---|---|---|
| `GET` | `/api/quota` | — | `{ user_id, quota_remaining, last_reset_date }` | Optional |
| `POST` | `/api/generate-challenge` | `{ difficulty: "easy"\|"medium"\|"hard" }` | `Challenge` (serialized) | Optional |
| `GET` | `/api/history` | — | `Challenge[]` | Optional |

Error shape: FastAPI default `{ "detail": "<message>" }` with appropriate HTTP status. The frontend `api.js` reads `data.detail` and maps known OpenAI errors to friendlier copy. **Do not change this contract without updating both sides.**

---

## 8. UI/UX Guidelines

### Design Principles

- Minimal, single-screen flow: pick difficulty, generate, answer, explanation.
- Theme is fully CSS-variable driven. No JS-in-CSS, no Tailwind, no component library.
- Touch targets stay 44x44px or larger (matches WCAG and the global `ui-reviewer` agent's checklist).

### Reference Screenshot

- `docs/app-screenshot.png` (current production UI)

### Layout

```
┌──────────────────────────────────────────┐
│ Header: brand logo + nav + theme toggle  │
├──────────────────────────────────────────┤
│ Quota display                            │
│ Difficulty selector                      │
│ Generate button                          │
│ ── (challenge appears here once gen'd) ──│
│   Title                                  │
│   Prompt (pre-formatted)                 │
│   4 option buttons                       │
│   Explanation (after selection)          │
└──────────────────────────────────────────┘
```

### Micro-interactions

- Selecting an option locks all other options and reveals the explanation.
- Correct answer shows green; an incorrect selection shows red and the correct one stays green.
- Quota number updates after each successful generation.

---

## 9. URL Structure

```
/                  → ChallengeGenerator (default route)
/history           → HistoryPanel
/auth              → AuthenticationPage (Clerk)
/api/quota         → backend
/api/generate-challenge → backend
/api/history       → backend
```

---

## 10. Integrations

| Integration | Purpose | Trigger |
|---|---|---|
| OpenAI Chat Completions | Generates challenge JSON | `POST /api/generate-challenge` |
| Clerk | Optional auth + user identity | Any request when `VITE_CLERK_PUBLISHABLE_KEY` is set |
| AWS SSM Parameter Store | Holds `OPENAI_API_KEY` for the EC2 container | Container startup |
| AWS ECR | Backend image registry | GitHub Actions push on `backend/**` change |
| AWS S3 + CloudFront | Frontend hosting + CDN | GitHub Actions push on `frontend/**` change |

---

## 11. Key Dependencies & Links

### Documentation

| Tool | Link |
|---|---|
| FastAPI | https://fastapi.tiangolo.com/ |
| FastAPI bigger applications | https://fastapi.tiangolo.com/tutorial/bigger-applications/ |
| SQLAlchemy 2.0 migration | https://docs.sqlalchemy.org/en/20/changelog/migration_20.html |
| Pydantic v2 | https://docs.pydantic.dev/latest/ |
| React (react.dev) | https://react.dev/ |
| Vite | https://vite.dev/ |
| React Router v6 | https://reactrouter.com/en/main |
| Clerk React | https://clerk.com/docs/quickstarts/react |
| OpenAI Python SDK | https://github.com/openai/openai-python |
| `uv` package manager | https://docs.astral.sh/uv/ |

### Key Packages

```toml
# backend/pyproject.toml
fastapi>=0.116.0
uvicorn>=0.35.0
sqlalchemy>=2.0.41
openai>=1.93.3
clerk-backend-api>=3.0.5
python-dotenv>=1.1.1
```

```json
// frontend/package.json
"react": "^19.1.0",
"react-router-dom": "^6.30.1",
"@clerk/clerk-react": "^5.33.0",
"vite": "^7.0.3",
"eslint": "^9.30.1"
```

### Local setup

```bash
# Backend
cd backend
uv sync
cp .env.example .env  # then fill OPENAI_API_KEY
uv run python server.py

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env  # VITE_API_BASE_URL=http://localhost:8000
npm run dev
```

---

*Last updated: 2026-05-04*
