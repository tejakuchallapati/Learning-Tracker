import { useState } from 'react';
import DailyGoalsSection from '../components/DailyGoalsSection';
import GoalConsistencyGraph from '../components/GoalConsistencyGraph';

const Goals = () => {
    const [graphRefreshKey, setGraphRefreshKey] = useState(0);

    return (
        <div className="font-body max-w-4xl mr-auto ml-0 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
            <DailyGoalsSection onGoalsChange={() => setGraphRefreshKey((k) => k + 1)} />

            <GoalConsistencyGraph refreshKey={graphRefreshKey} />

            <div className="bg-white dark:bg-slate-900 premium-shadow p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Focus & Consistency</h4>
                    <p className="text-base text-slate-500 dark:text-slate-400 font-bold mt-1 leading-relaxed">
                        Setting clear daily goals is the fastest way to achieve long-term mastery.
                    </p>
                </div>
                <div className="text-3xl hidden md:block">🚀</div>
            </div>
        </div>
    );
};

export default Goals;
