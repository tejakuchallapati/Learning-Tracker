import API from '../services/api';
import { readDashboardCache, writeDashboardCache } from './dashboardCache';

/** Warm dashboard cache after login so the first paint is instant. */
export const prefetchDashboard = async () => {
    const cache = readDashboardCache();
    if (cache?.data && Array.isArray(cache?.goals)) {
        return cache;
    }

    try {
        const [goalsRes, analyticsRes] = await Promise.all([
            API.get('goals', { timeout: 12000 }),
            API.get('analytics/dashboard', { timeout: 12000 }),
        ]);
        const data = analyticsRes?.data || { totalStudyHours: 0, weeklyStudyHours: 0, completionRate: 0 };
        const goals = Array.isArray(goalsRes?.data) ? goalsRes.data : [];
        writeDashboardCache(data, goals);
        return { data, goals };
    } catch {
        return null;
    }
};
