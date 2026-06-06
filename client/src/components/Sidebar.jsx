import { NavLink } from 'react-router-dom';
import NavIcon from './icons/NavIcon';
import { sidebarNavItems } from '../config/navItems';
import { sidebarNavLinkClass, navLabelClass } from '../config/navLinkStyles';
import logo from '../assets/gg_logo.png';

const Sidebar = () => {
    return (
        <aside className="font-nav w-60 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 flex-shrink-0 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800/50 backdrop-blur-md z-40 transition-colors duration-300">
            <div className="h-20 flex items-center px-6 gap-3 border-b border-slate-100 dark:border-slate-800/50">
                <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-800 p-1">
                    <img src={logo} alt="LT" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-white leading-tight uppercase">
                    Learning <span className="text-sky-500 dark:text-sky-400">Tracker</span>
                </h1>
            </div>

            <nav className="flex-1 py-2 px-3 space-y-0">
                {sidebarNavItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => sidebarNavLinkClass(isActive)}
                    >
                        {({ isActive }) => (
                            <>
                                <NavIcon
                                    name={item.icon}
                                    size={20}
                                    active={isActive}
                                    compact
                                    className={isActive ? 'scale-105' : 'group-hover:scale-105'}
                                />
                                <span className={navLabelClass(isActive)}>{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 text-center border-t border-slate-200 dark:border-slate-800/50">
                &copy; {new Date().getFullYear()} Learning Tracker
            </div>
        </aside>
    );
};

export default Sidebar;
