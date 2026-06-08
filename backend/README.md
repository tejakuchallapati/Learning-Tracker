# Backend

Express API for Learning Tracker.

## Structure

- `server.js` — app entry
- `src/controllers/` — route handlers
- `src/models/` — Mongoose models
- `src/routes/` — API routes (`/api/*`)
- `src/middleware/` — auth middleware
- `src/config/` — database and OAuth
- `src/utils/` — email, cron, helpers
- `scripts/` — one-off maintenance scripts

## Commands

```bash
npm install
cp .env.example .env   # then fill in secrets
npm run dev            # nodemon
npm start              # production
```

## Maintenance scripts

Run from `backend/`:

```bash
node scripts/test_email.js
node scripts/check-goals.js
node scripts/reset-password.js
```
