import { useState, useContext } from 'react';
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
    const [notifications, setNotifications] = useState(() => {
        try {
            const saved = localStorage.getItem('user-notifications');
            return saved ? JSON.parse(saved) : { email: true, reminders: true, push: false };
        } catch {
            return { email: true, reminders: true, push: false };
        }
    });
    const [saved, setSaved] = useState(false);
    const [amPm, setAmPm] = useState(() => {
        return localStorage.getItem('user-reminder-ampm') || 'PM';
    });
    const [reminderTime, setReminderTime] = useState(() => {
        return localStorage.getItem('user-reminder-time') || '20:00';
    });

    const handleToggle = (key) => {
        setNotifications(prev => {
            const updated = { ...prev, [key]: !prev[key] };
            localStorage.setItem('user-notifications', JSON.stringify(updated));
            return updated;
        });
    };

    const handleAmPmChange = (value) => {
        setAmPm(value);
        localStorage.setItem('user-reminder-ampm', value);
    };

    const handleTimeChange = (value) => {
        setReminderTime(value);
        localStorage.setItem('user-reminder-time', value);
    };

    const handleSave = async () => {
        try {
            await updateProfile(formData);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Preferences</h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-2 text-sm font-bold leading-relaxed">Customize your learning environment and notification behavior.</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={handleSave}
                        className="px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black text-[10px] hover:bg-violet-600 transition-all shadow-md shadow-slate-200 dark:shadow-none flex items-center gap-2 btn-hover-scale uppercase tracking-widest"
                    >
                        SYNC PREFERENCES {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Bio & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 text-center relative overflow-hidden group border border-slate-100 dark:border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50/50 dark:bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-xl bg-violet-600 flex items-center justify-center text-white text-3xl font-black shadow-xl mb-4 group-hover:rotate-3 transition-transform">
                                {user?.name?.[0] || 'G'}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name}</h3>
                             <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] mt-1.5 leading-none">{user?.role}</p>
                            <div className="h-px w-16 bg-slate-100 dark:bg-slate-800 my-4"></div>
                            <p className="text-sm font-bold text-slate-700 leading-relaxed italic px-2">{user?.bio}</p>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 space-y-2">
                             {['General', 'Security', 'Connectivity', 'Export Data'].map((item, idx) => (
                                <button key={idx} className={`w-full text-left px-5 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${idx === 0 ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600' : 'text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 group'}`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Configuration */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Identity Section */}
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-base font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiUser size={14} /></div>
                            Identity & Bio
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Handle</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all font-mono outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Specialization</label>
                                <input type="text" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all font-mono outline-none" />
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-500 pl-1">Primary Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400" />
                                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 pl-10 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Section */}
                    <div id="reminders" className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-base font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:rose-400 rounded-xl flex items-center justify-center shadow-sm"><FiBell size={14} /></div>
                            Intelligent Reminders
                        </h3>

                        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                             <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-3 relative z-10"><FiActivity className="text-violet-600" /> SYNC PROTOCOL</h4>
                            <p className="text-xs text-slate-500 mt-2 font-bold leading-relaxed max-w-lg relative z-10">Reminders are dispatched using local browser latency algorithms to maximize daily streak retention.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'email', label: 'E-MAIL DIGEST', desc: 'Summary of daily milestones.' },
                                { key: 'reminders', label: 'STREAK ALERTS', desc: 'Critical notifications before streak resets.' },
                                { key: 'push', label: 'BROWSER PUSH', desc: 'Real-time achievement synchronization.' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between">
                                     <div className="flex-1 pr-6">
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white tracking-widest uppercase">{item.label}</h4>
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold mt-1 uppercase tracking-tight">{item.desc}</p>
                                     </div>
                                     <button 
                                         onClick={() => handleToggle(item.key)}
                                         className={`w-10 h-6 rounded-full transition-all duration-500 relative shrink-0 ${notifications[item.key] ? 'bg-violet-600 shadow-md shadow-violet-100/50' : 'bg-slate-200 dark:bg-slate-800'}`}
                                     >
                                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-sm ${notifications[item.key] ? 'left-5' : 'left-1'}`}></div>
                                     </button>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-6"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[11px] font-black text-slate-900 dark:text-white tracking-widest uppercase">Adaptive Time Window</h4>
                                <p className="text-[10px] text-slate-600 dark:text-slate-500 font-bold mt-1 uppercase tracking-tight">Set your high-performance focus period.</p>
                            </div>
                            <div className="flex items-center bg-slate-50/80 dark:bg-slate-800 rounded-xl p-1.5 gap-1.5 border border-slate-200 dark:border-slate-700">
                                <input 
                                    type="time" 
                                    value={reminderTime} 
                                    onChange={(e) => handleTimeChange(e.target.value)}
                                    className="bg-transparent border-none text-xs font-black text-slate-900 dark:text-white focus:ring-0 p-1 cursor-pointer outline-none" 
                                    title="Reminder Time" 
                                />
                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                                <div className="flex gap-1 p-0.5">
                                    <button 
                                        onClick={() => handleAmPmChange('AM')}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${amPm === 'AM' ? 'bg-violet-600 text-white shadow-md shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
                                    >
                                        AM
                                    </button>
                                    <button 
                                        onClick={() => handleAmPmChange('PM')}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${amPm === 'PM' ? 'bg-violet-600 text-white shadow-md shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
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
