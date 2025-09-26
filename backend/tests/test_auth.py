from fastapi.testclient import TestClient
from app.main import app
import uuid

client = TestClient(app)

def test_register_and_login():
    # Generate a unique username for each test run
    unique_username = f"testuser_{uuid.uuid4().hex[:8]}"
    
    response = client.post("/api/auth/register", json={"username": unique_username, "password": "testpass", "is_admin": False})
    assert response.status_code == 200
    token = response.json()["access_token"]
    assert token

    response = client.post("/api/auth/login", data={"username": unique_username, "password": "testpass"})
    assert response.status_code == 200
    token = response.json()["access_token"]
    assert token
