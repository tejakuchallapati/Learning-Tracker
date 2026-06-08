# Project Structure

```
Learning-Tracker/
├── client/              # React frontend (Vercel deploys this folder)
│   ├── src/             # App source
│   ├── public/          # Static assets
│   ├── index.html       # Vite entry
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
├── server/              # Express API (Render deploys this folder)
│   ├── server.js        # Entry point
│   ├── src/             # Controllers, models, routes, etc.
│   ├── scripts/         # Maintenance scripts
│   └── package.json
├── docs/                  # Documentation
├── scripts/               # Repo-level utilities
└── package.json           # Dev scripts to run client + server
```

## Frontend (`client/`)

| Path | Purpose |
|------|---------|
| `src/app/` | App entry, routing |
| `src/pages/` | Route screens |
| `src/components/` | UI by feature |
| `src/context/` | React context |
| `src/services/` | API client |
| `src/styles/` | Global CSS |

**Run:** `npm run dev --prefix client` (port 3000)

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
| **Vercel** | `client` | `npm run build` | static (`dist`) |
| **Render** | `server` | `npm install` | `npm start` |

## Quick commands

```bash
npm run install:all   # Install root + server + client deps
npm run dev           # Frontend + API together
npm run dev:client    # Frontend only
npm run dev:server    # API only
```
