import { useEffect, useRef, useState, useCallback } from 'react';

const CLIENT_ID =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    '937868886257-sgoqf4onr843odrv2518eghvog3ppm97.apps.googleusercontent.com';

const GoogleGIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
    </svg>
);

let gsiInitialized = false;

/**
 * Custom "Sign in with Google" label + hidden GIS standard button.
 * Avoids the personalized "Sign in as …" chip; click opens account picker.
 */
const ResponsiveGoogleLogin = ({
    className = '',
    text = 'signin_with',
    onSuccess,
    onError,
}) => {
    const hiddenHostRef = useRef(null);
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    const [ready, setReady] = useState(false);

    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;

    const label = text === 'signup_with' ? 'Sign up with Google' : 'Sign in with Google';

    useEffect(() => {
        let cancelled = false;
        let pollId;

        const setup = () => {
            const gsi = window.google?.accounts?.id;
            const host = hiddenHostRef.current;
            if (!gsi || !host || cancelled) return;

            if (!gsiInitialized) {
                gsi.initialize({
                    client_id: CLIENT_ID,
                    callback: (response) => {
                        if (response?.credential) {
                            onSuccessRef.current?.(response);
                        } else {
                            onErrorRef.current?.();
                        }
                    },
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    use_fedcm_for_prompt: false,
                    itp_support: false,
                });
                gsi.disableAutoSelect();
                gsiInitialized = true;
            }

            host.replaceChildren();
            gsi.renderButton(host, {
                type: 'standard',
                theme: 'outline',
                size: 'large',
                text,
                shape: 'rectangular',
                logo_alignment: 'left',
                width: 320,
            });

            setReady(true);
        };

        if (window.google?.accounts?.id) {
            setup();
        } else {
            pollId = window.setInterval(() => {
                if (window.google?.accounts?.id) {
                    window.clearInterval(pollId);
                    setup();
                }
            }, 100);
        }

        return () => {
            cancelled = true;
            if (pollId) window.clearInterval(pollId);
        };
    }, [text]);

    const handleClick = useCallback(() => {
        const host = hiddenHostRef.current;
        const googleBtn =
            host?.querySelector('[role="button"]') ||
            host?.querySelector('div[tabindex="0"]');

        if (googleBtn) {
            googleBtn.click();
            return;
        }
        onErrorRef.current?.();
    }, []);

    return (
        <div className={`w-full min-w-0 ${className}`}>
            <button
                type="button"
                onClick={handleClick}
                disabled={!ready}
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                <GoogleGIcon />
                {ready ? label : 'Loading Google…'}
            </button>
            <div
                ref={hiddenHostRef}
                className="fixed left-[-9999px] top-0 w-[320px] h-12 overflow-hidden opacity-0 pointer-events-none"
                aria-hidden="true"
            />
        </div>
    );
};

export default ResponsiveGoogleLogin;
