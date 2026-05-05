# Current Feature

## Status

In Progress

## Goals

Add return type annotations to public backend functions per [coding-standards.md](context/coding-standards.md). FastAPI uses these hints for OpenAPI generation; missing types skip response validation. Two route serializers (`serialize_quota`, `serialize_challenge`) also have no parameter types.

## Notes

- Code-scanner finding #9 (medium). Sites: [backend/src/ai_generator.py](backend/src/ai_generator.py), [backend/src/utils.py](backend/src/utils.py), [backend/src/database/db.py](backend/src/database/db.py), [backend/src/routes/challenge.py](backend/src/routes/challenge.py).
- PEP 604 union syntax (`X | None`), not `Optional[X]`.
- Pure annotation change. No runtime behavior change. Response shapes are unchanged so OpenAPI schema only gains return-type info.

## History
