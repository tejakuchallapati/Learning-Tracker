import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import NavIcon from '../icons/NavIcon';
import { sidebarNavItems, adminNavItem } from '../../config/navItems';
import { sidebarNavLinkClass, navLabelClass } from '../../config/navLinkStyles';
import Logo from '../brand/Logo';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const navItems = user?.isAdmin ? [...sidebarNavItems, adminNavItem] : sidebarNavItems;
    return (
        <aside className="font-nav w-60 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 flex-shrink-0 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800/50 backdrop-blur-md z-40 transition-colors duration-300">
            <div className="h-16 flex items-center px-5 gap-3 border-b border-slate-100 dark:border-slate-800/50">
                <Logo className="w-8 h-8 shrink-0" />
                <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-white leading-tight uppercase">
                    Learning <span className="text-sky-500 dark:text-sky-400">Tracker</span>
                </h1>
            </div>

            <nav className="flex-1 py-3 px-3 space-y-2">
                {navItems.map((item) => (
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
                                />
                                <span className={navLabelClass(isActive)}>{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/50 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 text-center border-t border-slate-200 dark:border-slate-800/50">
                &copy; {new Date().getFullYear()} Learning Tracker
            </div>
        </aside>
    );
};

export default Sidebar;
