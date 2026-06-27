import axios from 'axios';
import { dispatchSessionExpired } from '../utils/authEvents';

const PRODUCTION_API = 'https://learning-tracker-api-hqzm.onrender.com/api';

/** In production, only absolute http(s) URLs are valid — not `/api` (that hits Vercel, not Render). */
const resolveBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL?.trim();
    if (import.meta.env.DEV) {
        return envUrl || '/api';
    }
    if (envUrl && /^https?:\/\//i.test(envUrl)) {
        return envUrl.replace(/\/$/, '');
    }
    return PRODUCTION_API;
};

const API = axios.create({
    baseURL: resolveBaseUrl(),
    timeout: 60000,
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const url = error.config?.url || '';
            const isAuthAttempt =
                url.includes('auth/send-otp') ||
                url.includes('auth/verify-otp') ||
                url.includes('auth/me');
            if (!isAuthAttempt) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatchSessionExpired();
            }
        }
        return Promise.reject(error);
    }
);

export default API;
