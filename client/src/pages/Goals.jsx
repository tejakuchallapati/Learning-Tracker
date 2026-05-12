import DailyGoalsSection from '../components/DailyGoalsSection';
import { FiTarget } from 'react-icons/fi';

const Goals = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-3">
                        <FiTarget className="text-violet-600 dark:text-violet-400" />
                        Daily Objectives
                    </h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-3 text-lg font-bold leading-relaxed">
                        Manage your daily tactical protocols and streak retention.
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <DailyGoalsSection />
            </div>

            <div className="bg-white dark:bg-slate-900 premium-shadow p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Focus & Consistency</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Setting clear daily objectives is the fastest way to achieve long-term mastery.
                    </p>
                </div>
                <div className="text-5xl hidden md:block">🚀</div>
            </div>
        </div>
    );
};

export default Goals;
