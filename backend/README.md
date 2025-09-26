# Backend (Python)

This folder contains the Python backend (FastAPI) for the project, organized as follows:

```
backend/
│
├── app/
│   ├── main.py              # FastAPI app initialization and middleware
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   │
│   ├── models/
│   │   └── sweet.py         # (Optional) MongoDB document models
│   ├── schemas/
│   │   ├── user.py          # User schemas
│   │   └── sweet.py         # Sweet schemas
│   ├── auth/
│   │   ├── utils.py         # Password hashing, JWT functions
│   │   └── dependencies.py  # Auth dependencies
│   └── routers/
│       ├── auth.py          # Authentication routes
│       ├── sweets.py        # Sweet management routes
│       └── inventory.py     # Inventory management routes
│
├── tests/
│   ├── test_auth.py
│   ├── test_sweets.py
│   └── test_inventory.py
│
├── requirements.txt
├── .env.example
└── README.md
```

## Setup

### 1. Create and activate virtual environment (Windows):
```powershell
python -m venv venv
.\venv\Scripts\Activate
```

### 2. Install dependencies:
```powershell
pip install -r requirements.txt
```

### 3. Set environment variables:
Copy `.env.example` to `.env` and update values as needed.

### 4. Run the FastAPI server:
```powershell
uvicorn app.main:app --reload
```

### 5. MongoDB
Ensure MongoDB is running and accessible at the URI specified in `.env`.

## Running Tests

To run backend API tests:

```powershell
pytest tests/
```