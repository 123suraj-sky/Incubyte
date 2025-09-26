from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.config import SECRET_KEY, ALGORITHM
from app.database import users_col

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_user(username: str):
    user = users_col.find_one({"username": username})
    if user:
        return {"username": user["username"], "hashed_password": user["password"], "is_admin": user.get("is_admin", False)}
    return None

def authenticate_user(username: str, password: str, verify_password):
    user = get_user(username)
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return user

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(username)
    if user is None:
        raise credentials_exception
    return user

def get_current_admin_user(current_user: dict = Depends(get_current_user)):
    if not current_user.get("is_admin", False):
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user
