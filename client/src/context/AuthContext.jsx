import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { AuthContext } from './AuthContextType';
export { AuthContext };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('user');
            if (saved && saved !== 'undefined') return JSON.parse(saved);
        } catch (error) {
            console.error('Auth initialization error:', error);
        }
        const guestUser = {
            id: 'guest_user_123',
            name: 'Guest Learner',
            email: 'guest@example.com',
            token: 'mock_token'
        };
        localStorage.setItem('user', JSON.stringify(guestUser));
        localStorage.setItem('token', 'mock_token');
        return guestUser;
    });
    const loading = false;

    // Persist user changes and check token integrity
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            // Force the mock token if it's missing to prevent 401s in guest mode
            if (!localStorage.getItem('token')) {
                localStorage.setItem('token', 'mock_token');
            }
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user]);

    const login = async (email, password) => {
        const { data } = await API.post('/auth/login', { email, password });
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const register = async (name, email, password) => {
        const { data } = await API.post('/auth/register', { name, email, password });
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
