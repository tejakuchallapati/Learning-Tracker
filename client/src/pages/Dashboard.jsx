import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { courses } from '../data/CourseData';
import API from '../services/api';
import StatsCard from '../components/StatsCard';
import ChartCard from '../components/ChartCard';
import ReminderCard from '../components/ReminderCard';
import GoalCard from '../components/GoalCard';
import { FiClock, FiTarget, FiActivity, FiCalendar, FiPlus, FiArrowRight } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyChartData = [
    { name: 'Mon', hours: 1.5 },
    { name: 'Tue', hours: 2.2 },
    { name: 'Wed', hours: 1.0 },
    { name: 'Thu', hours: 3.5 },
    { name: 'Fri', hours: 2.8 },
    { name: 'Sat', hours: 4.1 },
    { name: 'Sun', hours: 3.2 },
];

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState([]);
    
    // Goal Setting State
    const [selectedTrack, setSelectedTrack] = useState(courses[0].id);
    const [targetDate, setTargetDate] = useState('2026-08-30');
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const calculateDays = () => {
            const diff = new Date(targetDate) - new Date();
            setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
        };
        calculateDays();
    }, [targetDate]);

    const handleAddGoal = async () => {
        const track = courses.find(c => c.id === selectedTrack);
        
        // Map frontend category to backend enum: ['Frontend', 'Backend', 'Full Stack', 'Other']
        let backendCategory = 'Other';
        const cat = track?.category?.toLowerCase();
        if (cat?.includes('front')) backendCategory = 'Frontend';
        else if (cat?.includes('back')) backendCategory = 'Backend';
        else if (cat?.includes('stack') || cat?.includes('dev')) backendCategory = 'Full Stack';

        const goalData = {
            technology: track?.title || 'Unknown',
            category: backendCategory,
            startDate: new Date().toISOString(),
            endDate: targetDate,
            durationDays: daysLeft,
            dailyTargetHours: 2,
            subTasks: track?.roadmap?.map(r => ({ title: r.step, completed: false })) || []
        };

        try {
            const { data } = await API.post('/goals/create', goalData);
            setGoals(prev => [data, ...(prev || [])]);
            alert(`Successfully added ${track?.title} to your active goals!`);
        } catch (err) {
            console.error('Failed to add goal', err);
            alert(err.response?.data?.message || 'Failed to add goal. Please try again.');
        }
    };

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const [dashRes, goalsRes] = await Promise.all([
                    API.get('/analytics/dashboard'),
                    API.get('/goals')
                ]);
                setData(dashRes?.data || { totalStudyHours: 0, weeklyStudyHours: 0 });
                if (Array.isArray(goalsRes?.data)) {
                    setGoals(goalsRes.data);
                }
            } catch (err) {
                console.warn('Failed to load real dashboard data, using initial state', err);
                setData({ totalStudyHours: 0, weeklyStudyHours: 0, completionRate: 0 });
                setGoals([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-1000">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[1.5rem] p-6 text-white relative overflow-hidden shadow-2xl shadow-violet-200 dark:shadow-none group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="max-w-md">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-white/20">
                            Adaptive Roadmap
                        </span>
                        <h2 className="text-3xl font-black leading-tight mb-3 tracking-tighter italic">Fast-Track Your <br />Learning Goal</h2>
                        <p className="text-violet-100 font-medium leading-relaxed opacity-90">Our AI-powered engine crafts personalized paths. Finish courses 3x faster with optimized daily targets.</p>
                    </div>
                    <button
                        onClick={() => {}}
                        className="px-10 py-5 bg-white text-violet-600 font-black rounded-[2rem] hover:bg-violet-50 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-violet-900/20 whitespace-nowrap flex items-center gap-3 group/btn uppercase tracking-widest text-xs"
                    >
                        Generate My Path <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card premium-shadow p-6 rounded-xl group hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-default">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-violet-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                            <FiClock size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Efficiency</p>
                            <p className="text-xs font-bold text-emerald-500">+12% Peak</p>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{data?.totalStudyHours ?? 0}h</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-1">Total Study Time</p>
                </div>

                <div className="glass-card premium-shadow p-6 rounded-xl group hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-default">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                            <FiActivity size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Intensity</p>
                            <p className="text-xs font-bold text-rose-500">High Focus</p>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{data?.weeklyStudyHours ?? 0}h</h3>
                    <p className="text-sm font-bold text-slate-700 mt-1">Weekly Intensity</p>
                </div>

                <div className="glass-card premium-shadow p-6 rounded-xl group hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-default lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <FiPlus size={120} />
                    </div>
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                                <FiTarget size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">Current Goal Progress</h3>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-400">Track and manage your active paths</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-2">
                            <div 
                                className="bg-violet-600 h-full rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all duration-1000"
                                style={{ width: `${data?.completionRate || 0}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Activity & Goals */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Activity Chart */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                         <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Focus Distribution</h3>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-400 mt-1">Detailed activity analysis by days</p>
                            </div>
                            <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <button className="px-6 py-2 bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 rounded-xl text-xs font-black shadow-sm shadow-violet-100 transition-all">WEEKLY</button>
                                <button className="px-6 py-2 text-slate-400 dark:text-slate-500 rounded-xl text-xs font-black hover:text-slate-600 dark:hover:text-slate-300 transition-all">MONTHLY</button>
                            </div>
                        </div>
                        <div className="h-[200px] -ml-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dummyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={15}
                                        fontFamily="Outfit"
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-10}
                                        fontFamily="Outfit"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '24px',
                                            border: 'none',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                                            padding: '20px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            backdropFilter: 'blur(10px)',
                                            fontFamily: 'Outfit'
                                        }}
                                        itemStyle={{ color: '#7c3aed', fontWeight: '900', fontSize: '14px' }}
                                        cursor={{ stroke: '#7c3aed', strokeWidth: 2, strokeDasharray: '6 6' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="hours"
                                        stroke="#7c3aed"
                                        strokeWidth={5}
                                        fillOpacity={1}
                                        fill="url(#colorHours)"
                                        animationDuration={2500}
                                        animationEasing="ease-in-out"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Active Goals Horizontal */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                             <h3 className="text-2xl font-black text-slate-900 dark:text-white">Active Paths</h3>
                             <button onClick={() => navigate('/courses')} className="text-sm font-black text-violet-600 hover:text-violet-700 transition-all flex items-center gap-2">View Curriculum <FiArrowRight /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                            {goals.slice(0, 2).map(goal => (
                                <GoalCard key={goal._id} goal={goal} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Goal Setting & Tips */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-indigo-600 dark:bg-indigo-900/40 rounded-2xl p-5 text-white relative overflow-hidden shadow-2xl shadow-indigo-100 dark:shadow-none group border border-indigo-500/50">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                        <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                            <FiTarget className="text-indigo-200" /> Fast-Track Goal
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-200 uppercase tracking-widest pl-1">Course Choice</label>
                                <select 
                                    value={selectedTrack}
                                    onChange={(e) => setSelectedTrack(e.target.value)}
                                    className="w-full bg-indigo-700/50 dark:bg-slate-900/50 border-indigo-400/30 rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-white/20 transition-all text-white outline-none cursor-pointer"
                                >
                                    {courses.map(c => (
                                        <option key={c.id} value={c.id} className="text-slate-900">{c.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-200 uppercase tracking-widest pl-1">Target Date</label>
                                <input 
                                    type="date" 
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    className="w-full bg-indigo-700/50 dark:bg-slate-900/50 border-indigo-400/30 rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-white/20 transition-all text-white outline-none"
                                />
                            </div>
                            <div className="p-6 bg-white text-center rounded-3xl shadow-xl shadow-indigo-900/20">
                                <p className="text-4xl font-black text-indigo-600">{daysLeft}</p>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Days to Mastery</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleAddGoal}
                            className="w-full mt-6 py-4 bg-white text-indigo-600 rounded-xl font-black text-sm hover:bg-slate-50 transition-all shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-3 btn-hover-scale"
                        >
                            <FiPlus /> Add Learning Goal
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
                         <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <FiCalendar className="text-indigo-600" /> Focus Streak
                        </h3>
                        <div className="grid grid-cols-7 gap-2">
                            {['M','T','W','T','F','S','S'].map((day, i) => {
                                const todayIndex = (new Date().getDay() + 6) % 7; // Convert Sun(0) to 6, Mon(1) to 0
                                const isPastOrToday = i <= todayIndex;
                                const isStreak = isPastOrToday && i >= Math.max(0, todayIndex - 4); // Simulated active streak for the past 5 days
                                return (
                                <div key={i} className="flex flex-col items-center gap-3">
                                    <span className={`text-[10px] font-black uppercase ${i === todayIndex ? 'text-violet-600 dark:text-violet-400' : 'text-slate-600 dark:text-slate-500'}`}>{day}</span>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black ${isStreak ? 'bg-violet-600 text-white shadow-lg shadow-violet-100' : 'bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border border-slate-100 dark:border-slate-700'} ${i === todayIndex ? 'ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-slate-900' : ''}`}>
                                        {i + 1}
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>

                    {data?.goalsAnalysis?.[0] && <ReminderCard suggestion={data.goalsAnalysis[0].suggestion} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
