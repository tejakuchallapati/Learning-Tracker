# Learning Tracker

Full-stack learning progress tracker with a clear **client / server** layout.

## Project layout

```
Learning-Tracker/
├── client/          # React frontend (Vercel)
├── server/          # Express API (Render)
├── docs/            # Documentation
└── package.json     # Run both apps from here
```

## Tech stack

**Frontend (`client/`):** React, Vite, Tailwind CSS, React Router, Recharts, Axios  
**Backend (`server/`):** Node.js, Express, MongoDB, JWT, Nodemailer

## Run locally

```bash
npm run install:all
cp server/.env.example server/.env   # first time — add MONGO_URI & JWT_SECRET
npm run dev
```

- App: http://localhost:3000  
- API: http://localhost:5001/api  

Only `server/.env` is required for local dev. The client proxies `/api` to the server automatically.

## Deploy

| Platform | Root directory | Notes |
|----------|----------------|-------|
| **Vercel** | `client` | Build: `npm run build`, Output: `dist` |
| **Render** | `server` | Build: `npm install`, Start: `npm start` |

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for more detail.
