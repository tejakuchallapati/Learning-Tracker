# Learning Tracker – Learning Progress & Productivity Tracker

Learning Tracker is a full-stack platform where developers can track their learning goals, monitor daily progress, and stay consistent using smart reminders and analytics.

---

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Recharts, Axios  
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Nodemailer

---

## How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- A [MongoDB Cluster](https://www.mongodb.com/atlas) or a local MongoDB instance

### Option A — Run both apps from the repo root

```bash
npm run install:all
npm run dev
```

### Option B — Run frontend and backend separately

**Backend**

```bash
cd backend
npm install
# Configure backend/.env (see backend/.env.example)
npm run dev
```

API runs on `http://localhost:5001` (or your `PORT` in `.env`).

**Frontend**

```bash
cd frontend
npm install
# Configure frontend/.env (see frontend/.env.example)
npm run dev
```

UI runs on `http://localhost:3000`.

---

## Project Structure

```
Learning-Tracker/
├── frontend/     # React UI (Vite)
├── backend/      # Express API + MongoDB
├── scripts/      # Repo-level utility scripts
└── docs/         # Documentation
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for the full folder breakdown.

---

Enjoy tracking your tech journey!
