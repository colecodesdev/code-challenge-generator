# Code Challenge Generator

Full-stack AI web app that generates multiple-choice programming challenges via OpenAI. React 19 + Vite frontend, FastAPI + SQLAlchemy backend, deployed to AWS (S3/CloudFront for static, EC2/ECR for API) via GitHub Actions OIDC.

## Context Files

Read these to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/current-feature.md

## Commands

Frontend (run from `frontend/`):

- `npm run dev`: Vite dev server on http://localhost:5173
- `npm run build`: production build to `frontend/dist/`
- `npm run lint`: ESLint flat-config check
- `npm run preview`: serve the built bundle locally

Backend (run from `backend/`):

- `uv run python server.py`: FastAPI on http://localhost:8000 (uvicorn, reload off)
- `uv sync`: install/refresh Python deps from `pyproject.toml` + `uv.lock`
- `docker build -t ccg-backend .`: build the deployment image

No automated tests are configured yet. Do not invent a `test` command. If asked to add tests, see `context/coding-standards.md` for the chosen frameworks.

## Infrastructure

- Frontend: built by `.github/workflows/deploy-frontend.yml`, uploaded to S3, fronted by CloudFront. Trigger: changes under `frontend/**` on `main`.
- Backend: built by `.github/workflows/deploy-backend.yml`, pushed to ECR, pulled on EC2. Trigger: changes under `backend/**` on `main`.
- Auth to AWS: GitHub OIDC, role `GitHubActionsCodeChallengeGeneratorRole`, scoped to this repo and the `main` branch.
- Secrets: `OPENAI_API_KEY` lives in AWS SSM Parameter Store and is read at container startup. Never bake it into the image or commit it to `.env`.
- CloudFront routes `/*` to S3 and `/api/*` to EC2.

## Known constraints

- SQLite file (`backend/database.db`) lives inside the EC2 container's filesystem, so challenge history and quotas reset on every redeploy. Do not propose features that assume durable persistence without first migrating off SQLite.
- Auth via Clerk is optional. When `CLERK_SECRET_KEY` is unset, the backend treats every request as `user_id="local-dev"`. See [backend/src/utils.py](backend/src/utils.py).
