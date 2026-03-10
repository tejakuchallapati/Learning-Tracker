import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 md:hidden">DevTrack</h2>
            <div className="hidden md:block">
                <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden sm:block">
                    Welcome back, <span className="font-semibold text-gray-800">{user?.name}</span>
                </span>
                <button
                    onClick={handleLogout}
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;
