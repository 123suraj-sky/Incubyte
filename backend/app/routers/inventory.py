from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.auth.dependencies import get_current_user, get_current_admin_user
from app.database import sweets_col

router = APIRouter(prefix="/api/sweets", tags=["inventory"])

@router.post("/{sweet_id}/purchase")
def purchase_sweet(sweet_id: str, current_user: dict = Depends(get_current_user)):
    sweet = sweets_col.find_one({"_id": ObjectId(sweet_id)})
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if sweet["quantity"] <= 0:
        raise HTTPException(status_code=400, detail="Out of stock")
    sweets_col.update_one({"_id": ObjectId(sweet_id)}, {"$inc": {"quantity": -1}})
    return {"detail": "Purchase successful"}

@router.post("/{sweet_id}/restock")
def restock_sweet(sweet_id: str, amount: int, current_user: dict = Depends(get_current_admin_user)):
    sweet = sweets_col.find_one({"_id": ObjectId(sweet_id)})
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    sweets_col.update_one({"_id": ObjectId(sweet_id)}, {"$inc": {"quantity": amount}})
    return {"detail": f"Restocked {amount} units"}
