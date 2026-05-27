import { useRef, useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

/**
 * GoogleLogin requires a numeric pixel width. This wrapper measures its
 * container so the button fits 320px–tablet cards without horizontal overflow.
 */
const ResponsiveGoogleLogin = ({
    className = '',
    minWidth = 200,
    maxWidth = 400,
    ...props
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
                    {...props}
                    width={String(width)}
                    useOneTap={false}
                />
            )}
        </div>
    );
};

export default ResponsiveGoogleLogin;
