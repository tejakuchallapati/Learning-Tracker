import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiBell, FiMail, FiPhone, FiCheckCircle, FiTrash2, FiActivity } from 'react-icons/fi';

const Settings = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        specialization: user?.specialization || '',
        role: user?.role || 'Learner Pro'
    });
    
    const [notifications, setNotifications] = useState({
        email: user?.emailNotification !== undefined ? user.emailNotification : true,
        reminders: user?.streakAlertNotification !== undefined ? user.streakAlertNotification : true,
        push: user?.pushNotification !== undefined ? user.pushNotification : false
    });
    const [saved, setSaved] = useState(false);
    const [amPm, setAmPm] = useState(user?.reminderAmPm || 'PM');
    const [reminderTime, setReminderTime] = useState(user?.reminderTime || '20:00');

    // Sync settings states when user context updates (e.g. on profile reload/sync)
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                specialization: user.specialization || '',
                role: user.role || 'Learner Pro'
            });
            setNotifications({
                email: user.emailNotification !== undefined ? user.emailNotification : true,
                reminders: user.streakAlertNotification !== undefined ? user.streakAlertNotification : true,
                push: user.pushNotification !== undefined ? user.pushNotification : false
            });
            setAmPm(user.reminderAmPm || 'PM');
            setReminderTime(user.reminderTime || '20:00');
        }
    }, [user]);

    const handleToggle = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleAmPmChange = (value) => {
        setAmPm(value);
    };

    const handleTimeChange = (value) => {
        setReminderTime(value);
    };

    const handleSave = async () => {
        try {
            await updateProfile({
                ...formData,
                emailNotification: notifications.email,
                streakAlertNotification: notifications.reminders,
                pushNotification: notifications.push,
                reminderTime,
                reminderAmPm: amPm
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="px-4 md:px-6 max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl">
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Preferences</h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-1.5 text-[11px] md:text-xs font-semibold leading-relaxed">Customize your learning environment and notification behavior.</p>
                </div>
                <div className="flex gap-4 shrink-0">
                    <button 
                        onClick={handleSave}
                        className="w-full sm:w-auto px-5 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-[10px] md:text-xs hover:bg-violet-600 transition-all shadow-md shadow-slate-200 dark:shadow-none flex items-center justify-center gap-2 btn-hover-scale uppercase tracking-wider"
                    >
                        SYNC PREFERENCES {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                    </button>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Bio & Navigation */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 relative overflow-hidden group border border-slate-100 dark:border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50/50 dark:bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-violet-600 flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-xl mb-3 group-hover:rotate-3 transition-transform">
                                {user?.name?.[0] || 'G'}
                            </div>
                            <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white tracking-tight">{user?.name}</h3>
                            <p className="text-[9px] md:text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] mt-1 leading-none">{user?.role}</p>
                            <div className="h-px w-16 bg-slate-100 dark:bg-slate-800 my-3"></div>
                            <p className="text-[11px] md:text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed italic px-2">{user?.bio}</p>
                        </div>
                        
                        {/* Horizontal scrolling row on phone, vertical buttons list on desktop */}
                        <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex flex-row overflow-x-auto gap-2 md:flex-col md:space-y-1.5 pb-2 scrollbar-none whitespace-nowrap">
                            {['General', 'Security', 'Connectivity', 'Export Data'].map((item, idx) => (
                                <button 
                                    key={idx} 
                                    className={`px-3 py-2 md:w-full md:text-left md:px-4 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${idx === 0 ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Configuration Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Identity Section */}
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-lg flex items-center justify-center shadow-sm"><FiUser size={12} /></div>
                            Identity & Bio
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Handle</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})} 
                                    className="w-full h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none" 
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Specialization</label>
                                <input 
                                    type="text" 
                                    value={formData.specialization} 
                                    onChange={e => setFormData({...formData, specialization: e.target.value})} 
                                    className="w-full h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none" 
                                />
                            </div>
                            <div className="md:col-span-2 space-y-1">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Primary Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400" size={14} />
                                    <input 
                                        type="email" 
                                        value={formData.email} 
                                        onChange={e => setFormData({...formData, email: e.target.value})} 
                                        className="w-full h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 pl-9 text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Section */}
                    <div id="reminders" className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:rose-400 rounded-lg flex items-center justify-center shadow-sm"><FiBell size={12} /></div>
                            Intelligent Reminders
                        </h3>

                        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                            <h4 className="text-[11px] md:text-xs font-black text-slate-900 dark:text-white flex items-center gap-2 relative z-10"><FiActivity className="text-violet-600" size={12} /> SYNC PROTOCOL</h4>
                            <p className="text-[10px] md:text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-semibold leading-relaxed max-w-lg relative z-10">Reminders are dispatched using local browser latency algorithms to maximize daily streak retention.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'email', label: 'E-MAIL DIGEST', desc: 'Summary of daily milestones.' },
                                { key: 'reminders', label: 'STREAK ALERTS', desc: 'Critical notifications before streak resets.' },
                                { key: 'push', label: 'BROWSER PUSH', desc: 'Real-time achievement synchronization.' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between py-1">
                                    <div className="flex-1 pr-6">
                                        <h4 className="text-[10px] md:text-[11px] font-bold text-slate-900 dark:text-white tracking-wider uppercase">{item.label}</h4>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{item.desc}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle(item.key)}
                                        className={`w-12 h-7 rounded-full transition-all duration-500 relative shrink-0 ${notifications[item.key] ? 'bg-violet-600 shadow-md shadow-violet-100/50' : 'bg-slate-200 dark:bg-slate-800'}`}
                                    >
                                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-sm ${notifications[item.key] ? 'left-6' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-6"></div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] md:text-[11px] font-bold text-slate-900 dark:text-white tracking-wider uppercase">Adaptive Time Window</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Set your high-performance focus period.</p>
                            </div>
                            <div className="flex items-center bg-slate-50/80 dark:bg-slate-800 rounded-xl p-1.5 gap-1.5 border border-slate-200 dark:border-slate-700 shrink-0">
                                <input 
                                    type="time" 
                                    value={reminderTime} 
                                    onChange={(e) => handleTimeChange(e.target.value)}
                                    className="bg-transparent border-none text-xs font-bold text-slate-900 dark:text-white focus:ring-0 p-1 cursor-pointer outline-none" 
                                    title="Reminder Time" 
                                />
                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5"></div>
                                <div className="flex gap-0.5">
                                    <button 
                                        onClick={() => handleAmPmChange('AM')}
                                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${amPm === 'AM' ? 'bg-violet-600 text-white shadow-md shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
                                    >
                                        AM
                                    </button>
                                    <button 
                                        onClick={() => handleAmPmChange('PM')}
                                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${amPm === 'PM' ? 'bg-violet-600 text-white shadow-md shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
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
