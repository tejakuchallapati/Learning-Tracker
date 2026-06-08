const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ─── CORS must be FIRST, before any body parsers ──────────────────────────────
// Preflight OPTIONS requests must receive CORS headers before reaching any other middleware
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://learning-tracker-two-xi.vercel.app',
    'https://learning-tracker-ycxw.vercel.app',
    process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Allow Vercel preview/production deployments (*.vercel.app)
        if (/^https:\/\/[\w-]+\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// cors() middleware handles OPTIONS preflight — do not use app.options('*') on Express 5
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/goals', require('./src/routes/goalRoutes'));
app.use('/api/progress', require('./src/routes/progressRoutes'));
app.use('/api/time', require('./src/routes/timeRoutes'));
app.use('/api/analytics', require('./src/routes/analyticsRoutes'));
app.use('/api/daily-goals', require('./src/routes/dailyGoalRoutes'));
app.use('/api/notes', require('./src/routes/noteRoutes'));

// Initialize cron jobs
const mongoose = require('mongoose');
const { checkAndSendReminders } = require('./src/utils/cronJobs');

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established. Running startup email reminders check...');
    checkAndSendReminders();
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
