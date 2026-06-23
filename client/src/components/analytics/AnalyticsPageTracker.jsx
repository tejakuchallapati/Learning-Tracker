import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../utils/analytics';

/** Sends SPA route changes to Google Analytics when configured. */
export default function AnalyticsPageTracker() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        trackPageView(`${pathname}${search}`);
    }, [pathname, search]);

    return null;
}
