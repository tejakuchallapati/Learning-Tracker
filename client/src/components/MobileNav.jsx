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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
            {navItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all ${
                            isActive 
                                ? 'text-violet-600 dark:text-violet-400' 
                                : 'text-slate-400 dark:text-slate-600'
                        }`
                    }
                >
                    <span className="transition-transform duration-300">{item.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default MobileNav;
