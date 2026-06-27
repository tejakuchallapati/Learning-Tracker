# Project structure

```
Learning-Tracker/
├── client/              # React frontend (Vercel)
├── server/              # Express API (Render)
├── docs/                # LAUNCH.md — env vars & deploy
├── scripts/             # check-users.js
└── package.json
```

## Frontend (`client/`)

| Path | Purpose |
|------|---------|
| `src/app/` | Routing |
| `src/pages/` | Screens (Login, Dashboard, Goals, Settings, …) |
| `src/services/api.js` | API client → Render |
| `src/context/` | Auth session |

**Run:** `npm run dev --prefix client` (port 3000)

## Backend (`server/`)

| Path | Purpose |
|------|---------|
| `server.js` | Express entry |
| `src/controllers/authController.js` | Email OTP login |
| `src/utils/otpService.js` | OTP + Brevo send |
| `src/utils/emailService.js` | Brevo transactional email |
| `src/utils/cronJobs.js` | Daily reminder emails |
| `scripts/` | testEmail, verifyReminders, pingReminders |

**Run:** `npm run dev --prefix server` (port 5001)

## Environment variables

**Render:** `BREVO_API_KEY`, `EMAIL_FROM`, `MONGO_URI`, `JWT_SECRET`, `CRON_SECRET`, `FRONTEND_URL`, …  
**Vercel:** `VITE_API_BASE_URL` only (full Render URL with `/api`)

Full list: [LAUNCH.md](./LAUNCH.md)

## Commands

```bash
npm run install:all
npm run dev
npm run build
```
