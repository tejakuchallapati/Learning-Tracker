import { useState, useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiBell, FiMail, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import PageHeader, { PAGE_SHELL } from '../components/layout/PageHeader';
import ReportIssueForm from '../components/feedback/ReportIssueForm';

const Settings = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const [notifications, setNotifications] = useState({
        email: user?.emailNotification !== undefined ? user.emailNotification : true,
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
            emailNotification: user.emailNotification !== undefined ? user.emailNotification : true,
            reminderTime: user.reminderTime || '20:00',
            reminderAmPm: user.reminderAmPm || 'PM',
        });
    }, [user]);

    const hasUnsavedChanges = useMemo(() => {
        if (!savedSnapshot) return false;
        const current = JSON.stringify({
            name: formData.name,
            email: formData.email,
            emailNotification: notifications.email,
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
            });
            setNotifications({
                email: user.emailNotification !== undefined ? user.emailNotification : true,
            });
            setAmPm(user.reminderAmPm || 'PM');
            setReminderTime(user.reminderTime || '20:00');
        }
    }, [user]);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'reminders' || hash === 'feedback') {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

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
                streakAlertNotification: notifications.email,
                reminderTime,
                reminderAmPm: amPm,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setSaveError(error.response?.data?.message || 'Failed to save preferences. Please try again.');
        }
    };

    return (
        <div className={PAGE_SHELL}>
            <PageHeader
                title="Settings"
                description="Profile and daily email reminders."
                actions={(
                    <>
                        {hasUnsavedChanges && (
                            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 text-center sm:text-right">
                                Unsaved changes
                            </p>
                        )}
                        {saveError && (
                            <p className="text-xs font-semibold text-rose-600 text-center sm:text-right">{saveError}</p>
                        )}
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges}
                            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Save {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                        </button>
                    </>
                )}
            />

            <div className="max-w-2xl bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800 space-y-5">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <FiUser size={16} className="text-sky-500" />
                    Profile
                </h3>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-11 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</label>
                        <div className="relative">
                            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full h-11 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id="reminders" className="max-w-2xl bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800 scroll-mt-24 space-y-5">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <FiBell size={16} className="text-rose-500" />
                    Email reminders
                </h3>

                <div className="flex items-center justify-between gap-4 py-1">
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Daily digest</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">One email for incomplete goals with the bell on.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setNotifications((p) => ({ ...p, email: !p.email }))}
                        className={`w-12 h-7 rounded-full transition-all relative shrink-0 ${notifications.email ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-800'}`}
                        aria-pressed={notifications.email}
                    >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${notifications.email ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Send at</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">IST — save to apply</p>
                    </div>
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-2 gap-2 border border-slate-200 dark:border-slate-700 shrink-0">
                        <input
                            type="time"
                            value={reminderTime}
                            onChange={(e) => handleTimeChange(e.target.value)}
                            className="bg-transparent border-none text-sm font-bold text-slate-900 dark:text-white focus:ring-0 p-1 cursor-pointer outline-none"
                        />
                        <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
                        {['AM', 'PM'].map((period) => (
                            <button
                                key={period}
                                type="button"
                                onClick={() => handleAmPmChange(period)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${amPm === period ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-sky-600'}`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div id="feedback" className="max-w-2xl bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-6 border border-slate-100 dark:border-slate-800 scroll-mt-24 space-y-5">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <FiMessageCircle size={16} className="text-sky-500" />
                    Report an issue
                </h3>
                <ReportIssueForm />
            </div>
        </div>
    );
};

export default Settings;
