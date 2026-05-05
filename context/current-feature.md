# Current Feature

## Status

In Progress

## Goals

Stop forwarding internal exception messages to API clients via `detail=str(e)`. Log the underlying error server-side and return a generic message so OpenAI SDK strings, stack details, and library version info do not appear in HTTP responses.

## Notes

- Code-scanner finding #2 (high). Sites: [backend/src/utils.py:41](backend/src/utils.py#L41), [backend/src/routes/challenge.py:65](backend/src/routes/challenge.py#L65), [backend/src/routes/challenge.py:67](backend/src/routes/challenge.py#L67).
- The `OPENAI_API_KEY is not set` branch in `challenge.py` keeps `str(e)` because the message is operator-friendly and not sensitive. The catch-all branch and the unknown-error path in `utils.py` switch to generic copy.
- Logging uses the stdlib `logging` module with `.exception()` so the full traceback lands in container stdout (CloudWatch).

## History
