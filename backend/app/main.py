from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, sweets, inventory
from app.database import users_col
from app.auth.utils import get_password_hash

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(sweets.router)
app.include_router(inventory.router)

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.on_event("startup")
def seed_admins():
    admins = [
        {"username": "admin1", "password": "adminpass1"},
        {"username": "admin2", "password": "adminpass2"},
    ]
    for admin in admins:
        if not users_col.find_one({"username": admin["username"]}):
            users_col.insert_one({
                "username": admin["username"],
                "password": get_password_hash(admin["password"]),
                "is_admin": True
            })
