import { useState } from 'react';
import DailyGoalsSection from '../components/goals/DailyGoalsSection';
import GoalMomentumPanel from '../components/goals/GoalMomentumPanel';
import PageHeader, { PAGE_SHELL } from '../components/layout/PageHeader';

const Goals = () => {
    const [momentumRefreshKey, setMomentumRefreshKey] = useState(0);

    return (
        <div className={`${PAGE_SHELL} min-w-0`}>
            <PageHeader
                title="DAILY GOALS"
                description="Set today's tasks, track streaks, and build consistency."
            />
            <DailyGoalsSection onGoalsChange={() => setMomentumRefreshKey((k) => k + 1)} />
            <GoalMomentumPanel refreshKey={momentumRefreshKey} />
        </div>
    );
};

export default Goals;
