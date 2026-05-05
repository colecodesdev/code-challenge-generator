# Current Feature

## Status

In Progress

## Goals

Add a header comment to `frontend/.env.production` warning that it must never hold sensitive values. The file is intentionally tracked in git (`!.env.production` carve-out in `.gitignore`), but every `VITE_*` variable is baked into the public JS bundle, so any secret added here would leak permanently into git history.

## Notes

- Code-scanner finding #12 (low). Sites: [frontend/.env.production](frontend/.env.production), [.gitignore:16](.gitignore#L16).
- Pure documentation change. No behavior change.
- Clerk publishable keys are not secrets, so the file remains usable for that case if Clerk auth is wired up later.

## History
