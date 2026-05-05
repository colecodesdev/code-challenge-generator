from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Literal
import json
import logging

from ..ai_generator import generate_challenge_with_ai
from ..utils import authenticate_and_get_user_details
from ..database.models import get_db
from ..database.db import (
    get_challenge_quota,
    create_challenge,
    create_challenge_quota,
    reset_quota_if_needed,
    get_user_challenges,
)

router = APIRouter()

logger = logging.getLogger(__name__)

class ChallengeRequest(BaseModel):
    model_config = ConfigDict(json_schema_extra={"example": {"difficulty": "easy"}})

    difficulty: Literal["easy", "medium", "hard"]

def serialize_quota(quota):
    return {
        "user_id": quota.user_id,
        "quota_remaining": quota.quota_remaining,
        "last_reset_date": quota.last_reset_date.isoformat() if quota.last_reset_date else None,
    }

def serialize_challenge(ch):
    return {
        "id": ch.id,
        "difficulty": ch.difficulty,
        "title": ch.title,
        "options": json.loads(ch.options) if isinstance(ch.options, str) else ch.options,
        "prompt": ch.prompt,
        "correct_answer_id": ch.correct_answer_id,
        "explanation": ch.explanation,
        "created_at": ch.date_created.isoformat() if ch.date_created else None,
    }

@router.post("/generate-challenge")
async def generate_challenge(payload: ChallengeRequest, request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    quota = get_challenge_quota(db, user_id)
    if not quota:
        quota = create_challenge_quota(db, user_id)

    quota = reset_quota_if_needed(db, quota)

    if quota.quota_remaining <= 0:
        raise HTTPException(status_code=429, detail="Daily quota exceeded")

    try:
        challenge_data = generate_challenge_with_ai(payload.difficulty)
    except RuntimeError as e:
        msg = str(e)
        if "OPENAI_API_KEY is not set" in msg:
            raise HTTPException(status_code=400, detail=msg)
        logger.exception("Challenge generation failed")
        raise HTTPException(status_code=500, detail="Failed to generate challenge")
    except Exception:
        logger.exception("Upstream AI service error")
        raise HTTPException(status_code=502, detail="Upstream AI service error")

    options_json = json.dumps(challenge_data["options"])
    new_challenge = create_challenge(
        db=db,
        difficulty=payload.difficulty,
        created_by=user_id,
        title=challenge_data["title"],
        prompt=challenge_data["prompt"],
        options=options_json,
        correct_answer_id=challenge_data["correct_answer_id"],
        explanation=challenge_data["explanation"],
    )

    quota.quota_remaining -= 1
    db.commit()
    db.refresh(quota)

    return serialize_challenge(new_challenge)

@router.get("/history")
async def history(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    challenges = get_user_challenges(db, user_id)
    return [serialize_challenge(c) for c in challenges]

@router.get("/quota")
async def get_quota(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    quota = get_challenge_quota(db, user_id)
    if not quota:
        quota = create_challenge_quota(db, user_id)

    quota = reset_quota_if_needed(db, quota)
    return serialize_quota(quota)