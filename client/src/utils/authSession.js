/** Where to send a user after sign-in or sign-up. */
export const getHomePath = (session) => (session?.isAdmin ? '/admin' : '/dashboard');

/** Save token + user immediately so navigation after auth never races localStorage. */
export const persistSession = (data) => {
    if (!data?.token) return data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

export const clearSession = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};
