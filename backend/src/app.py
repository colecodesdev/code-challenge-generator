import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import challenge

DEFAULT_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
]

origins_env = os.getenv("CORS_ORIGINS", "")
allow_origins = [o.strip() for o in origins_env.split(",") if o.strip()] or DEFAULT_ORIGINS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(challenge.router, prefix="/api")