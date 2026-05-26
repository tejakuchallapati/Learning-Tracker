import { NavLink } from 'react-router-dom';
import { FiLayout, FiBookOpen, FiActivity, FiSettings, FiEdit, FiCpu, FiBookmark, FiTarget } from 'react-icons/fi';
import logo from '../assets/gg_logo.png';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FiLayout size={18} /> },
        { name: 'Roadmaps', path: '/courses', icon: <FiBookOpen size={18} /> },
        { name: 'Daily Goals', path: '/goals', icon: <FiTarget size={18} /> },
        { name: 'Study Notes', path: '/notes', icon: <FiEdit size={18} /> },
        { name: 'Resources', path: '/bookmarks', icon: <FiBookmark size={18} /> },
        { name: 'Insights', path: '/analytics', icon: <FiActivity size={18} /> },
        { name: 'Settings', path: '/settings', icon: <FiSettings size={18} /> },
    ];

    return (
        <aside className="w-60 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 flex-shrink-0 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800/50 backdrop-blur-md z-40 transition-colors duration-300">
            <div className="h-20 flex items-center px-6 gap-3 border-b border-slate-100 dark:border-slate-800/50">
                <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-800 p-1">
                    <img src={logo} alt="LT" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-base font-black tracking-tighter text-slate-900 dark:text-white leading-tight uppercase">
                    Learning <span className="text-violet-600 dark:text-violet-400">Tracker</span>
                </h1>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm shadow-cyan-500/10 border border-slate-200 dark:border-slate-800/50'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white'
                            }`
                        }
                    >
                        <span className={`transition-transform duration-300 group-hover:scale-110`}>{item.icon}</span>
                        <span className="text-[13px] font-bold tracking-tight">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 text-center border-t border-slate-200 dark:border-slate-800/50">
                &copy; {new Date().getFullYear()} Learning Tracker
            </div>
        </aside>
    );
};

export default Sidebar;
