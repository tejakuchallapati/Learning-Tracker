import { FiClock, FiCalendar, FiTrash2, FiEdit2 } from 'react-icons/fi';

const GoalCard = ({ goal, onDelete, onEdit }) => {
    const startDate = new Date(goal.startDate).toLocaleDateString();
    const endDate = new Date(goal.endDate).toLocaleDateString();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow border border-slate-200 dark:border-slate-800 p-8 hover:border-violet-100 dark:hover:border-violet-900 transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors uppercase tracking-tight">{goal.technology}</h3>
                    <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-500/20">
                            Active
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit && onEdit(goal)}
                        className="p-2 text-slate-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-xl transition-all"
                        title="Edit Goal"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete && onDelete(goal._id)}
                        className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                        title="Delete Goal"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <FiCalendar className="text-violet-500" />
                        <span>{goal.durationDays} Days</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Focus</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <FiClock className="text-violet-500" />
                        <span>{goal.dailyTargetHours}h / day</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-slate-300 dark:text-slate-600">Start Date</span>
                    <span className="text-slate-600 dark:text-slate-400">{startDate}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                    <span className="text-[9px] text-slate-300 dark:text-slate-600">End Date</span>
                    <span className="text-slate-600 dark:text-slate-400">{endDate}</span>
                </div>
            </div>
        </div>
    );
};

export default GoalCard;
