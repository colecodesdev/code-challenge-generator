# Current Feature

## Status

In Progress

## Goals

Make Clerk's `authorized_parties` aware of the production frontend origin. Currently hardcoded to `http://localhost:5173` / `http://localhost:5174`, so any Clerk JWT issued to the CloudFront origin fails the check and returns 401 in production.

## Notes

- Code-scanner finding #1 (high). Site: [backend/src/utils.py:24](backend/src/utils.py#L24).
- Reuses the existing `CORS_ORIGINS` env (same set of trusted frontend origins) rather than introducing a new `FRONTEND_URL`. The list of origins we accept browser requests from is exactly the list of origins whose JWTs we trust.
- Parser extracted into [backend/src/config.py](backend/src/config.py) so [backend/src/app.py](backend/src/app.py) and [backend/src/utils.py](backend/src/utils.py) share one source of truth.
- `.env.example` comment expanded to mention both uses.

## History
