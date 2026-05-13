# Learning Tracker – Learning Progress & Productivity Tracker

Learning Tracker is a full-stack platform where developers can track their learning goals, monitor daily progress, and stay consistent using smart reminders and analytics.

---

## 🛠 Tech Stack
**Frontend:** React (Vite), Tailwind CSS, React Router, Recharts, Axios
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Nodemailer

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [MongoDB Cluster](https://www.mongodb.com/atlas) or a local MongoDB instance.

### 1️⃣ Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Look at the `.env` file inside the `server/` directory. Make sure to:
   - Update `MONGO_URI` if you are using a cloud database (currently defaults to `mongodb://localhost:27017/devtrack`).
   - Add your Gmail credentials to `EMAIL_USER` and `EMAIL_PASS` (generate an App Password) to enable Nodemailer reminders.
4. Start the server:
   ```bash
   npm run dev
   # If you use node instead of nodemon:
   # node server.js
   ```
   *The server runs on http://localhost:5000*

### 2️⃣ Frontend Setup
1. Open a new terminal tab and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React app:
   ```bash
   npm run dev
   ```
   *The frontend runs usually on http://localhost:5173*

---

## 📂 Project Structure

- `server/` - Express API handling MongoDB, Auth, Goals, Progress, Time Tracking, and Analytics.
- `client/` - Clean React UI with modular Components and Pages, consuming the backend REST API via Axios.

Enjoy tracking your tech journey!
