const CACHE_KEY = 'lt_dashboard_cache_v1';
const CACHE_TTL_MS = 5 * 60 * 1000;

export const readDashboardCache = () => {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.ts || Date.now() - parsed.ts > CACHE_TTL_MS) return null;
        return { data: parsed.data ?? null, goals: Array.isArray(parsed.goals) ? parsed.goals : [] };
    } catch {
        return null;
    }
};

export const writeDashboardCache = (data, goals) => {
    try {
        sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, goals, ts: Date.now() })
        );
    } catch {
        /* ignore quota errors */
    }
};
