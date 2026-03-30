import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://devtrack-backend.onrender.com/api',
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
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optional: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;
