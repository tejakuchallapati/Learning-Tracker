import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiBell, FiSearch, FiSettings, FiUser, FiLogOut, FiLayout, FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { courses } from '../data/CourseData';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });
    const menuRef = useRef(null);

    // Apply theme on mount and whenever it changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
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

    return (
        <header className="h-20 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-900 flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-300">
            {/* Advanced Search */}
            <div className="relative flex-1 max-w-md">
                <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 px-5 py-2.5 rounded-2xl group focus-within:ring-4 focus-within:ring-violet-500/10 transition-all border border-slate-200 dark:border-slate-800 shadow-sm">
                    <FiSearch className="text-slate-600 dark:text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search modules..."
                        className="bg-transparent border-none text-sm focus:ring-0 w-full placeholder-slate-500 dark:placeholder-slate-400 font-bold tracking-tight text-slate-950 dark:text-white"
                    />
                </div>

                {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 text-slate-900">
                        {results.map(course => (
                            <button
                                key={course.id}
                                onClick={() => navigateToCourse(course.id)}
                                className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{course.icon}</span>
                                    <div>
                                        <p className="text-sm font-black text-slate-950 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400">{course.title}</p>
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest">{course.category}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">GO TO ROADMAP</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 ml-10">
                {/* 🌙 Dark / Light Mode Toggle */}
                <button
                    onClick={() => setDarkMode(d => !d)}
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all group"
                >
                    {darkMode
                        ? <FiSun size={18} className="text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
                        : <FiMoon size={18} className="text-violet-600 group-hover:-rotate-12 transition-transform duration-500" />
                    }
                </button>

                {/* Notifications Bell */}
                <button
                    onClick={() => navigate('/settings')}
                    className="relative p-2.5 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 bg-transparent hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-xl transition-all"
                >
                    <FiBell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-50 dark:border-slate-950"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

                {/* Profile with Dropdown */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-4 group"
                    >
                        <div className="text-right hidden sm:block leading-tight">
                            <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors uppercase tracking-tight">{user?.name || 'Guest User'}</p>
                            <p className="text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest leading-none mt-1">Learner Pro</p>
                        </div>
                        <div className="w-11 h-11 rounded-2xl bg-violet-600 flex items-center justify-center text-white font-black shadow-lg shadow-violet-100 dark:shadow-none transform group-hover:scale-105 transition-transform duration-200">
                            {user?.name?.[0] || 'G'}
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-bottom-2">
                            <div className="p-4 border-b border-slate-50 dark:border-slate-800 mb-2">
                                <p className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest mb-1">Signed in as</p>
                                <p className="text-sm font-black text-slate-950 dark:text-white truncate">{user?.email || 'guest@example.com'}</p>
                            </div>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <FiUser className="text-violet-600 dark:text-violet-400" /> My Profile
                            </button>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/dashboard'); }} className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <FiLayout className="text-violet-600 dark:text-violet-400" /> Dashboard
                            </button>
                            <div className="pt-2 mt-2 border-t border-slate-50 dark:border-slate-800">
                                <button 
                                    onClick={() => { setShowProfileMenu(false); logout(); navigate('/login'); }}
                                    className="w-full text-left p-3 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-rose-600"
                                >
                                    <FiLogOut /> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
