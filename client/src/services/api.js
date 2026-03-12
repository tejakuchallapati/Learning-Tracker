import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
});

// Add a request interceptor to attach the JWT token
API.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        if (!token && localStorage.getItem('user')) {
            token = 'mock_token';
            localStorage.setItem('token', token);
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401s gracefully in guest mode
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized API call, providing mock fallback data.');
            // Fallback for dashboard
            if (error.config.url.includes('/analytics/dashboard')) {
                return Promise.resolve({ data: { totalStudyHours: 42, weeklyStudyHours: 12, completionRate: 75 } });
            }
            // Fallback for goals
            if (error.config.url.includes('/goals')) {
                return Promise.resolve({ data: [] });
            }
        }
        return Promise.reject(error);
    }
);

export default API;
