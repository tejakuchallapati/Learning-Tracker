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
    const menuRef = useRef(null);

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
        <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-black flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-300">
            {/* Advanced Search */}
            <div className="relative flex-1 max-w-md">
                <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl group focus-within:ring-4 focus-within:ring-red-500/10 transition-all border-2 border-black shadow-sm">
                    <FiSearch className="text-black w-4 h-4" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search modules..."
                        className="bg-transparent border-none text-sm focus:ring-0 w-full placeholder-gray-500 font-bold tracking-tight text-black"
                    />
                </div>

                {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border-2 border-black p-3 z-50 animate-in fade-in slide-in-from-top-2 text-black">
                        {results.map(course => (
                            <button
                                key={course.id}
                                onClick={() => navigateToCourse(course.id)}
                                className="w-full text-left p-4 hover:bg-red-50 rounded-2xl transition-all flex items-center justify-between group border border-transparent hover:border-red-600"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{course.icon}</span>
                                    <div>
                                        <p className="text-sm font-black text-black group-hover:text-red-600">{course.title}</p>
                                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{course.category}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">GO TO ROADMAP</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 ml-10">
                {/* Notifications Bell */}
                <button
                    onClick={() => navigate('/settings')}
                    className="relative p-2.5 text-black hover:text-red-600 bg-transparent hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-600"
                >
                    <FiBell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-black mx-2"></div>

                {/* Profile with Dropdown */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-4 group"
                    >
                        <div className="text-right hidden sm:block leading-tight">
                            <p className="text-sm font-black text-black group-hover:text-red-600 transition-colors uppercase tracking-tight">{user?.name || 'Guest User'}</p>
                            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none mt-1">Learner Pro</p>
                        </div>
                        <div className="w-11 h-11 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black shadow-lg shadow-red-600/30 transform group-hover:scale-105 transition-transform duration-200 border border-black">
                            {user?.name?.[0] || 'G'}
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border-2 border-black p-3 z-50 animate-in fade-in slide-in-from-bottom-2">
                            <div className="p-4 border-b border-black mb-2">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Signed in as</p>
                                <p className="text-sm font-black text-black truncate">{user?.email || 'guest@example.com'}</p>
                            </div>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/settings'); }} className="w-full text-left p-3 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-black hover:text-red-600">
                                <FiUser className="text-red-600" /> My Profile
                            </button>
                            <button onClick={() => { setShowProfileMenu(false); navigate('/dashboard'); }} className="w-full text-left p-3 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-black hover:text-red-600">
                                <FiLayout className="text-red-600" /> Dashboard
                            </button>
                            <div className="pt-2 mt-2 border-t border-black">
                                <button 
                                    onClick={() => { setShowProfileMenu(false); logout(); navigate('/login'); }}
                                    className="w-full text-left p-3 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3 text-sm font-bold text-red-600"
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
