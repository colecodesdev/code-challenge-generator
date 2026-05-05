# Current Feature

## Status

In Progress

## Goals

Migrate the ORM `Base` from the legacy `sqlalchemy.ext.declarative.declarative_base()` shim to SQLAlchemy 2.0's `DeclarativeBase` class, satisfying [coding-standards.md](context/coding-standards.md). The legacy import was confirmed to no longer exist in the currently installed SQLAlchemy 2.0.47, so this is the difference between "deprecation warning" and "ImportError on app start" depending on patch version.

## Notes

- Code-scanner finding #7 (medium). Site: [backend/src/database/models.py:2](backend/src/database/models.py#L2), [backend/src/database/models.py:7](backend/src/database/models.py#L7).
- Pure rename: `from sqlalchemy.orm import DeclarativeBase` and `class Base(DeclarativeBase): pass`. No table-shape change, no migration.
- Scope intentionally narrow: not splitting models.py engine setup into the `db.py`/`models.py` layout the standards prefer. That's a larger refactor; do it separately.

## History
