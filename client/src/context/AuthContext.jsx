import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { AuthContext } from './AuthContextType';
import { AUTH_SESSION_EXPIRED } from '../utils/authEvents';
export { AuthContext };

const readStoredSession = () => {
    try {
        const saved = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!saved || saved === 'undefined' || !token) return null;
        const parsed = JSON.parse(saved);
        if (!parsed?._id) return null;
        return { ...parsed, token };
    } catch (error) {
        console.error('Auth initialization error:', error);
        return null;
    }
};

const clearStoredSession = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const restoreSession = async () => {
            const stored = readStoredSession();
            if (!stored) {
                if (!cancelled) {
                    setUser(null);
                    setLoading(false);
                }
                return;
            }

            // Show cached session immediately — don't block the UI on API cold starts
            if (!cancelled) {
                setUser(stored);
                setLoading(false);
            }

            try {
                const { data } = await API.get('auth/me', { timeout: 8000 });
                if (!cancelled) setUser(data);
            } catch {
                clearStoredSession();
                if (!cancelled) setUser(null);
            }
        };

        restoreSession();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const onSessionExpired = () => setUser(null);
        window.addEventListener(AUTH_SESSION_EXPIRED, onSessionExpired);
        return () => window.removeEventListener(AUTH_SESSION_EXPIRED, onSessionExpired);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            if (user.token) {
                localStorage.setItem('token', user.token);
            }
        } else if (!loading) {
            clearStoredSession();
        }
    }, [user, loading]);

    const login = async (email, password) => {
        const { data } = await API.post('auth/login', { email, password });
        setUser(data);
    };

    const register = async (name, email, password) => {
        const { data } = await API.post('auth/register', { name, email, password });
        setUser(data);
    };

    const googleLogin = async (credential) => {
        const { data } = await API.post('auth/google', { credential });
        setUser(data);
    };

    const logout = async () => {
        try {
            await API.get('auth/logout');
        } catch (error) {
            console.error('Logout API failed:', error);
        } finally {
            setUser(null);
        }
    };

    const updateProfile = async (profileData) => {
        const { data } = await API.put('auth/profile', profileData);
        setUser(data);
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, googleLogin, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
