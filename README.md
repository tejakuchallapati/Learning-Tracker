# Learning Tracker

Full-stack daily goals app — email OTP login and email reminders via **Brevo**.

## Project layout

```
Learning-Tracker/
├── client/          # React frontend (Vercel)
├── server/          # Express API (Render)
├── docs/            # LAUNCH.md, structure notes
└── package.json     # Run both apps from here
```

## Tech stack

**Frontend:** React, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB, JWT, Brevo (email OTP + reminders)

## Run locally

```bash
npm run install:all
cp server/.env.example server/.env   # add MONGO_URI, JWT_SECRET, BREVO_API_KEY
npm run dev
```

- App: http://localhost:3000  
- API: http://localhost:5001/api  

## Deploy

See **[docs/LAUNCH.md](docs/LAUNCH.md)** for Render, Vercel, and Brevo setup.

| Platform | Root directory |
|----------|----------------|
| **Vercel** | `client` |
| **Render** | `server` |
