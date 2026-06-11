/** User-friendly message for axios / network failures (e.g. Render cold start). */
export const formatApiError = (err, fallback = 'Something went wrong. Please try again.') => {
    const code = err?.code;
    const message = err?.message || '';
    const isTimeout =
        code === 'ECONNABORTED' ||
        message.toLowerCase().includes('timeout');
    const isNetwork =
        code === 'ERR_NETWORK' ||
        message.toLowerCase().includes('network error');

    if (isTimeout || isNetwork) {
        return 'Our server is waking up — this can take up to a minute on the free plan. Please wait a moment and try again.';
    }

    return err?.response?.data?.message || fallback;
};
