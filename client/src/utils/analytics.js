/** Google Analytics — set VITE_GA_MEASUREMENT_ID on Vercel (e.g. G-XXXXXXXXXX). */
export const initAnalytics = () => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
    if (!measurementId || import.meta.env.DEV) return;

    if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.dataset.gaId = measurementId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args) => {
        window.dataLayer.push(args);
    };
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, { send_page_view: false });
};

export const trackPageView = (path) => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
    if (!measurementId || import.meta.env.DEV || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
    });
};
