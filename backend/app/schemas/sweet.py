"""Pydantic schema representing a Sweet entity."""

from pydantic import BaseModel, ConfigDict
from typing import Optional


class Sweet(BaseModel):
    """API model for sweets stored in MongoDB.

    - `id` is optional because MongoDB generates it on insert.
    - `model_config.from_attributes` enables compatibility with ORM/ODM objects.
    """

    model_config = ConfigDict(from_attributes=True)

    id: Optional[str] = None
    name: str
    category: str
    price: float
    quantity: int

