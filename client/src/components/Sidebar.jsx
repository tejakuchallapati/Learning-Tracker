import { NavLink } from 'react-router-dom';
import { FiLayout, FiBookOpen, FiActivity, FiSettings, FiEdit, FiCpu, FiBookmark } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FiLayout size={20} /> },
        { name: 'Roadmaps', path: '/courses', icon: <FiBookOpen size={20} /> },
        { name: 'AI Assistant', path: '/chat', icon: <FiCpu size={20} /> },
        { name: 'Study Notes', path: '/notes', icon: <FiEdit size={20} /> },
        { name: 'Resources', path: '/bookmarks', icon: <FiBookmark size={20} /> },
        { name: 'Insights', path: '/analytics', icon: <FiActivity size={20} /> },
        { name: 'Settings', path: '/settings', icon: <FiSettings size={20} /> },
    ];

    return (
        <aside className="w-72 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col border-r border-slate-800">
            <div className="h-24 flex items-center px-6 gap-3">
                <img src={logo} alt="Learning Tracker Logo" className="w-10 h-10 object-contain" />
                <h1 className="text-2xl font-black tracking-tighter text-white">Learning<br/><span className="text-indigo-400">Tracker</span></h1>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${isActive
                                ? 'bg-indigo-800 text-white font-medium'
                                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 bg-indigo-950 text-xs text-indigo-300 text-center border-t border-indigo-800">
                &copy; {new Date().getFullYear()} Learning Tracker
            </div>
        </aside>
    );
};

export default Sidebar;
