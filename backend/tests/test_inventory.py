from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_inventory():
    client.post("/api/auth/register", json={"username": "admin2", "password": "adminpass2", "is_admin": True})
    login_resp = client.post("/api/auth/login", data={"username": "admin2", "password": "adminpass2"})
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    sweet = {"name": "Barfi", "category": "Indian", "price": 15.0, "quantity": 5}
    add_resp = client.post("/api/sweets/", json=sweet, headers=headers)
    sweet_id = add_resp.json()["id"]

    purchase_resp = client.post(f"/api/sweets/{sweet_id}/purchase", headers=headers)
    assert purchase_resp.status_code == 200

    restock_resp = client.post(f"/api/sweets/{sweet_id}/restock?amount=10", headers=headers)
    assert restock_resp.status_code == 200
