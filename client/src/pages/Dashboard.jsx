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
    { name: 'Mon', hours: 2 }, { name: 'Tue', hours: 3 }, { name: 'Wed', hours: 1 },
    { name: 'Thu', hours: 4 }, { name: 'Fri', hours: 2 }, { name: 'Sat', hours: 5 }, { name: 'Sun', hours: 3 }
];

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState([]);
    
    // Goal Setting State
    const [selectedTrack, setSelectedTrack] = useState(courses[0].id);
    const [targetDate, setTargetDate] = useState('2024-12-31');
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const calculateDays = () => {
            const diff = new Date(targetDate) - new Date();
            setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
        };
        calculateDays();
    }, [targetDate]);

    const handleAddGoal = () => {
        const track = courses.find(c => c.id === selectedTrack);
        const newGoal = {
            _id: Date.now().toString(),
            technology: track?.title || 'Unknown',
            category: track?.category || 'General',
            startDate: new Date().toISOString(),
            endDate: targetDate,
            durationDays: daysLeft,
            dailyTargetHours: 2,
            currentProgress: 0
        };
        setGoals(prev => [newGoal, ...(prev || [])]);
        alert(`Successfully added ${track?.title} to your active goals!`);
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
                setData({ totalStudyHours: 42, weeklyStudyHours: 12, completionRate: 75 });
                setGoals([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-gray-100/50">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        Dashboard <span className="text-base font-medium px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100/50 dark:border-indigo-800 uppercase tracking-widest">Active Focus</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Precision learning dashboard for professional mastery.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {(user?.name ? [1, 2, 3] : []).map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <div className="h-8 w-px bg-slate-200 mx-2"></div>
                    <button 
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 btn-hover-scale flex items-center gap-2"
                    >
                        <FiPlus /> New Roadmap
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card premium-shadow p-8 rounded-[2.5rem] group hover:bg-white dark:hover:bg-slate-800/50 transition-all cursor-default">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem] group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                            <FiClock size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                            <p className="text-xs font-bold text-emerald-500">+12% Peak</p>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{data?.totalStudyHours ?? 0}h</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-1">Total Study Time</p>
                </div>

                <div className="glass-card premium-shadow p-8 rounded-[2.5rem] group hover:bg-white transition-all cursor-default">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-rose-50 text-rose-600 rounded-[1.5rem] group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                            <FiActivity size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Intensity</p>
                            <p className="text-xs font-bold text-rose-500">High Focus</p>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">{data?.weeklyStudyHours ?? 0}h</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-1">Weekly Intensity</p>
                </div>

                <div className="glass-card premium-shadow p-8 rounded-[2.5rem] group hover:bg-white transition-all cursor-default lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <FiPlus size={120} />
                    </div>
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-[1.5rem]">
                                <FiTarget size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Current Goal Progress</h3>
                                <p className="text-sm font-medium text-slate-500">Track and manage your active paths</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-2">
                            <div 
                                className="bg-indigo-600 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000"
                                style={{ width: `${data?.completionRate || 65}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Activity & Goals */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Activity Chart */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                         <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Focus Distribution</h3>
                                <p className="text-sm font-medium text-slate-500 mt-1">Detailed activity analysis by days</p>
                            </div>
                            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                                <button className="px-6 py-2 bg-white text-indigo-600 rounded-xl text-xs font-black shadow-sm shadow-indigo-100 transition-all">WEEKLY</button>
                                <button className="px-6 py-2 text-slate-400 rounded-xl text-xs font-black hover:text-slate-600 transition-all">MONTHLY</button>
                            </div>
                        </div>
                        <div className="h-[400px] -ml-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dummyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
                                        itemStyle={{ color: '#4f46e5', fontWeight: '900', fontSize: '14px' }}
                                        cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '6 6' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="hours"
                                        stroke="#6366f1"
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
                             <h3 className="text-2xl font-black text-slate-900">Active Paths</h3>
                             <button onClick={() => navigate('/courses')} className="text-sm font-black text-indigo-600 hover:text-indigo-700 transition-all flex items-center gap-2">View Curriculum <FiArrowRight /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                            {goals.slice(0, 2).map(goal => (
                                <GoalCard key={goal._id} goal={goal} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Goal Setting & Tips */}
                <div className="lg:col-span-4 space-y-8">
                     <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl group border border-slate-800">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                            <FiTarget className="text-indigo-400" /> Fast-Track Goal
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Course Choice</label>
                                <select 
                                    value={selectedTrack}
                                    onChange={(e) => setSelectedTrack(e.target.value)}
                                    className="w-full bg-slate-800 border-slate-700/50 rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all text-white outline-none cursor-pointer"
                                >
                                    {courses.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Target Date</label>
                                <input 
                                    type="date" 
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    className="w-full bg-slate-800 border-slate-700/50 rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all text-white outline-none"
                                />
                            </div>
                            <div className="p-6 bg-indigo-600 text-center rounded-3xl shadow-xl shadow-indigo-500/10">
                                <p className="text-4xl font-black">{daysLeft}</p>
                                <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mt-1">Days to Mastery</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleAddGoal}
                            className="w-full mt-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-sm hover:bg-slate-50 transition-all shadow-xl shadow-indigo-900/50 flex items-center justify-center gap-3 btn-hover-scale"
                        >
                            <FiPlus /> Add Learning Goal
                        </button>
                    </div>

                    <div className="bg-white rounded-[3.5rem] p-10 border border-gray-100 shadow-sm">
                         <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <FiCalendar className="text-indigo-600" /> Focus Streak
                        </h3>
                        <div className="grid grid-cols-7 gap-2">
                            {['M','T','W','T','F','S','S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-3">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">{day}</span>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black ${i < 4 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                                        {i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {data?.goalsAnalysis?.[0] && <ReminderCard suggestion={data.goalsAnalysis[0].suggestion} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
