const AUTH_TIMEOUT_MS = 45000;
const RETRY_DELAY_MS = 2500;
const MAX_ATTEMPTS = 3;

const isRetryable = (err) => {
    if (err?.response) return false;
    const code = err?.code;
    const message = (err?.message || '').toLowerCase();
    return (
        code === 'ECONNABORTED' ||
        code === 'ERR_NETWORK' ||
        message.includes('timeout') ||
        message.includes('network error')
    );
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Auth calls get a longer timeout + retries for hosted API cold starts. */
export const authRequest = async (requestFn) => {
    let lastError;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
        try {
            return await requestFn({ timeout: AUTH_TIMEOUT_MS });
        } catch (err) {
            lastError = err;
            if (!isRetryable(err) || attempt === MAX_ATTEMPTS - 1) {
                throw err;
            }
            await wait(RETRY_DELAY_MS);
        }
    }

    throw lastError;
};
