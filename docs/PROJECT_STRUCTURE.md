# Project Structure

Learning Tracker is organized as a monorepo with a clear split between frontend, backend, and utility scripts.

```
Learning-Tracker/
├── frontend/                 # React + Vite UI
├── backend/                  # Express + MongoDB API
├── scripts/                  # Repo-level maintenance scripts
├── docs/                     # Project documentation
├── package.json              # Root scripts (run both apps)
├── render.yaml               # Backend deployment (Render)
└── README.md
```

## Frontend (`frontend/`)

| Path | Purpose |
|------|---------|
| `src/app/` | App entry (`main.jsx`, `App.jsx`, routing shell) |
| `src/pages/` | Route-level screens (Dashboard, Goals, Notes, etc.) |
| `src/components/layout/` | Navbar, Sidebar, MobileNav |
| `src/components/goals/` | Daily goals UI and consistency graph |
| `src/components/dashboard/` | Stats, charts, progress bars |
| `src/components/auth/` | Signup form and Google login |
| `src/components/landing/` | Landing page sections |
| `src/components/ui/` | Shared UI primitives |
| `src/components/icons/` | Nav and icon helpers |
| `src/context/` | React context (auth) |
| `src/services/` | API client (Axios) |
| `src/config/` | Nav items and styles |
| `src/hooks/` | Custom React hooks |
| `src/utils/` | Frontend helpers |
| `src/lib/` | Shared libraries (e.g. `cn` utility) |
| `src/data/` | Static course/roadmap data |
| `src/assets/` | Images and static assets |
| `src/styles/` | Global CSS (`index.css`) |
| `public/` | Static files served by Vite |

**Run locally:** `cd frontend && npm run dev` (port 3000)

## Backend (`backend/`)

| Path | Purpose |
|------|---------|
| `server.js` | Express app entry point |
| `src/controllers/` | Request handlers |
| `src/models/` | Mongoose schemas |
| `src/routes/` | API route definitions |
| `src/middleware/` | Auth and other middleware |
| `src/config/` | DB and OAuth config |
| `src/utils/` | Email, cron jobs, helpers |
| `scripts/` | One-off DB/admin scripts |

**API base:** `http://localhost:5001/api` (see `backend/.env`)

**Run locally:** `cd backend && npm run dev`

## Scripts (`scripts/`)

| Script | Purpose |
|--------|---------|
| `check-users.js` | List users in MongoDB |

Backend maintenance scripts live in `backend/scripts/` (reset password, test email, check goals, etc.).

## Quick commands (from repo root)

```bash
npm run install:all   # Install root + frontend + backend deps
npm run dev           # Start frontend and backend together
```
