import { useRef, useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

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

/**
 * Custom "Sign in with Google" look with a real Google button on top (opacity 0)
 * so the browser handles the click — programmatic .click() on GIS is blocked.
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
    const [width, setWidth] = useState(null);

    const label = text === 'signup_with' ? 'Sign up with Google' : 'Sign in with Google';

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            const measured = el.getBoundingClientRect().width;
            if (measured <= 0) return;
            setWidth(Math.floor(Math.max(minWidth, Math.min(measured, maxWidth))));
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        window.addEventListener('orientationchange', update);
        return () => {
            observer.disconnect();
            window.removeEventListener('orientationchange', update);
        };
    }, [minWidth, maxWidth]);

    return (
        <div ref={containerRef} className={`relative w-full h-12 min-w-0 ${className}`}>
            {/* Visible label — pointer-events-none so clicks pass through */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold shadow-sm pointer-events-none"
                aria-hidden="true"
            >
                <GoogleGIcon />
                {label}
            </div>

            {/* Real Google button — receives user clicks */}
            {width != null && (
                <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden opacity-[0.011]">
                    <GoogleLogin
                        onSuccess={onSuccess}
                        onError={onError}
                        width={String(width)}
                        useOneTap={false}
                        auto_select={false}
                        use_fedcm_for_prompt={false}
                        use_fedcm_for_button={false}
                        type="standard"
                        theme="outline"
                        size="large"
                        text={text}
                        shape="rectangular"
                        logo_alignment="left"
                    />
                </div>
            )}
        </div>
    );
};

export default ResponsiveGoogleLogin;
