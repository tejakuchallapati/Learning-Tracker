const GOALS_KEY = 'lt_daily_goals_v1';
const ACTIVITY_KEY = 'lt_goal_activity_v1';
const TTL_MS = 5 * 60 * 1000;

const read = (key) => {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.ts || Date.now() - parsed.ts > TTL_MS) return null;
        return parsed.data ?? null;
    } catch {
        return null;
    }
};

const write = (key, data) => {
    try {
        sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
    } catch {
        /* ignore */
    }
};

export const readGoalsCache = () => read(GOALS_KEY);
export const writeGoalsCache = (goals) => write(GOALS_KEY, goals);
export const readActivityCache = () => read(ACTIVITY_KEY);
export const writeActivityCache = (activity) => write(ACTIVITY_KEY, activity);
