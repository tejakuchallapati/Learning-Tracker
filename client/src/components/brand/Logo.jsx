import { useId } from 'react';

/** Flat LT monogram — matches landing typography, stays crisp in the navbar. */
export default function Logo({ className = 'w-8 h-8', ...props }) {
    const uid = useId().replace(/:/g, '');
    const bg = `lt-bg-${uid}`;

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
                <linearGradient id={bg} x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop stopColor="#0ea5e9" />
                    <stop stopColor="#0284c7" />
                </linearGradient>
            </defs>

            <rect width="64" height="64" rx="15" fill={`url(#${bg})`} />
            <path
                d="M18 20v24.5a2.5 2.5 0 0 0 2.5 2.5H34"
                stroke="white"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M38 20h16M46 20v27"
                stroke="white"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
