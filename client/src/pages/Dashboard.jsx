import { useState, useEffect } from 'react';
import API from '../services/api';
import StatsCard from '../components/StatsCard';
import ChartCard from '../components/ChartCard';
import ReminderCard from '../components/ReminderCard';
import GoalCard from '../components/GoalCard';
import { FiClock, FiTarget, FiActivity } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyChartData = [
    { name: 'Mon', hours: 2 }, { name: 'Tue', hours: 3 }, { name: 'Wed', hours: 1 },
    { name: 'Thu', hours: 4 }, { name: 'Fri', hours: 2 }, { name: 'Sat', hours: 5 }, { name: 'Sun', hours: 3 }
];

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [dashRes, goalsRes] = await Promise.all([
                    API.get('/analytics/dashboard'),
                    API.get('/goals')
                ]);
                setData(dashRes.data);
                setGoals(goalsRes.data);
            } catch (err) {
                console.error('Failed to load dashboard', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500 loading-pulse">Loading dashboard...</div>;

    return (
        <div className="space-y-6">

            {data?.goalsAnalysis?.length > 0 && data.goalsAnalysis[0]?.currentProgress < data.goalsAnalysis[0]?.expectedProgress && (
                <ReminderCard suggestion={data.goalsAnalysis[0].suggestion} />
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard icon={<FiClock />} title="Total Hours" value={data?.totalStudyHours || 0} description="All time" />
                <StatsCard icon={<FiActivity />} title="Weekly Hours" value={data?.weeklyStudyHours || 0} description="This week" />
                <StatsCard icon={<FiTarget />} title="Active Goals" value={data?.activeGoals || 0} description="Currently tracking" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Goals List */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Active Learning Goals</h3>
                        <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px]">
                            {goals.length > 0 ? (
                                goals.map(goal => <GoalCard key={goal._id} goal={goal} />)
                            ) : (
                                <p className="text-gray-500 text-sm italic">No active goals yet. Go to Goals to create one.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Weekly Chart */}
                <div className="lg:col-span-2">
                    <ChartCard title="Weekly Study Hours">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={dummyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
