const base =
    'transition-all duration-200 group border';

export const sidebarNavLinkClass = (isActive) =>
    isActive
        ? `${base} flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-sky-500/12 border-sky-500/35 text-sky-600 dark:text-sky-400 font-extrabold shadow-sm shadow-sky-500/10`
        : `${base} flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border-transparent text-slate-500 dark:text-slate-400 font-bold hover:bg-sky-500/10 hover:border-sky-500/25 hover:text-sky-600 dark:hover:text-sky-400 hover:shadow-sm hover:shadow-sky-500/5`;

export const mobileNavLinkClass = (isActive) =>
    isActive
        ? `${base} flex flex-col items-center justify-center gap-0 min-h-10 py-0.5 px-0.5 rounded-lg tap-target text-sky-600 dark:text-sky-400 font-extrabold`
        : `${base} flex flex-col items-center justify-center gap-0 min-h-10 py-0.5 px-0.5 rounded-lg tap-target border-transparent text-slate-500 dark:text-slate-500 font-bold hover:text-sky-600 dark:hover:text-sky-400`;

export const navLabelClass = (isActive) =>
    `text-nav-label transition-colors duration-200 text-inherit ${isActive ? 'font-extrabold' : 'font-bold'}`;
