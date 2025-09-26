from pydantic import BaseModel
from typing import Optional
from pydantic import ConfigDict

class User(BaseModel):
    username: str
    password: str
    is_admin: Optional[bool] = False
    model_config = ConfigDict(from_attributes=True)

class UserInDB(User):
    hashed_password: str
