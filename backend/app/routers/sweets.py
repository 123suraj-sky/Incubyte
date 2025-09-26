from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from bson import ObjectId
from app.schemas.sweet import Sweet
from app.auth.dependencies import get_current_user, get_current_admin_user
from app.database import sweets_col

router = APIRouter(prefix="/api/sweets", tags=["sweets"])


@router.post("/", response_model=Sweet)
def add_sweet(sweet: Sweet, current_user: dict = Depends(get_current_user)):
    sweet_dict = sweet.model_dump()
    sweet_dict.pop("id", None)
    result = sweets_col.insert_one(sweet_dict)
    sweet_dict["id"] = str(result.inserted_id)
    return sweet_dict


@router.get("/", response_model=List[Sweet])
def list_sweets(current_user: dict = Depends(get_current_user)):
    sweets = []
    for s in sweets_col.find():
        s["id"] = str(s["_id"])
        s.pop("_id")
        sweets.append(s)
    return sweets


@router.get("/search", response_model=List[Sweet])
def search_sweets(name: Optional[str] = None, category: Optional[str] = None, min_price: Optional[float] = None, max_price: Optional[float] = None, current_user: dict = Depends(get_current_user)):
    query = {}
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    if category:
        query["category"] = category
    if min_price is not None or max_price is not None:
        query["price"] = {}
        if min_price is not None:
            query["price"]["$gte"] = min_price
        if max_price is not None:
            query["price"]["$lte"] = max_price
    sweets = []
    for s in sweets_col.find(query):
        s["id"] = str(s["_id"])
        s.pop("_id")
        sweets.append(s)
    return sweets


@router.put("/{sweet_id}", response_model=Sweet)
def update_sweet(sweet_id: str, sweet: Sweet, current_user: dict = Depends(get_current_user)):
    sweet_dict = sweet.model_dump()
    sweet_dict.pop("id", None)
    result = sweets_col.update_one(
        {"_id": ObjectId(sweet_id)}, {"$set": sweet_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Sweet not found")
    sweet_dict["id"] = sweet_id
    return sweet_dict


@router.delete("/{sweet_id}")
def delete_sweet(sweet_id: str, current_user: dict = Depends(get_current_admin_user)):
    result = sweets_col.delete_one({"_id": ObjectId(sweet_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return {"detail": "Sweet deleted"}
