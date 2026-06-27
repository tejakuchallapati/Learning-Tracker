/** Shared dashboard layout — flex column; pages scroll inside their own shell. */
export const DASHBOARD_MAIN =
    'flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-slate-950 px-3 sm:px-4 md:px-6 lg:px-8 pt-5 md:pt-6 transition-colors';

/** Standard pages — Goals, Notes, Settings, Insights */
export const PAGE_SHELL = 'w-full max-w-5xl mx-auto space-y-5 pb-4 min-w-0';

/** Wide grid pages — Dashboard (4-column cards) */
export const PAGE_SHELL_WIDE = 'w-full max-w-7xl mx-auto space-y-5 pb-4 min-w-0';

/** Admin / edge-to-edge tables */
export const PAGE_SHELL_FULL = 'w-full space-y-5 pb-4 min-w-0';

export default function PageHeader({ title, description, actions, dense = false, embedded = false }) {
    return (
        <header
            className={`flex flex-col lg:flex-row lg:items-end justify-between ${
                embedded ? '' : 'border-b border-slate-200 dark:border-slate-800'
            } ${dense ? 'gap-2' : 'gap-3'} ${embedded ? 'pb-0' : dense ? 'pb-2' : 'pb-4'}`}
        >
            <div className="max-w-xl min-w-0">
                <h1 className="text-xl sm:text-3xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight break-words">
                    {title}
                </h1>
                {description && (
                    <p
                        className={`text-slate-500 dark:text-slate-400 text-[11px] sm:text-sm md:text-base font-medium break-words line-clamp-2 sm:line-clamp-none ${
                            dense ? 'mt-0.5 leading-snug' : 'mt-1.5 leading-relaxed'
                        }`}
                    >
                        {description}
                    </p>
                )}
            </div>
            {actions ? (
                <div className="min-w-0 w-full flex flex-wrap items-center gap-2 lg:w-auto lg:max-w-[min(100%,42rem)] lg:justify-end">
                    {actions}
                </div>
            ) : null}
        </header>
    );
}
