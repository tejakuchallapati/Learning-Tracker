/** Dispatched when API returns 401 so AuthContext can clear session. */
export const AUTH_SESSION_EXPIRED = 'auth:session-expired';

export const dispatchSessionExpired = () => {
    window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED));
};
