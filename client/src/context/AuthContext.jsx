import React, { useState, useEffect, useCallback } from 'react';
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
    const [user, setUser] = useState(() => readStoredSession());
    const [loading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const stored = readStoredSession();

        if (!stored) {
            setUser(null);
            return undefined;
        }

        const validateSession = async () => {
            try {
                const { data } = await API.get('auth/me', { timeout: 8000 });
                if (!cancelled) setUser(data);
            } catch {
                clearStoredSession();
                if (!cancelled) setUser(null);
            }
        };

        validateSession();
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
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await API.post('auth/register', { name, email, password });
        setUser(data);
        return data;
    };

    const googleLogin = async (credential) => {
        const { data } = await API.post('auth/google', { credential });
        setUser(data);
        return data;
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
        const previous = user;
        setUser((current) => (current ? { ...current, ...profileData } : current));
        try {
            const { data } = await API.put('auth/profile', profileData);
            setUser((current) => ({
                ...data,
                token: data.token || current?.token,
            }));
            return data;
        } catch (error) {
            setUser(previous);
            throw error;
        }
    };

    const refreshUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            return null;
        }
        try {
            const { data } = await API.get('auth/me', { timeout: 8000 });
            setUser(data);
            return data;
        } catch {
            clearStoredSession();
            setUser(null);
            return null;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, googleLogin, logout, updateProfile, refreshUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
