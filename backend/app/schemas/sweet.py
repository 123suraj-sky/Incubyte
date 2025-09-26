from pydantic import BaseModel, ConfigDict
from typing import Optional

class Sweet(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: Optional[str] = None
    name: str
    category: str
    price: float
    quantity: int

    
    # class Config:
    #     from_attributes = True
