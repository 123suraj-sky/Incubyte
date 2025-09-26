# Frontend (React)

This folder contains the React frontend for the Sweet Shop project.

```
frontend/
│
├── src/
│   ├── pages/                # Pages (Dashboard, Auth)
│   ├── components/           # UI components
│   ├── contexts/             # Auth context
│   ├── hooks/                # Custom hooks (useAuth, useSweets)
│   ├── services/             # API client (axios)
│   ├── utils/                # Constants
│   └── styles/               # Global styles
│
├── public/
├── package.json
└── README.md
```

## Prerequisites
- Node.js 18+ and npm
- Backend running at `http://localhost:8000` (or set `REACT_APP_API_URL`)

## Setup

### 1) Install dependencies
```powershell
npm install
```

### 2) Configure environment (optional)
Create a `.env` in `frontend/` if your backend URL differs:
```env
REACT_APP_API_URL=http://localhost:8000
```

### 3) Start the dev server
```powershell
npm start
```
The app runs at `http://localhost:3000`.

## Login/Roles
- Use regular registration/login for normal users.
- Admins are seeded in the backend on startup:
  - `admin1 / adminpass1`
  - `admin2 / adminpass2`
- On the login page, click “Login as Admin” to switch to admin credentials mode.

## Tests

This project uses Create React App’s test runner (Jest + React Testing Library).

- Run all tests in watch mode:
```powershell
npm test
```

- Run tests once (CI mode):
```powershell
npm test -- --watchAll=false
```

- Run a specific test file:
```powershell
npm test -- src/components/LoginForm.jsx
```

- Generate coverage report:
```powershell
npm test -- --coverage --watchAll=false
```
The coverage report is written to `frontend/coverage/`.

## Common Scripts
- `npm start`: start dev server
- `npm test`: run tests (watch mode)
- `npm run build`: production build

## Notes
- Ensure your browser allows requests from `http://localhost:3000` to your backend URL.
- The frontend automatically attaches the JWT token from `localStorage` to API calls.
