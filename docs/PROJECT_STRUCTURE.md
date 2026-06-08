# Project Structure

```
Learning-Tracker/
├── src/                 # React app (frontend at repo root)
├── public/              # Static assets for Vite
├── server/              # Express API (Render deploys this folder)
├── scripts/             # Repo utility scripts
├── docs/                # Documentation
├── package.json         # Frontend dependencies & dev scripts
├── vite.config.js
├── index.html
└── vercel.json          # Vercel deploys repo root (frontend)
```

## Frontend (repo root)

| Path | Purpose |
|------|---------|
| `src/app/` | App entry, routing |
| `src/pages/` | Route screens |
| `src/components/` | UI by feature (`layout`, `goals`, `dashboard`, `auth`, `landing`, `ui`) |
| `src/context/` | React context |
| `src/services/` | API client |
| `src/styles/` | Global CSS |

**Run:** `npm run dev` (port 3000)

## Backend (`server/`)

| Path | Purpose |
|------|---------|
| `server.js` | Express entry |
| `src/controllers/` | Route handlers |
| `src/models/` | Mongoose models |
| `src/routes/` | API routes |
| `src/middleware/` | Auth |
| `src/config/` | DB & OAuth |
| `src/utils/` | Email, cron |
| `scripts/` | Maintenance scripts |

**Run:** `npm run dev --prefix server` (port 5001)

## Deploy

| Platform | Root directory | Build | Start |
|----------|----------------|-------|-------|
| **Vercel** | `.` (repo root) | `npm run build` | static |
| **Render** | `server` | `npm install` | `npm start` |

## Quick commands

```bash
npm run install:all   # Install root + server deps
npm run dev           # Frontend + API together
```
