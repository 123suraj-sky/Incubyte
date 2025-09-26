from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_sweets_crud():
    client.post("/api/auth/register", json={"username": "admin", "password": "adminpass", "is_admin": True})
    login_resp = client.post("/api/auth/login", data={"username": "admin", "password": "adminpass"})
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    sweet = {"name": "Ladoo", "category": "Indian", "price": 10.0, "quantity": 100}
    add_resp = client.post("/api/sweets/", json=sweet, headers=headers)
    assert add_resp.status_code == 200
    sweet_id = add_resp.json()["id"]

    list_resp = client.get("/api/sweets/", headers=headers)
    assert list_resp.status_code == 200
    assert any(s["id"] == sweet_id for s in list_resp.json())

    search_resp = client.get("/api/sweets/search?name=Ladoo", headers=headers)
    assert search_resp.status_code == 200
    assert any(s["name"] == "Ladoo" for s in search_resp.json())

    update = {"name": "Ladoo", "category": "Indian", "price": 12.0, "quantity": 90}
    update_resp = client.put(f"/api/sweets/{sweet_id}", json=update, headers=headers)
    assert update_resp.status_code == 200
    assert update_resp.json()["price"] == 12.0

    delete_resp = client.delete(f"/api/sweets/{sweet_id}", headers=headers)
    assert delete_resp.status_code == 200
