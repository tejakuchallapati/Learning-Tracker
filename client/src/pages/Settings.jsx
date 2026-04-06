import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiBell, FiMail, FiPhone, FiCheckCircle, FiTrash2, FiActivity } from 'react-icons/fi';

const Settings = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState({
        email: true,
        reminders: true,
        push: false
    });
    const [saved, setSaved] = useState(false);
    const [amPm, setAmPm] = useState('PM');

    const handleToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Preferences</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-xl font-medium leading-relaxed">Customize your learning environment and notification behavior.</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={handleSave}
                        className="px-10 py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black text-xs hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 dark:shadow-none flex items-center gap-3 btn-hover-scale"
                    >
                        SYNC PREFERENCES {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Panel - Bio & Stats */}
                <div className="lg:col-span-1 space-y-10">
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-3xl p-10 text-center relative overflow-hidden group border border-slate-100 dark:border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50/50 dark:bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-28 h-28 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-4xl font-black shadow-3xl mb-8 group-hover:rotate-3 transition-transform">
                                {user?.name?.[0] || 'G'}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name}</h3>
                            <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] mt-2 leading-none">{user?.role}</p>
                            <div className="h-px w-16 bg-slate-100 dark:bg-slate-800 my-8"></div>
                            <p className="text-sm font-medium text-slate-400 leading-relaxed italic px-4">{user?.bio}</p>
                        </div>
                        
                        <div className="mt-10 pt-10 border-t border-slate-50 dark:border-slate-800 space-y-3">
                            {['General', 'Security', 'Connectivity', 'Export Data'].map((item, idx) => (
                                <button key={idx} className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${idx === 0 ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 group'}`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Configuration */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Identity Section */}
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-3xl p-12 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-5">
                            <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center shadow-sm"><FiUser size={20} /></div>
                            Identity & Bio
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Handle</label>
                                <input type="text" defaultValue={user?.name || ''} className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-sm font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 transition-all font-mono outline-none" />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Specialization</label>
                                <input type="text" defaultValue={user?.specialization || ''} className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-sm font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 transition-all font-mono outline-none" />
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Primary Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="email" defaultValue={user?.email || ""} className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 pl-16 text-sm font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 transition-all outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Section */}
                    <div id="reminders" className="bg-white dark:bg-slate-900 premium-shadow rounded-3xl p-12 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-5">
                            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center shadow-sm"><FiBell size={20} /></div>
                            Intelligent Reminders
                        </h3>

                        <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 mb-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                            <h4 className="text-sm font-black text-white flex items-center gap-3 relative z-10"><FiActivity className="text-violet-400" /> SYNC PROTOCOL</h4>
                            <p className="text-xs text-slate-400 mt-3 font-medium leading-relaxed max-w-lg relative z-10">Reminders are dispatched using local browser latency algorithms to maximize daily streak retention.</p>
                        </div>

                        <div className="space-y-10">
                            {[
                                { key: 'email', label: 'E-MAIL DIGEST', desc: 'Summary of daily milestones.' },
                                { key: 'reminders', label: 'STREAK ALERTS', desc: 'Critical notifications before streak resets.' },
                                { key: 'push', label: 'BROWSER PUSH', desc: 'Real-time achievement synchronization.' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between">
                                    <div className="flex-1 pr-6">
                                        <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase">{item.label}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight">{item.desc}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle(item.key)}
                                        className={`w-14 h-8 rounded-full transition-all duration-500 relative shrink-0 ${notifications[item.key] ? 'bg-violet-600 shadow-lg shadow-violet-100/50' : 'bg-slate-200 dark:bg-slate-800'}`}
                                    >
                                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-500 shadow-sm ${notifications[item.key] ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-12"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                             <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase">Adaptive Time Window</h4>
                                <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight">Set your high-performance focus period.</p>
                            </div>
                            <div className="flex items-center bg-slate-50/80 dark:bg-slate-800 rounded-xl p-2.5 gap-2 border border-slate-200 dark:border-slate-700">
                                <input type="time" defaultValue="20:00" className="bg-transparent border-none text-sm font-black text-slate-900 dark:text-white focus:ring-0 p-2 cursor-pointer" title="Reminder Time" />
                                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                                <div className="flex gap-1.5 p-1 pr-2">
                                    <button 
                                        onClick={() => setAmPm('AM')}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${amPm === 'AM' ? 'bg-violet-600 text-white shadow-xl shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
                                    >
                                        AM
                                    </button>
                                    <button 
                                        onClick={() => setAmPm('PM')}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${amPm === 'PM' ? 'bg-violet-600 text-white shadow-xl shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
                                    >
                                        PM
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
