"""Pydantic schemas for user-related payloads."""

from pydantic import BaseModel
from typing import Optional
from pydantic import ConfigDict

class User(BaseModel):
    """Public user payload used for registration and authentication."""
    username: str
    password: str
    is_admin: Optional[bool] = False
    model_config = ConfigDict(from_attributes=True)

class UserInDB(User):
    """Internal user model including the hashed password."""
    hashed_password: str
