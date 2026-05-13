import { NavLink } from 'react-router-dom';
import { FiLayout, FiBookOpen, FiActivity, FiSettings, FiEdit, FiCpu, FiBookmark, FiTarget } from 'react-icons/fi';
import logo from '../assets/gg_logo.png';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FiLayout size={20} /> },
        { name: 'Roadmaps', path: '/courses', icon: <FiBookOpen size={20} /> },
        { name: 'Daily Goals', path: '/goals', icon: <FiTarget size={20} /> },
        { name: 'Study Notes', path: '/notes', icon: <FiEdit size={20} /> },
        { name: 'Resources', path: '/bookmarks', icon: <FiBookmark size={20} /> },
        { name: 'Insights', path: '/analytics', icon: <FiActivity size={20} /> },
        { name: 'Settings', path: '/settings', icon: <FiSettings size={20} /> },
    ];

    return (
        <aside className="w-72 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 flex-shrink-0 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800/50 backdrop-blur-md z-40 transition-colors duration-300">
            <div className="h-24 flex items-center px-8 gap-3">
                <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800 p-1.5">
                    <img src={logo} alt="GG" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight uppercase">
                    Growth<br /><span className="text-violet-600 dark:text-violet-400">Grid</span>
                </h1>
            </div>

            <nav className="flex-1 py-10 px-4 space-y-1.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${isActive
                                ? 'bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm shadow-cyan-500/10 border border-slate-200 dark:border-slate-800/50'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white'
                            }`
                        }
                    >
                        <span className={`transition-transform duration-300 group-hover:scale-110`}>{item.icon}</span>
                        <span className="text-sm tracking-tight">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 bg-slate-50 dark:bg-slate-950/50 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 text-center border-t border-slate-200 dark:border-slate-800/50">
                &copy; {new Date().getFullYear()} Learning Tracker
            </div>
        </aside>
    );
};

export default Sidebar;
