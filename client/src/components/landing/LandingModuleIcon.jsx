import {
    LuLayoutDashboard,
    LuMap,
    LuTarget,
    LuLibraryBig,
    LuBellRing,
    LuNotebookPen,
} from 'react-icons/lu';

const moduleConfig = {
    dashboard: {
        Icon: LuLayoutDashboard,
        chip: 'bg-sky-500/20 text-sky-300 ring-sky-400/30',
    },
    roadmaps: {
        Icon: LuMap,
        chip: 'bg-violet-500/20 text-violet-300 ring-violet-400/30',
    },
    'daily-goals': {
        Icon: LuTarget,
        chip: 'bg-amber-500/20 text-amber-300 ring-amber-400/30',
    },
    resources: {
        Icon: LuLibraryBig,
        chip: 'bg-emerald-500/20 text-emerald-300 ring-emerald-400/30',
    },
    'email-reminders': {
        Icon: LuBellRing,
        chip: 'bg-rose-500/20 text-rose-300 ring-rose-400/30',
    },
    'study-notes': {
        Icon: LuNotebookPen,
        chip: 'bg-cyan-500/20 text-cyan-300 ring-cyan-400/30',
    },
};

const LandingModuleIcon = ({ moduleId, compact = false, className = '' }) => {
    const config = moduleConfig[moduleId];
    if (!config) return null;

    const { Icon, chip } = config;
    const boxClass = compact
        ? 'w-9 h-9 rounded-lg'
        : 'w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl';
    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center ring-1 ${chip} ${boxClass} ${className}`}
            aria-hidden
        >
            <Icon
                strokeWidth={2}
                className={compact ? 'w-4 h-4' : 'w-5 h-5 sm:w-7 sm:h-7'}
            />
        </span>
    );
};

export default LandingModuleIcon;
