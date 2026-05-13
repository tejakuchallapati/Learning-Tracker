import DailyGoalsSection from '../components/DailyGoalsSection';
import { FiTarget } from 'react-icons/fi';

const Goals = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-2">
                        <FiTarget className="text-violet-600 dark:text-violet-400" size={24} />
                        Daily Objectives
                    </h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-1 text-sm font-bold leading-relaxed">
                        Manage your daily tactical protocols and streak retention.
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <DailyGoalsSection />
            </div>

            <div className="bg-white dark:bg-slate-900 premium-shadow p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">Focus & Consistency</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        Setting clear daily objectives is the fastest way to achieve long-term mastery.
                    </p>
                </div>
                <div className="text-3xl hidden md:block">🚀</div>
            </div>
        </div>
    );
};

export default Goals;
