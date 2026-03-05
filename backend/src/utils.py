from fastapi import HTTPException, Request
from dotenv import load_dotenv
import os

load_dotenv()

def authenticate_and_get_user_details(request: Request):
    auth_header = request.headers.get("authorization")

    if not auth_header:
        return {"user_id": "local-dev"}

    clerk_secret = os.getenv("CLERK_SECRET_KEY")
    if not clerk_secret:
        raise HTTPException(status_code=401, detail="Auth required but CLERK_SECRET_KEY is not set")

    try:
        from clerk_backend_api import Clerk, AuthenticateRequestOptions

        clerk_sdk = Clerk(bearer_auth=clerk_secret)
        request_state = clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173", "http://localhost:5174"],
                jwt_key=os.getenv("JWT_KEY"),
            ),
        )

        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Invalid token")

        user_id = request_state.payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {"user_id": user_id}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))