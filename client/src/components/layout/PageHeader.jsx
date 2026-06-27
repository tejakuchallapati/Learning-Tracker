/** Shared dashboard layout — symmetric inset from sidebar and right edge (matches Navbar). */
export const DASHBOARD_MAIN =
    'flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-slate-950 px-3 sm:px-4 md:px-6 lg:px-8 pt-5 md:pt-6 pb-20 md:pb-8 transition-colors max-md:overscroll-y-contain max-md:[-webkit-overflow-scrolling:touch]';

/** Standard pages — Goals, Notes, Settings, Insights */
export const PAGE_SHELL = 'w-full max-w-5xl mx-auto space-y-5 pb-4 min-w-0 overflow-x-hidden';

/** Wide grid pages — Roadmaps, Dashboard (4-column cards) */
export const PAGE_SHELL_WIDE = 'w-full max-w-7xl mx-auto space-y-5 pb-4 min-w-0 overflow-x-hidden';

/** Admin / edge-to-edge tables & full-width grids (Roadmaps) */
export const PAGE_SHELL_FULL = 'w-full space-y-5 pb-4 min-w-0 overflow-x-hidden';

export default function PageHeader({ title, description, actions }) {
    return (
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-xl min-w-0">
                <h1 className="text-xl sm:text-3xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight break-words">
                    {title}
                </h1>
                {description && (
                    <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-[11px] sm:text-sm md:text-base font-medium leading-relaxed break-words line-clamp-2 sm:line-clamp-none">
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
