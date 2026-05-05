import os

DEFAULT_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
]


def get_allowed_origins() -> list[str]:
    raw = os.getenv("CORS_ORIGINS", "")
    parsed = [o.strip() for o in raw.split(",") if o.strip()]
    return parsed or DEFAULT_ALLOWED_ORIGINS
