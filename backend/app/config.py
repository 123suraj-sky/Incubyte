import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
SECRET_KEY = os.getenv("SECRET_KEY", "kata_sweet_shop_secret_key_of_nitrr")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
DB_NAME = "kata_sweet_shop"
