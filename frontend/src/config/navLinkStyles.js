const base =
    'transition-all duration-200 group border';

export const sidebarNavLinkClass = (isActive) =>
    isActive
        ? `${base} flex items-center gap-2.5 px-3 py-2 rounded-xl bg-sky-500/12 border-sky-500/40 text-sky-600 dark:text-sky-400 font-extrabold`
        : `${base} flex items-center gap-2.5 px-3 py-2 rounded-xl border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold hover:bg-sky-500/8 hover:border-sky-500/30 hover:text-sky-600 dark:hover:text-sky-400`;

export const mobileNavLinkClass = (isActive) =>
    isActive
        ? `${base} flex flex-col items-center justify-center gap-1 min-h-[3.25rem] py-1.5 px-1 rounded-xl tap-target border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-extrabold`
        : `${base} flex flex-col items-center justify-center gap-1 min-h-[3.25rem] py-1.5 px-1 rounded-xl tap-target border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 font-bold hover:border-sky-500/30 hover:text-sky-600 dark:hover:text-sky-400`;

export const navLabelClass = (isActive) =>
    `text-nav-label transition-colors duration-200 text-inherit ${isActive ? 'font-extrabold' : 'font-bold'}`;
