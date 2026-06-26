import axios from 'axios';
import { dispatchSessionExpired } from '../utils/authEvents';

const API = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL ||
        (import.meta.env.DEV ? '/api' : 'https://learning-tracker-ko02.onrender.com/api'),
    timeout: 15000,
});

// Add a request interceptor to attach the JWT token
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

// Add a response interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const url = error.config?.url || '';
            const isAuthAttempt =
                url.includes('auth/login') ||
                url.includes('auth/google') ||
                url.includes('auth/register') ||
                url.includes('auth/me') ||
                url.includes('auth/forgot-password') ||
                url.includes('auth/reset-password');
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
