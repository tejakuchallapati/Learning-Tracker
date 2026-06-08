import Logo from '../brand/Logo';

/** Branded loader — logo with buffering pulse for route and data fetches. */
export default function LoadingScreen({ message = 'Loading', compact = false, className = '' }) {
    return (
        <div
            className={`flex flex-col items-center justify-center ${compact ? 'py-8' : 'min-h-screen'} bg-white dark:bg-slate-950 ${className}`}
            role="status"
            aria-live="polite"
            aria-label={message}
        >
            <div className="relative w-16 h-16 flex items-center justify-center">
                <span className="absolute inset-0 rounded-2xl border-2 border-sky-400/25 animate-ping" />
                <span className="absolute inset-1 rounded-xl border border-sky-500/40 animate-pulse" />
                <Logo className="relative w-11 h-11" />
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {message}
            </p>
            <div className="mt-3 flex items-center gap-1.5" aria-hidden>
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"
                        style={{ animationDelay: `${i * 140}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}
