import { useState, useContext, useEffect, useMemo } from 'react';
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
    const [saveError, setSaveError] = useState('');
    const [amPm, setAmPm] = useState(user?.reminderAmPm || 'PM');
    const [reminderTime, setReminderTime] = useState(user?.reminderTime || '20:00');

    const savedSnapshot = useMemo(() => {
        if (!user) return null;
        return JSON.stringify({
            name: user.name || '',
            email: user.email || '',
            bio: user.bio || '',
            specialization: user.specialization || '',
            emailNotification: user.emailNotification !== undefined ? user.emailNotification : true,
            streakAlertNotification: user.streakAlertNotification !== undefined ? user.streakAlertNotification : true,
            pushNotification: user.pushNotification !== undefined ? user.pushNotification : false,
            reminderTime: user.reminderTime || '20:00',
            reminderAmPm: user.reminderAmPm || 'PM',
        });
    }, [user]);

    const hasUnsavedChanges = useMemo(() => {
        if (!savedSnapshot) return false;
        const current = JSON.stringify({
            name: formData.name,
            email: formData.email,
            bio: formData.bio,
            specialization: formData.specialization,
            emailNotification: notifications.email,
            streakAlertNotification: notifications.reminders,
            pushNotification: notifications.push,
            reminderTime,
            reminderAmPm: amPm,
        });
        return current !== savedSnapshot;
    }, [savedSnapshot, formData, notifications, reminderTime, amPm]);

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

    const applyAmPmToTime = (time24, nextAmPm) => {
        const [hStr, m] = time24.split(':');
        const hour12 = (parseInt(hStr, 10) % 12) || 12;
        const hour24 =
            nextAmPm === 'AM'
                ? (hour12 === 12 ? 0 : hour12)
                : (hour12 === 12 ? 12 : hour12 + 12);
        return `${String(hour24).padStart(2, '0')}:${m}`;
    };

    const amPmFromTime = (time24) => (parseInt(time24.split(':')[0], 10) >= 12 ? 'PM' : 'AM');

    const handleAmPmChange = (value) => {
        setAmPm(value);
        setReminderTime((prev) => applyAmPmToTime(prev, value));
    };

    const handleTimeChange = (value) => {
        setReminderTime(value);
        setAmPm(amPmFromTime(value));
    };

    const handleSave = async () => {
        setSaveError('');
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
            setSaveError(error.response?.data?.message || 'Failed to save preferences. Please try again.');
        }
    };

    return (
        <div className="px-4 md:px-6 max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Preferences</h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-2 text-xs md:text-sm font-semibold leading-relaxed max-md:mt-1.5 max-md:text-xs">Customize your learning environment and notification behavior.</p>
                </div>
                <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                    {hasUnsavedChanges && (
                        <p className="text-xs md:text-xs font-semibold text-amber-600 dark:text-amber-400 text-center sm:text-right">
                            Unsaved changes — click Sync Preferences to apply.
                        </p>
                    )}
                    {saveError && (
                        <p className="text-xs md:text-xs font-semibold text-rose-600 text-center sm:text-right">{saveError}</p>
                    )}
                    <button 
                        onClick={handleSave}
                        disabled={!hasUnsavedChanges}
                        className="w-full sm:w-auto px-5 py-3.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-xs md:text-sm hover:bg-violet-600 transition-all shadow-md shadow-slate-200 dark:shadow-none flex items-center justify-center gap-2 btn-hover-scale uppercase tracking-wider max-md:py-3 max-md:text-xs disabled:opacity-50 disabled:pointer-events-none"
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
                            <div className="w-20 h-20 max-md:w-14 max-md:h-14 rounded-xl bg-violet-600 flex items-center justify-center text-white text-3xl max-md:text-xl font-black shadow-xl max-md:shadow-lg mb-4 max-md:mb-3 group-hover:rotate-3 transition-transform">
                                {user?.name?.[0] || 'G'}
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight max-md:text-base">{user?.name}</h3>
                            <p className="text-xs md:text-xs font-black text-violet-500 uppercase tracking-[0.2em] mt-1.5 max-md:mt-1 max-md:text-xs leading-none">{user?.role}</p>
                            <div className="h-px w-16 bg-slate-100 dark:bg-slate-800 my-4 max-md:my-3"></div>
                            <p className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed italic px-2 max-md:text-xs">{user?.bio}</p>
                        </div>
                        
                        {/* Horizontal scrolling row on phone, vertical buttons list on desktop */}
                        <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex flex-row overflow-x-auto gap-2 md:flex-col md:space-y-1.5 pb-2 scrollbar-none whitespace-nowrap">
                            {['General', 'Security', 'Connectivity', 'Export Data'].map((item, idx) => (
                                <button 
                                    key={idx} 
                                    className={`px-4 py-2.5 max-md:px-3 max-md:py-2 md:w-full md:text-left md:px-5 md:py-3.5 rounded-xl text-xs md:text-sm max-md:text-xs font-bold uppercase tracking-wider transition-all ${idx === 0 ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}`}
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
                        <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white mb-6 max-md:mb-5 max-md:text-sm flex items-center gap-3 max-md:gap-2.5">
                            <div className="w-8 h-8 max-md:w-7 max-md:h-7 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-xl max-md:rounded-lg flex items-center justify-center shadow-sm"><FiUser size={14} className="max-md:w-3 max-md:h-3" /></div>
                            Identity & Bio
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 max-md:space-y-1">
                                <label className="block text-xs max-md:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Handle</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})} 
                                    className="w-full h-12 max-md:h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 max-md:px-3 max-md:py-2.5 text-base max-md:text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none" 
                                />
                            </div>
                            <div className="space-y-1.5 max-md:space-y-1">
                                <label className="block text-xs max-md:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Specialization</label>
                                <input 
                                    type="text" 
                                    value={formData.specialization} 
                                    onChange={e => setFormData({...formData, specialization: e.target.value})} 
                                    className="w-full h-12 max-md:h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 max-md:px-3 max-md:py-2.5 text-base max-md:text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none" 
                                />
                            </div>
                            <div className="md:col-span-2 space-y-1.5 max-md:space-y-1">
                                <label className="block text-xs max-md:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Primary Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400 max-md:left-3 max-md:w-3.5 max-md:h-3.5" />
                                    <input 
                                        type="email" 
                                        value={formData.email} 
                                        onChange={e => setFormData({...formData, email: e.target.value})} 
                                        className="w-full h-12 max-md:h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 max-md:px-3 max-md:py-2.5 pl-10 max-md:pl-9 text-base max-md:text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Section */}
                    <div id="reminders" className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white mb-6 max-md:mb-5 max-md:text-sm flex items-center gap-3 max-md:gap-2.5">
                            <div className="w-8 h-8 max-md:w-7 max-md:h-7 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:rose-400 rounded-xl max-md:rounded-lg flex items-center justify-center shadow-sm"><FiBell size={14} className="max-md:w-3 max-md:h-3" /></div>
                            Intelligent Reminders
                        </h3>

                        <div className="p-4 max-md:p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-6 max-md:mb-5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                            <h4 className="text-xs md:text-sm max-md:text-xs font-black text-slate-900 dark:text-white flex items-center gap-3 max-md:gap-2 relative z-10"><FiActivity className="text-violet-600 max-md:w-3 max-md:h-3" /> Email reminders</h4>
                            <p className="text-xs md:text-sm max-md:text-xs text-slate-500 dark:text-slate-400 mt-2 max-md:mt-1.5 font-semibold leading-relaxed max-w-lg relative z-10">When Email digest is on and you save, the server sends one daily email at your chosen time (India timezone) for incomplete daily goals that have the bell icon enabled on the Goals page.</p>
                        </div>

                        <div className="space-y-5 max-md:space-y-4">
                            {[
                                { key: 'email', label: 'Email digest', desc: 'Daily email for incomplete goals (with bell on).', disabled: false },
                                { key: 'reminders', label: 'Streak in digest', desc: 'Include streak count in the same daily email.', disabled: false },
                                { key: 'push', label: 'Browser push', desc: 'Coming soon — not available yet.', disabled: true }
                            ].map((item) => (
                                <div key={item.key} className={`flex items-center justify-between py-1 ${item.disabled ? 'opacity-60' : ''}`}>
                                    <div className="flex-1 pr-6">
                                        <h4 className="text-xs md:text-sm max-md:text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase">{item.label}</h4>
                                        <p className="text-xs max-md:text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1 max-md:mt-0.5">{item.desc}</p>
                                    </div>
                                    <button 
                                        type="button"
                                        disabled={item.disabled}
                                        onClick={() => !item.disabled && handleToggle(item.key)}
                                        className={`w-12 h-7 rounded-full transition-all duration-500 relative shrink-0 ${notifications[item.key] ? 'bg-violet-600 shadow-md shadow-violet-100/50' : 'bg-slate-200 dark:bg-slate-800'} disabled:cursor-not-allowed`}
                                    >
                                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-sm ${notifications[item.key] ? 'left-6' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-6"></div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs md:text-sm max-md:text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase">Adaptive Time Window</h4>
                                <p className="text-xs max-md:text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1 max-md:mt-0.5">Daily reminder is sent at this time (IST). Save to apply.</p>
                            </div>
                            <div className="flex items-center bg-slate-50/80 dark:bg-slate-800 rounded-xl p-2 max-md:p-1.5 gap-2 max-md:gap-1.5 border border-slate-200 dark:border-slate-700 shrink-0">
                                <input 
                                    type="time" 
                                    value={reminderTime} 
                                    onChange={(e) => handleTimeChange(e.target.value)}
                                    className="bg-transparent border-none text-sm max-md:text-xs font-bold text-slate-900 dark:text-white focus:ring-0 p-1 cursor-pointer outline-none" 
                                    title="Reminder Time" 
                                />
                                <div className="h-5 max-md:h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1 max-md:mx-0.5"></div>
                                <div className="flex gap-1 max-md:gap-0.5">
                                    <button 
                                        onClick={() => handleAmPmChange('AM')}
                                        className={`px-3 py-2 max-md:px-2.5 max-md:py-1.5 rounded-lg text-xs max-md:text-xs font-bold transition-all ${amPm === 'AM' ? 'bg-violet-600 text-white shadow-md shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
                                    >
                                        AM
                                    </button>
                                    <button 
                                        onClick={() => handleAmPmChange('PM')}
                                        className={`px-3 py-2 max-md:px-2.5 max-md:py-1.5 rounded-lg text-xs max-md:text-xs font-bold transition-all ${amPm === 'PM' ? 'bg-violet-600 text-white shadow-md shadow-violet-100/50' : 'text-slate-400 hover:text-violet-600'}`}
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
