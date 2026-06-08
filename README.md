# Learning Tracker

Full-stack learning progress tracker — React UI at the repo root, Express API in `server/`.

## Tech stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Recharts, Axios  
**Backend:** Node.js, Express, MongoDB, JWT, Nodemailer

## Run locally

```bash
npm run install:all
npm run dev
```

- App: http://localhost:3000  
- API: http://localhost:5001/api  

Copy `.env.example` → `.env` (frontend) and `server/.env.example` → `server/.env` (API).

## Project layout

```
Learning-Tracker/
├── src/          # React frontend (repo root)
├── server/       # Express API
└── docs/         # More detail
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md).

## Deploy

- **Vercel** — root directory: `.` (default)
- **Render** — root directory: `server`, build: `npm install`, start: `npm start`
