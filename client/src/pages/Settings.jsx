import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiBell, FiMoon } from 'react-icons/fi';

const Settings = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-4xl space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

            {/* Profile Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                    <FiUser className="text-indigo-600 text-xl" />
                    <h3 className="text-lg font-semibold leading-none text-gray-800">Profile Information</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" value={user?.name || ''} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" value={user?.email || ''} />
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-400">Profile editing is temporarily disabled in this demo.</p>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                    <FiBell className="text-indigo-600 text-xl" />
                    <h3 className="text-lg font-semibold leading-none text-gray-800">Email Notifications</h3>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between py-3 border-b border-gray-50">
                        <div>
                            <h4 className="text-gray-800 font-medium">Daily Study Reminders</h4>
                            <p className="text-sm text-gray-500">Receive an email if you haven't logged study time by 8 PM.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <h4 className="text-gray-800 font-medium">Weekly Progress Report</h4>
                            <p className="text-sm text-gray-500">A weekly summary of your stats and upcoming milestones.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <button className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Save Preferences</button>
                </div>
            </div>

        </div>
    );
};

export default Settings;
