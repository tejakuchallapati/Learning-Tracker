import { useRef, useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

/**
 * GoogleLogin requires a numeric pixel width. Disables FedCM / auto-select so
 * users see "Sign in with Google" and can pick an account.
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
        <div
            ref={containerRef}
            className={`w-full min-w-0 flex justify-center overflow-hidden [&>div]:max-w-full ${className}`}
        >
            {width != null && (
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
            )}
        </div>
    );
};

export default ResponsiveGoogleLogin;
