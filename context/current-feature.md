# Current Feature

## Status

In Progress

## Goals

Constrain `ChallengeRequest.difficulty` to the three valid values (`easy`, `medium`, `hard`) using `typing.Literal`, eliminating the prompt-injection vector where arbitrary user-supplied strings flow directly into the OpenAI prompt template. Same edit upgrades the model from Pydantic v1 `class Config` to v2 `model_config = ConfigDict(...)`, satisfying the project's coding standards.

## Notes

- Code-scanner findings #3 (high) and #8 (medium) — both touch [backend/src/routes/challenge.py:20-24](backend/src/routes/challenge.py#L20-L24), so combined into one PR.
- Behavior change: any difficulty value other than `easy`/`medium`/`hard` now returns 422 instead of being passed through to OpenAI. Frontend only ever sends those three values, so no client change required.

## History
