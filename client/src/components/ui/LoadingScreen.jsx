/** Lightweight inline loader — no full-screen blocking animation. */
export default function LoadingScreen({ message = 'Loading', compact = false, className = '' }) {
    return (
        <div
            className={`flex items-center justify-center gap-2.5 ${compact ? 'py-6' : 'min-h-[28vh] sm:min-h-[40vh]'} ${className}`}
            role="status"
            aria-live="polite"
            aria-label={message}
        >
            <span className="w-5 h-5 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">{message}</p>
        </div>
    );
}
