from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import User
from app.auth.utils import get_password_hash, create_access_token, verify_password
from app.auth.dependencies import authenticate_user, get_user, get_current_user
from app.database import users_col

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register")
def register(user: User):
    if users_col.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    users_col.insert_one({"username": user.username, "password": hashed_password, "is_admin": user.is_admin})
    access_token = create_access_token(data={"sub": user.username, "is_admin": user.is_admin})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password, verify_password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user["username"], "is_admin": user["is_admin"]})
    return {"access_token": access_token, "token_type": "bearer"}


