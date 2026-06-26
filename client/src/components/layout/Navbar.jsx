import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FiBell, FiSearch, FiUser, FiLogOut, FiMessageCircle } from 'react-icons/fi';
import NavIcon from '../icons/NavIcon';
import { useNavigate } from 'react-router-dom';
import { courses } from '../../data/CourseData';
import { formatReminderTime } from '../../utils/formatReminderTime';
import { REMINDER_TIMEZONE_LABEL } from '../../config/reminderTimezone';
import ReportIssueModal from '../feedback/ReportIssueModal';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showReportIssue, setShowReportIssue] = useState(false);
    const menuRef = useRef(null);
    const bellRef = useRef(null);

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
        if (val.length > 1) {
            const filtered = courses.filter(c =>
                c.title.toLowerCase().includes(val.toLowerCase()) ||
                c.tools.some(t => t.toLowerCase().includes(val.toLowerCase()))
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    };

    const navigateToCourse = (id) => {
        setResults([]);
        setSearch('');
        navigate(`/roadmap/${id}`);
    };

    const hasReminderTime = Boolean(user?.reminderTime);

    return (
        <>
        <header className="font-nav h-14 sm:h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 sm:px-4 md:px-8 sticky top-0 z-30 transition-all duration-300 min-w-0">
            <div className="relative flex-1 max-w-md hidden md:block">
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 px-5 py-2.5 rounded-2xl group focus-within:ring-4 focus-within:ring-cyan-500/10 focus-within:border-cyan-500 transition-all border border-slate-200 dark:border-slate-700/50 shadow-sm">
                    <FiSearch className="text-slate-400 w-4 h-4 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search modules..."
                        className="bg-transparent border-none text-sm focus:ring-0 w-full placeholder-slate-500 font-bold tracking-tight text-slate-900 dark:text-white"
                    />
                </div>

                {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 text-slate-900">
                        {results.map(course => (
                            <button
                                key={course.id}
                                onClick={() => navigateToCourse(course.id)}
                                className="w-full text-left p-4 hover:bg-slate-50 rounded-2xl transition-all flex items-center justify-between group border border-transparent hover:border-cyan-500/30"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{course.icon}</span>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 group-hover:text-cyan-600 transition-colors">{course.title}</p>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{course.category}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity">GO TO ROADMAP</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 md:gap-4 md:ml-10 ml-auto">
                <div className="relative" ref={bellRef}>
                    <button
                        type="button"
                        onClick={() => {
                            setShowNotifications((open) => !open);
                            setShowProfileMenu(false);
                        }}
                        className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-800/50"
                        aria-label="Notifications"
                        aria-expanded={showNotifications}
                    >
                        <FiBell size={20} />
                        {hasReminderTime && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-slate-950" />
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute top-full right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 text-slate-900">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Reminders</p>
                            <div className="space-y-2 text-sm">
                                <p className="text-xs text-slate-500 font-medium">
                                    {user?.reminderTime
                                        ? `Reminders at ${formatReminderTime(user.reminderTime, user.reminderAmPm)} (${REMINDER_TIMEZONE_LABEL})`
                                        : 'Set your reminder time in Settings'}
                                </p>
                                <p className="text-xs text-slate-500 font-medium">
                                    Tap the bell on a daily goal to turn reminders on. Turn off all emails in Settings.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowNotifications(false);
                                    navigate('/settings#reminders');
                                }}
                                className="mt-4 w-full text-center py-2.5 rounded-xl bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider hover:bg-violet-100 transition-colors"
                            >
                                Manage reminders
                            </button>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => {
                            setShowProfileMenu(!showProfileMenu);
                            setShowNotifications(false);
                        }}
                        className="flex items-center gap-4 group"
                        aria-label="Account menu"
                    >
                        <div className="text-right hidden sm:block leading-tight">
                            <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{user?.name || 'Guest User'}</p>
                            <p className="text-xs font-black text-violet-600 dark:text-violet-500 uppercase tracking-widest leading-none mt-1">Learner Pro</p>
                        </div>
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/20 transform group-hover:scale-105 transition-transform duration-200 border border-cyan-400/30">
                            {user?.name?.[0] || 'G'}
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-bottom-2 text-slate-900">
                            <div className="p-4 border-b border-slate-100 mb-2">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                                <p className="text-sm font-black text-slate-900 truncate">{user?.email || 'guest@example.com'}</p>
                            </div>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-cyan-600">
                                <FiUser className="text-cyan-500" /> My Profile
                            </button>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/dashboard'); }} className="group w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-slate-600 hover:bg-sky-500/10 hover:text-sky-600">
                                <NavIcon name="dashboard" size={18} compact /> Dashboard
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowProfileMenu(false); setShowReportIssue(true); }}
                                className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-sky-600"
                            >
                                <FiMessageCircle className="text-sky-500" /> Report an issue
                            </button>
                            {user?.isAdmin && (
                                <button
                                    type="button"
                                    onClick={() => { setShowProfileMenu(false); navigate('/admin'); }}
                                    className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-violet-600"
                                >
                                    <NavIcon name="admin" size={18} compact /> Admin panel
                                </button>
                            )}
                            <div className="pt-2 mt-2 border-t border-slate-100">
                                <button
                                    onClick={() => { setShowProfileMenu(false); logout(); navigate('/login'); }}
                                    className="w-full text-left p-3 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-rose-600 hover:text-rose-700"
                                >
                                    <FiLogOut /> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
        <ReportIssueModal open={showReportIssue} onClose={() => setShowReportIssue(false)} />
        </>
    );
};

export default Navbar;
