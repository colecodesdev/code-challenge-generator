# Current Feature

## Status

In Progress

## Goals

Stop silently truncating AI responses. `max_tokens=400` is too tight for a 4-option challenge that includes a code snippet plus a real explanation, so longer hard-difficulty challenges get cut off mid-JSON and surface as opaque "not valid JSON" errors.

## Notes

- Code-scanner finding #6 (medium). Site: [backend/src/ai_generator.py:45](backend/src/ai_generator.py#L45).
- Bump default to 800 (agent's recommendation) and expose it as `OPENAI_MAX_TOKENS` env so future tuning does not require a deploy. Mirrors the existing `OPENAI_MODEL` pattern.
- Add an explicit `finish_reason == "length"` check after the API call. If the model hit the cap, raise a clear `RuntimeError("AI response was truncated...")` before attempting JSON parsing, so the operator log shows the actual cause instead of "not valid JSON".

## History
