import { useState, useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiBell, FiMail, FiCheckCircle, FiActivity } from 'react-icons/fi';

const Settings = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        specialization: user?.specialization || '',
    });

    const [notifications, setNotifications] = useState({
        email: user?.emailNotification !== undefined ? user.emailNotification : true,
        reminders: user?.streakAlertNotification !== undefined ? user.streakAlertNotification : true,
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
            reminderTime,
            reminderAmPm: amPm,
        });
        return current !== savedSnapshot;
    }, [savedSnapshot, formData, notifications, reminderTime, amPm]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                specialization: user.specialization || '',
            });
            setNotifications({
                email: user.emailNotification !== undefined ? user.emailNotification : true,
                reminders: user.streakAlertNotification !== undefined ? user.streakAlertNotification : true,
            });
            setAmPm(user.reminderAmPm || 'PM');
            setReminderTime(user.reminderTime || '20:00');
        }
    }, [user]);

    useEffect(() => {
        if (window.location.hash === '#reminders') {
            document.getElementById('reminders')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Preferences</h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-2 text-xs md:text-sm font-semibold leading-relaxed max-md:mt-1.5 max-md:text-xs">Update your profile and email reminder preferences.</p>
                </div>
                <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                    {hasUnsavedChanges && (
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 text-center sm:text-right">
                            Unsaved changes — click Save to apply.
                        </p>
                    )}
                    {saveError && (
                        <p className="text-xs font-semibold text-rose-600 text-center sm:text-right">{saveError}</p>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={!hasUnsavedChanges}
                        className="w-full sm:w-auto px-5 py-3.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-xs md:text-sm hover:bg-violet-600 transition-all shadow-md shadow-slate-200 dark:shadow-none flex items-center justify-center gap-2 btn-hover-scale uppercase tracking-wider max-md:py-3 max-md:text-xs disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Save preferences {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 relative overflow-hidden group border border-slate-100 dark:border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50/50 dark:bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 max-md:w-16 max-md:h-16 rounded-xl bg-violet-600 flex items-center justify-center text-white text-3xl max-md:text-2xl font-black shadow-xl mb-4 group-hover:rotate-3 transition-transform">
                                {user?.name?.[0] || 'G'}
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name}</h3>
                            <p className="text-xs font-black text-violet-500 uppercase tracking-[0.2em] mt-1.5">{user?.role || 'Learner'}</p>
                            <div className="h-px w-16 bg-slate-100 dark:bg-slate-800 my-4" />
                            <p className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed italic px-2">
                                {user?.bio || 'Add a short bio below.'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm">
                                <FiUser size={16} />
                            </div>
                            Profile
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 max-md:h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-base max-md:text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Specialization</label>
                                <input
                                    type="text"
                                    value={formData.specialization}
                                    onChange={e => setFormData({ ...formData, specialization: e.target.value })}
                                    placeholder="e.g. Full Stack"
                                    className="w-full h-12 max-md:h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-base max-md:text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={16} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full h-12 max-md:h-11 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 pl-10 text-base max-md:text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                    placeholder="A short line about what you're learning"
                                    className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-base max-md:text-sm font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-50 dark:focus:ring-violet-900/10 transition-all outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="reminders" className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800 scroll-mt-24">
                        <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/40 text-rose-600 rounded-xl flex items-center justify-center shadow-sm">
                                <FiBell size={16} />
                            </div>
                            Email reminders
                        </h3>

                        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
                            <h4 className="text-xs md:text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <FiActivity className="text-violet-600" size={14} /> How it works
                            </h4>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 font-semibold leading-relaxed">
                                When email digest is on, you get one daily email at your chosen time (IST) for incomplete daily goals that have the bell enabled on the Goals page.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {[
                                { key: 'email', label: 'Email digest', desc: 'Daily email for incomplete goals (with bell on).' },
                                { key: 'reminders', label: 'Streak in digest', desc: 'Include streak count in the same daily email.' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between py-1 gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white tracking-wider uppercase">{item.label}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">{item.desc}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(item.key)}
                                        className={`w-12 h-7 rounded-full transition-all duration-300 relative shrink-0 ${notifications[item.key] ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-800'}`}
                                        aria-pressed={notifications[item.key]}
                                        aria-label={item.label}
                                    >
                                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${notifications[item.key] ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white tracking-wider uppercase">Reminder time</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Daily email is sent at this time (IST). Save to apply.</p>
                            </div>
                            <div className="flex items-center bg-slate-50/80 dark:bg-slate-800 rounded-xl p-2 gap-2 border border-slate-200 dark:border-slate-700 shrink-0">
                                <input
                                    type="time"
                                    value={reminderTime}
                                    onChange={(e) => handleTimeChange(e.target.value)}
                                    className="bg-transparent border-none text-sm font-bold text-slate-900 dark:text-white focus:ring-0 p-1 cursor-pointer outline-none"
                                    title="Reminder Time"
                                />
                                <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
                                <div className="flex gap-1">
                                    {['AM', 'PM'].map((period) => (
                                        <button
                                            key={period}
                                            type="button"
                                            onClick={() => handleAmPmChange(period)}
                                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${amPm === period ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-violet-600'}`}
                                        >
                                            {period}
                                        </button>
                                    ))}
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
