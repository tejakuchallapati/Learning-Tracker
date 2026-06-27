import { NavLink } from 'react-router-dom';
import NavIcon from '../icons/NavIcon';
import { mobileNavItems } from '../../config/navItems';
import { mobileNavLinkClass, navLabelClass } from '../../config/navLinkStyles';

const MobileNav = () => {
    return (
        <nav
            className="font-nav md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            aria-label="Main navigation"
        >
            <div className="grid grid-cols-5 gap-1 max-w-lg mx-auto">
                {mobileNavItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => mobileNavLinkClass(isActive)}
                    >
                        {({ isActive }) => (
                            <>
                                <NavIcon
                                    name={item.icon}
                                    size={22}
                                    active={isActive}
                                    compact
                                />
                                <span className={`text-[9px] sm:text-[10px] md:text-xs tracking-tight text-center leading-none w-full px-0.5 ${navLabelClass(isActive)}`}>
                                    {item.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default MobileNav;
