import { NavLink } from 'react-router-dom';
import { FiLayout, FiBookOpen, FiActivity, FiSettings, FiEdit, FiCpu, FiBookmark } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FiLayout size={20} /> },
        { name: 'Roadmaps', path: '/courses', icon: <FiBookOpen size={20} /> },
        { name: 'Study Notes', path: '/notes', icon: <FiEdit size={20} /> },
        { name: 'Resources', path: '/bookmarks', icon: <FiBookmark size={20} /> },
        { name: 'Insights', path: '/analytics', icon: <FiActivity size={20} /> },
        { name: 'Settings', path: '/settings', icon: <FiSettings size={20} /> },
    ];

    return (
        <aside className="w-72 bg-slate-950/80 text-slate-400 flex-shrink-0 hidden md:flex flex-col border-r border-slate-800/50 backdrop-blur-md z-40 transition-colors duration-300">
            <div className="h-24 flex items-center px-8 gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
                    <img src={logo} alt="L" className="w-6 h-6 object-contain brightness-0 invert" />
                </div>
                <h1 className="text-xl font-black tracking-tighter text-white leading-tight">
                    Learning<br /><span className="text-cyan-400">Tracker</span>
                </h1>
            </div>

            <nav className="flex-1 py-10 px-4 space-y-1.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${isActive
                                ? 'bg-slate-900 text-cyan-400 font-bold shadow-sm shadow-cyan-500/10 border border-slate-800/50'
                                : 'hover:bg-slate-900/50 hover:text-white'
                            }`
                        }
                    >
                        <span className={`transition-transform duration-300 group-hover:scale-110`}>{item.icon}</span>
                        <span className="text-sm tracking-tight">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 bg-slate-950/50 text-[10px] font-black uppercase tracking-widest text-slate-600 text-center border-t border-slate-800/50">
                &copy; {new Date().getFullYear()} Learning Tracker
            </div>
        </aside>
    );
};

export default Sidebar;
