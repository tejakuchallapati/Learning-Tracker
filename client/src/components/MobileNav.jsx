import { NavLink } from 'react-router-dom';
import { FiLayout, FiBookOpen, FiActivity, FiSettings, FiTarget } from 'react-icons/fi';

const MobileNav = () => {
    const navItems = [
        { name: 'Home', path: '/dashboard', icon: <FiLayout size={20} /> },
        { name: 'Roadmaps', path: '/courses', icon: <FiBookOpen size={20} /> },
        { name: 'Goals', path: '/goals', icon: <FiTarget size={20} /> },
        { name: 'Insights', path: '/analytics', icon: <FiActivity size={20} /> },
        { name: 'Settings', path: '/settings', icon: <FiSettings size={20} /> },
    ];

    return (
        <nav
            className="font-nav md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            aria-label="Main navigation"
        >
            <div className="grid grid-cols-5 gap-1 max-w-lg mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-0.5 min-h-11 py-1.5 px-1 rounded-xl transition-colors tap-target ${
                                isActive
                                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50/80 dark:bg-violet-900/20'
                                    : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`
                        }
                    >
                        <span className="shrink-0">{item.icon}</span>
                        <span className="text-[11px] max-[380px]:text-[10px] font-bold tracking-tight text-center leading-tight max-w-full truncate w-full px-0.5">
                            {item.name}
                        </span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default MobileNav;
