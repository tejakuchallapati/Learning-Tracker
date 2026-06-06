import {
    MdDashboard,
    MdMenuBook,
    MdTrackChanges,
    MdEditNote,
    MdBookmark,
    MdInsights,
    MdSettings,
    MdMail,
} from 'react-icons/md';

export const iconRegistry = {
    dashboard: MdDashboard,
    roadmaps: MdMenuBook,
    goals: MdTrackChanges,
    notes: MdEditNote,
    resources: MdBookmark,
    insights: MdInsights,
    settings: MdSettings,
    email: MdMail,
};

const chipSizes = {
    compact: 'w-9 h-9',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
};

/* Matches landing .landing-icon-chip / --lt-accent-bright (#38bdf8) */
const accentChip =
    'text-sky-400 bg-sky-500/12 border-sky-400/30 shadow-sm shadow-sky-500/10';

const idleChip =
    'text-slate-500 bg-slate-100/70 border-slate-200/80 dark:text-slate-400 dark:bg-white/5 dark:border-white/10';

const hoverChip =
    'group-hover:text-sky-400 group-hover:bg-sky-500/12 group-hover:border-sky-400/30 group-hover:shadow-sm group-hover:shadow-sky-500/10 hover:text-sky-400 hover:bg-sky-500/12 hover:border-sky-400/30 hover:shadow-sm hover:shadow-sky-500/10';

const NavIcon = ({
    name,
    size = 20,
    active = false,
    compact = false,
    large = false,
    className = '',
}) => {
    const Icon = iconRegistry[name];
    if (!Icon) return null;

    const chipSize = large ? chipSizes.large : compact ? chipSizes.compact : chipSizes.default;

    const stateClass = active ? accentChip : `${idleChip} ${hoverChip}`;

    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${chipSize} ${stateClass} ${className}`}
            aria-hidden
        >
            <Icon size={size} />
        </span>
    );
};

export default NavIcon;
