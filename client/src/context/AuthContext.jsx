import React, { useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import { authRequest } from '../utils/authRequest';
import { persistSession, clearSession } from '../utils/authSession';
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

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => readStoredSession());
    const [loading, setLoading] = useState(() => Boolean(readStoredSession()));

    const applyAuthResponse = useCallback((data) => {
        persistSession(data);
        setUser(data);
        setLoading(false);
        return data;
    }, []);

    useEffect(() => {
        let cancelled = false;
        const stored = readStoredSession();
        const tokenAtStart = stored?.token || localStorage.getItem('token');

        if (!stored) {
            setUser(null);
            setLoading(false);
            return undefined;
        }

        const validateSession = async () => {
            try {
                const { data } = await authRequest((config) => API.get('auth/me', config));
                if (!cancelled && localStorage.getItem('token') === tokenAtStart) {
                    applyAuthResponse(data);
                }
            } catch (err) {
                // Only clear when this validation still owns the active token.
                if (
                    err.response?.status === 401 &&
                    !cancelled &&
                    localStorage.getItem('token') === tokenAtStart
                ) {
                    clearSession();
                    setUser(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        validateSession();
        return () => {
            cancelled = true;
        };
    }, [applyAuthResponse]);

    useEffect(() => {
        const onSessionExpired = () => setUser(null);
        window.addEventListener(AUTH_SESSION_EXPIRED, onSessionExpired);
        return () => window.removeEventListener(AUTH_SESSION_EXPIRED, onSessionExpired);
    }, []);

    useEffect(() => {
        if (user) {
            persistSession(user);
        }
    }, [user]);

    const login = async (email, password) => {
        const { data } = await authRequest((config) =>
            API.post('auth/login', { email, password }, config)
        );
        return applyAuthResponse(data);
    };

    const register = async (name, email, password) => {
        const { data } = await authRequest((config) =>
            API.post('auth/register', { name, email, password }, config)
        );
        return applyAuthResponse(data);
    };

    const googleLogin = async ({ credential, code, redirectUri } = {}) => {
        const body = credential
            ? { credential }
            : { code, redirectUri: redirectUri || window.location.origin };
        const { data } = await authRequest((config) =>
            API.post('auth/google', body, config)
        );
        return applyAuthResponse(data);
    };

    const logout = async () => {
        try {
            await API.get('auth/logout');
        } catch (error) {
            console.error('Logout API failed:', error);
        } finally {
            clearSession();
            setUser(null);
        }
    };

    const updateProfile = async (profileData) => {
        const previous = user;
        setUser((current) => (current ? { ...current, ...profileData } : current));
        try {
            const { data } = await API.put('auth/profile', profileData);
            return applyAuthResponse({
                ...data,
                token: data.token || user?.token,
            });
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
            const { data } = await authRequest((config) => API.get('auth/me', config));
            return applyAuthResponse(data);
        } catch (err) {
            if (err.response?.status === 401) {
                clearSession();
                setUser(null);
            }
            return null;
        }
    }, [applyAuthResponse]);

    return (
        <AuthContext.Provider value={{ user, login, register, googleLogin, logout, updateProfile, refreshUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
