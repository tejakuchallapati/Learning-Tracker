import { useState, useEffect, useRef } from 'react';
import API from '../../services/api';
import { readGoalsCache, writeGoalsCache } from '../../utils/goalsCache';
import { FiCheckCircle, FiCircle, FiBell, FiTrash2, FiPlus } from 'react-icons/fi';

const DailyGoalsSection = ({ onGoalsChange }) => {
    const cachedGoals = readGoalsCache();
    const [goals, setGoals] = useState(() => (Array.isArray(cachedGoals) ? cachedGoals : []));
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [emailReminders, setEmailReminders] = useState(true);
    const [loading, setLoading] = useState(!cachedGoals);
    const [adding, setAdding] = useState(false);
    const [reminderNotice, setReminderNotice] = useState(null);
    const noticeTimeoutRef = useRef(null);

    const showReminderNotice = (enabled) => {
        if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
        setReminderNotice(
            enabled
                ? 'Reminders on — set your send time in Settings if you have not yet'
                : 'Email reminders are off'
        );
        noticeTimeoutRef.current = setTimeout(() => setReminderNotice(null), 3000);
    };

    useEffect(() => () => {
        if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    }, []);

    const fetchGoals = async (silent = false) => {
        try {
            if (!silent && goals.length === 0) setLoading(true);
            const { data } = await API.get('daily-goals', { timeout: 10000 });
            setGoals(data);
            writeGoalsCache(data);
        } catch (err) {
            console.error('Error fetching daily goals:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleAddGoal = async (e) => {
        e.preventDefault();
        if (!newGoalTitle.trim() || adding) return;

        const title = newGoalTitle.trim();
        const reminders = emailReminders;
        const tempId = `temp-${Date.now()}`;

        setAdding(true);
        setGoals((prev) => {
            const next = [...prev, { _id: tempId, title, completed: false, emailReminders: reminders, streak: 0 }];
            writeGoalsCache(next);
            return next;
        });
        setNewGoalTitle('');
        setEmailReminders(true);

        try {
            const { data } = await API.post('daily-goals/create', { title, emailReminders: reminders });
            setGoals((prev) => {
                const next = prev.map((g) => (g._id === tempId ? data : g));
                writeGoalsCache(next);
                return next;
            });
            onGoalsChange?.();
        } catch (err) {
            console.error('Error adding daily goal:', err);
            setGoals((prev) => {
                const next = prev.filter((g) => g._id !== tempId);
                writeGoalsCache(next);
                return next;
            });
            setNewGoalTitle(title);
            setEmailReminders(reminders);
        } finally {
            setAdding(false);
        }
    };

    const toggleComplete = async (goal) => {
        try {
            await API.put(`daily-goals/${goal._id}`, {
                completed: !goal.completed
            });
            // Optimistically update
            const next = goals.map(g =>
                g._id === goal._id ? { ...g, completed: !g.completed } : g
            );
            setGoals(next);
            writeGoalsCache(next);
            onGoalsChange?.();
        } catch (err) {
            console.error('Error updating daily goal:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`daily-goals/${id}`);
            // Optimistically update
            const next = goals.filter(g => g._id !== id);
            setGoals(next);
            writeGoalsCache(next);
            onGoalsChange?.();
        } catch (err) {
            console.error('Error deleting daily goal:', err);
        }
    };

    const toggleReminder = async (goal) => {
        try {
            await API.put(`daily-goals/${goal._id}`, {
                emailReminders: !goal.emailReminders
            });
            // Optimistically update
            const nextEnabled = !goal.emailReminders;
            setGoals(goals.map(g =>
                g._id === goal._id ? { ...g, emailReminders: nextEnabled } : g
            ));
            showReminderNotice(nextEnabled);
        } catch (err) {
            console.error('Error updating daily goal reminder:', err);
        }
    };

    const handleNewGoalReminderToggle = () => {
        setEmailReminders((prev) => {
            const next = !prev;
            showReminderNotice(next);
            return next;
        });
    };

    return (
        <div className="bg-white dark:bg-slate-900 premium-shadow p-3 md:p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 transition-all duration-500 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 min-w-0">
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-md flex items-center justify-center text-xs shrink-0">🎯</div>
                    <span className="truncate">Today&apos;s goals</span>
                </h2>
                <div className="px-2 py-1 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wide border border-violet-100 dark:border-violet-800 shrink-0">
                    {goals.filter(g => g.completed).length}/{goals.length}
                </div>
            </div>

            {reminderNotice && (
                <div
                    role="status"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 rounded-lg text-xs font-bold animate-in fade-in duration-300"
                >
                    <FiBell size={12} />
                    {reminderNotice}
                </div>
            )}

            <form onSubmit={handleAddGoal} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                <input
                    type="text"
                    placeholder="Add a new goal..."
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    required
                />
                <button
                    type="button"
                    onClick={handleNewGoalReminderToggle}
                    title={emailReminders ? 'Email reminders on for this goal' : 'Email reminders off for this goal'}
                    className={`p-1.5 rounded-lg transition-all shrink-0 ${emailReminders ? 'bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 hover:text-violet-600'}`}
                >
                    <FiBell size={14} />
                </button>
                <button type="submit" disabled={adding} className="bg-violet-600 text-white p-1.5 rounded-lg hover:bg-violet-700 transition-all active:scale-95 shrink-0 disabled:opacity-50" title="Add goal">
                    <FiPlus size={14} />
                </button>
            </form>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
                {loading && goals.length === 0 ? (
                    <div className="space-y-1.5" aria-hidden>
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-9 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
                        ))}
                    </div>
                ) : goals.length === 0 ? (
                    <div className="text-center py-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wide">NO GOALS YET</p>
                    </div>
                ) : (
                    goals.map(goal => (
                        <div key={goal._id} className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-all ${goal.completed ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 opacity-60' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-500/50'}`}>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <button
                                    onClick={() => toggleComplete(goal)}
                                    title={goal.completed ? 'Unmark Goal' : 'Mark as Completed'}
                                    className={`flex-shrink-0 transition-all ${goal.completed ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-200 dark:text-slate-700 hover:text-violet-500'}`}
                                >
                                    {goal.completed ? <FiCheckCircle size={16} /> : <FiCircle size={16} />}
                                </button>
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <span className={`text-xs sm:text-sm font-bold truncate ${goal.completed ? 'text-slate-400 dark:text-slate-600 line-through' : 'text-slate-900 dark:text-white'}`}>
                                        {goal.title}
                                    </span>
                                    {goal.streak > 0 && (
                                        <span className="flex items-center gap-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded text-[10px] font-black border border-orange-100 dark:border-orange-900/30 shrink-0">
                                            {goal.streak}d 🔥
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0 ml-2">
                                <button
                                    onClick={() => toggleReminder(goal)}
                                    title={goal.emailReminders ? 'Reminders ON' : 'Reminders OFF'}
                                    className={`p-1 rounded-lg transition-all ${goal.emailReminders ? 'bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400' : 'text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                    <FiBell size={13} />
                                </button>
                                <button
                                    onClick={() => handleDelete(goal._id)}
                                    title="Delete Goal"
                                    className="p-1 text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                                >
                                    <FiTrash2 size={13} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DailyGoalsSection;
