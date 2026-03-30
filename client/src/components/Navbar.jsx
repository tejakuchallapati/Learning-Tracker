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
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const menuRef = useRef(null);

    // Apply dark mode on mount and whenever it changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            console.log('Theme: Dark mode applied');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            console.log('Theme: Light mode applied');
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
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors">
            {/* Advanced Search */}
            <div className="relative flex-1 max-w-md">
                <div className="flex items-center gap-6 bg-slate-50/50 px-5 py-3 rounded-xl group focus-within:ring-2 focus-within:ring-indigo-100 transition-all border border-slate-100/50">
                    <FiSearch className="text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search mastery modules..."
                        className="bg-transparent border-none text-sm focus:ring-0 w-full placeholder-slate-400 font-bold tracking-tight"
                    />
                </div>

                {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                        {results.map(course => (
                            <button
                                key={course.id}
                                onClick={() => navigateToCourse(course.id)}
                                className="w-full text-left p-4 hover:bg-indigo-50 rounded-2xl transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{course.icon}</span>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 group-hover:text-indigo-600">{course.title}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{course.category}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-indigo-400">View Roadmap</span>
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
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-slate-500 hover:text-indigo-600 transition-all group"
                >
                    {darkMode
                        ? <FiSun size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                        : <FiMoon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
                    }
                </button>

                {/* Notifications Bell */}
                <button
                    onClick={() => navigate('/settings')}
                    className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                >
                    <FiBell size={22} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-100 mx-2"></div>

                {/* Profile with Dropdown */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-4 group"
                    >
                        <div className="text-right hidden sm:block leading-tight">
                            <p className="text-sm font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">{user?.name || 'Guest User'}</p>
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none mt-1">Learner Pro</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 transform group-hover:scale-105 transition-transform duration-200">
                            {user?.name?.[0] || 'G'}
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-bottom-2">
                            <div className="p-4 border-b border-gray-50 mb-2">
                                <p className="text-sm font-black text-gray-900 truncate">{user?.email || ''}</p>
                            </div>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left p-3 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-gray-700">
                                <FiUser className="text-indigo-600" /> My Profile
                            </button>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/dashboard'); }} className="w-full text-left p-3 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-gray-700">
                                <FiLayout className="text-indigo-600" /> Dashboard
                            </button>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left p-3 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-gray-700">
                                <FiSettings className="text-indigo-600" /> Notifications
                            </button>
                            <button onClick={() => setDarkMode(d => !d)} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-gray-700">
                                {darkMode ? <FiSun className="text-amber-500" /> : <FiMoon className="text-slate-600" />}
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                            <div className="pt-2 mt-2 border-t border-gray-50">
                                <button 
                                    onClick={() => { setShowProfileMenu(false); logout(); navigate('/login'); }}
                                    className="w-full text-left p-3 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-rose-600"
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
