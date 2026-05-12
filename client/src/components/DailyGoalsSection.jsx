import { useState, useEffect } from 'react';
import API from '../services/api';
import { FiCheckCircle, FiCircle, FiBell, FiTrash2, FiPlus } from 'react-icons/fi';

const DailyGoalsSection = () => {
    const [goals, setGoals] = useState([]);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [emailReminders, setEmailReminders] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/daily-goals');
            setGoals(data);
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
        if (!newGoalTitle.trim()) return;

        try {
            await API.post('/daily-goals/create', {
                title: newGoalTitle,
                emailReminders
            });
            setNewGoalTitle('');
            setEmailReminders(false);
            fetchGoals();
        } catch (err) {
            console.error('Error adding daily goal:', err);
        }
    };

    const toggleComplete = async (goal) => {
        try {
            await API.put(`/daily-goals/${goal._id}`, {
                completed: !goal.completed
            });
            // Optimistically update
            setGoals(goals.map(g => 
                g._id === goal._id ? { ...g, completed: !g.completed } : g
            ));
        } catch (err) {
            console.error('Error updating daily goal:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/daily-goals/${id}`);
            // Optimistically update
            setGoals(goals.filter(g => g._id !== id));
        } catch (err) {
            console.error('Error deleting daily goal:', err);
        }
    };

    const toggleReminder = async (goal) => {
        try {
            await API.put(`/daily-goals/${goal._id}`, {
                emailReminders: !goal.emailReminders
            });
            // Optimistically update
            setGoals(goals.map(g => 
                g._id === goal._id ? { ...g, emailReminders: !g.emailReminders } : g
            ));
        } catch (err) {
            console.error('Error updating daily goal reminder:', err);
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 premium-shadow p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-6 mt-4 transition-all duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                        <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm text-2xl">🎯</div>
                        Daily Objectives & Protocols
                    </h2>
                    <p className="text-slate-700 dark:text-slate-400 mt-2 font-bold text-base leading-relaxed max-w-xl">Synchronize your tactical daily operations with AI-powered streak retention.</p>
                </div>
                <div className="px-5 py-2.5 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-violet-100 dark:border-violet-800 mt-4 md:mt-0 shadow-sm">
                    {goals.filter(g => g.completed).length} / {goals.length} SECURED
                </div>
            </div>

            {/* Add Goal Form */}
            <form onSubmit={handleAddGoal} className="flex flex-col lg:flex-row gap-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 transition-all">
                <div className="flex-1 w-full">
                    <label className="block text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">New Objective</label>
                    <input 
                        type="text" 
                        placeholder="E.g., Complete 2 LeetCode problems..." 
                        value={newGoalTitle}
                        onChange={(e) => setNewGoalTitle(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
                        required
                    />
                </div>
                <div className="flex items-center gap-8 shrink-0 self-end lg:pb-0">
                    <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" className="hidden" checked={emailReminders} onChange={(e) => setEmailReminders(e.target.checked)} />
                            <div className={`w-14 h-8 rounded-full flex items-center p-1 transition-all duration-500 ${emailReminders ? 'bg-violet-600 shadow-lg shadow-violet-200' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-500 ${emailReminders ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        <span className="text-xs font-black text-slate-700 dark:text-slate-400 group-hover:text-violet-600 transition-colors uppercase tracking-widest flex items-center gap-2">
                            <FiBell className={emailReminders ? 'text-violet-600 animate-bounce' : ''} /> Email Protocol
                        </span>
                    </label>
                    
                    <button type="submit" className="bg-slate-900 dark:bg-violet-600 text-white p-5 rounded-2xl hover:bg-violet-600 dark:hover:bg-violet-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none hover:-translate-y-1 active:scale-95 group">
                        <FiPlus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                </div>
            </form>

            {/* Goals List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest animate-pulse">Synchronizing Data...</div>
                ) : goals.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 group hover:border-violet-300 transition-colors duration-500">
                        <div className="text-6xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">🛸</div>
                        <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] text-sm">No Tactical Objectives Found</p>
                        <p className="text-slate-400 dark:text-slate-600 text-xs mt-2 uppercase tracking-tight">Deploy your first goal to begin the streak protocol.</p>
                    </div>
                ) : (
                    goals.map(goal => (
                        <div key={goal._id} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-500 ${goal.completed ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 opacity-60' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-500/50 shadow-lg shadow-slate-100/50 dark:shadow-none group'}`}>
                            <div className="flex items-center gap-6 flex-1 min-w-0">
                                <button 
                                    onClick={() => toggleComplete(goal)}
                                    title={goal.completed ? "Unmark Goal" : "Mark as Completed"}
                                    className={`flex-shrink-0 transition-all duration-500 transform hover:scale-110 active:scale-90 ${goal.completed ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-200 dark:text-slate-700 hover:text-violet-500'}`}
                                >
                                    {goal.completed ? <FiCheckCircle size={32} /> : <FiCircle size={32} />}
                                </button>
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-lg font-black transition-all truncate uppercase tracking-tight ${goal.completed ? 'text-slate-400 dark:text-slate-600 line-through' : 'text-slate-900 dark:text-white'}`}>
                                        {goal.title}
                                    </span>
                                    {goal.streak > 0 && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-lg text-[10px] font-black border border-orange-100 dark:border-orange-900/30">
                                                <span>{goal.streak} DAY STREAK</span>
                                                <span role="img" aria-label="streak" className="animate-pulse">🔥</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 shrink-0 ml-6">
                                <button 
                                    onClick={() => toggleReminder(goal)}
                                    title={goal.emailReminders ? "Reminders ON" : "Reminders OFF"}
                                    className={`p-3.5 rounded-2xl transition-all duration-500 ${goal.emailReminders ? 'bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 shadow-inner' : 'text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                    <FiBell size={20} className={goal.emailReminders ? 'animate-bounce' : ''} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(goal._id)}
                                    title="Delete Goal"
                                    className="p-3.5 text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl transition-all duration-500 transform hover:rotate-12"
                                >
                                    <FiTrash2 size={20} />
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
