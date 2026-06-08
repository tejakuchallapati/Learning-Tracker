/** Learning Tracker mark — flat book + check, scales cleanly in nav and auth. */
export default function Logo({ className = 'w-8 h-8', ...props }) {
    return (
        <svg
            className={className}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Learning Tracker"
            {...props}
        >
            <defs>
                <linearGradient id="lt-bg" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0ea5e9" />
                    <stop stopColor="#7c3aed" />
                </linearGradient>
            </defs>
            <rect width="64" height="64" rx="14" fill="url(#lt-bg)" />
            <path
                d="M15 43V23.5c0-1.4 1.1-2.3 2.6-2.1l13.4 2.4v22.4L17.6 48c-1.5.3-2.6-.6-2.6-2V43Z"
                fill="white"
                fillOpacity="0.95"
            />
            <path
                d="M49 43V23.5c0-1.4-1.1-2.3-2.6-2.1L33 23.8v22.4l13.4 2.7c1.5.3 2.6-.6 2.6-2V43Z"
                fill="white"
                fillOpacity="0.72"
            />
            <path
                d="M31 31.5l4.2 4.2L43 26"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
