import API from '../services/api';

let warmPromise = null;

/** Ping the API so Render cold starts happen before login, not during it. */
export const warmApi = () => {
    if (!warmPromise) {
        warmPromise = API.get('health', { timeout: 60000 })
            .catch(() => {})
            .finally(() => {
                warmPromise = null;
            });
    }
    return warmPromise;
};
