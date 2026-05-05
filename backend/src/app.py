from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_allowed_origins
from .routes import challenge

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(challenge.router, prefix="/api")