import { useEffect, useRef } from 'react';

const CLIENT_ID =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    '937868886257-sgoqf4onr843odrv2518eghvog3ppm97.apps.googleusercontent.com';

/**
 * Standard "Sign in with Google" button (not the personalized "Sign in as …" chip).
 * Uses GIS renderButton with auto_select off so users pick an account each time.
 */
const ResponsiveGoogleLogin = ({
    className = '',
    minWidth = 200,
    maxWidth = 400,
    text = 'signin_with',
    onSuccess,
    onError,
}) => {
    const containerRef = useRef(null);
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);

    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;

    useEffect(() => {
        let cancelled = false;
        let pollId;

        const renderButton = () => {
            const container = containerRef.current;
            const gsi = window.google?.accounts?.id;
            if (cancelled || !container || !gsi) return;

            const measured = container.getBoundingClientRect().width;
            const width = Math.floor(
                Math.max(minWidth, Math.min(measured > 0 ? measured : maxWidth, maxWidth))
            );

            container.replaceChildren();

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

            gsi.renderButton(container, {
                type: 'standard',
                theme: 'outline',
                size: 'large',
                text,
                shape: 'rectangular',
                logo_alignment: 'left',
                width,
            });
        };

        const waitForGsi = () => {
            if (window.google?.accounts?.id) {
                renderButton();
                return;
            }
            pollId = window.setInterval(() => {
                if (window.google?.accounts?.id) {
                    window.clearInterval(pollId);
                    renderButton();
                }
            }, 100);
        };

        waitForGsi();

        const container = containerRef.current;
        const observer =
            container &&
            new ResizeObserver(() => {
                renderButton();
            });
        if (container && observer) observer.observe(container);

        return () => {
            cancelled = true;
            if (pollId) window.clearInterval(pollId);
            observer?.disconnect();
        };
    }, [text, minWidth, maxWidth]);

    return (
        <div
            ref={containerRef}
            className={`w-full min-w-0 flex justify-center overflow-hidden [&>div]:max-w-full ${className}`}
            aria-label="Sign in with Google"
        />
    );
};

export default ResponsiveGoogleLogin;
