import { NavLink } from 'react-router-dom';

import { FiHome, FiTarget, FiActivity, FiPieChart, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
        { name: 'Goals', path: '/goals', icon: <FiTarget className="w-5 h-5" /> },
        { name: 'Progress', path: '/progress', icon: <FiActivity className="w-5 h-5" /> },
        { name: 'Analytics', path: '/analytics', icon: <FiPieChart className="w-5 h-5" /> },
        { name: 'Settings', path: '/settings', icon: <FiSettings className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-64 bg-indigo-900 text-white flex-shrink-0 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-indigo-800">
                <h1 className="text-2xl font-bold tracking-tight">DevTrack</h1>
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
                &copy; {new Date().getFullYear()} DevTrack
            </div>
        </aside>
    );
};

export default Sidebar;
