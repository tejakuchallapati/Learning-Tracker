import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FiActivity, FiAward, FiClock, FiList, FiCheckCircle, FiLock, FiDownload, FiTrendingUp, FiZap, FiCpu, FiBook, FiStar } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';

const badges = [
    { icon: <FaRocket />, color: 'text-rose-400 bg-rose-500/10 shadow-rose-500/20 border-rose-500/20', name: 'First Launch',    desc: 'Logged first study session',    earned: true },
    { icon: <FiTrendingUp />, color: 'text-orange-400 bg-orange-500/10 shadow-orange-500/20 border-orange-500/20', name: '7-Day Streak',    desc: 'Studied 7 days in a row',        earned: true },
    { icon: <FiZap />, color: 'text-amber-400 bg-amber-500/10 shadow-amber-500/20 border-amber-500/20', name: 'Speed Learner',   desc: 'Completed a topic in under 1 day', earned: true },
    { icon: <FiAward />, color: 'text-emerald-400 bg-emerald-500/10 shadow-emerald-500/20 border-emerald-500/20', name: 'Track Master',    desc: 'Completed an entire roadmap',   earned: false },
    { icon: <FiClock />, color: 'text-cyan-400 bg-cyan-500/10 shadow-cyan-500/20 border-cyan-500/20', name: '100 Hours',       desc: 'Logged 100+ study hours',        earned: false },
    { icon: <FiCpu />, color: 'text-violet-400 bg-violet-500/10 shadow-violet-500/20 border-violet-500/20', name: 'Deep Thinker',    desc: 'Used AI Mentor 10+ times',       earned: false },
    { icon: <FiBook />, color: 'text-blue-400 bg-blue-500/10 shadow-blue-500/20 border-blue-500/20', name: 'Bookworm',        desc: 'Saved 5+ resources to library',  earned: false },
    { icon: <FiStar />, color: 'text-fuchsia-400 bg-fuchsia-500/10 shadow-fuchsia-500/20 border-fuchsia-500/20', name: 'Consistent Pro',  desc: 'Maintained 30-day streak',       earned: false },
];

const Insights = () => {
    const timeData = [
        { name: 'React Focus', value: 45, color: '#6366f1' },
        { name: 'Architecture', value: 25, color: '#8b5cf6' },
        { name: 'System Design', value: 20, color: '#10b981' },
        { name: 'Database', value: 10, color: '#f59e0b' },
    ];

    const completedTopics = [
        { id: 1, title: 'React Hooks Deep Dive', date: 'Today', timeSpent: '4.5 hrs', status: 'Verified' },
        { id: 2, title: 'RESTful API Design', date: 'Yesterday', timeSpent: '3.2 hrs', status: 'Verified' },
        { id: 3, title: 'JWT Authentication', date: '3 days ago', timeSpent: '5.1 hrs', status: 'Verified' },
        { id: 4, title: 'Advanced State Management', date: 'Last week', timeSpent: '6.0 hrs', status: 'Verified' },
    ];

    const earnedCount = badges.filter(b => b.earned).length;

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Mastery Analytics</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium leading-relaxed">Advanced behavioral tracking and engineering growth statistics.</p>
                </div>
                <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 btn-hover-scale shrink-0 print:hidden"
                >
                    <FiDownload size={18} /> Export PDF Report
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Focus Pie */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 premium-shadow p-8 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-8 flex flex-col items-center">
                    <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-4 self-start uppercase tracking-[0.2em]">
                        <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiActivity size={18} /></div>
                        Focus Allocation
                    </h3>
                    <div className="w-full h-80 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={timeData} innerRadius={70} outerRadius={100} paddingAngle={10} stroke="none" dataKey="value">
                                    {timeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#7c3aed' : index === 1 ? '#a78bfa' : index === 2 ? '#10b981' : '#f59e0b'} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '24px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', fontFamily: 'Outfit' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">0%</p>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Consistency</p>
                        </div>
                    </div>
                </div>

                {/* Milestone Log */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 premium-shadow p-8 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
                    <h3 className="text-xs font-black text-slate-900 dark:text-white mb-12 flex items-center gap-4 uppercase tracking-[0.2em]">
                        <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiList size={18} /></div>
                        Milestone Log
                    </h3>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    <th className="pb-8 px-6">Technical Module</th>
                                    <th className="pb-8 px-6">Timestamp</th>
                                    <th className="pb-8 px-6">Intensity</th>
                                    <th className="pb-8 px-6 text-right">Verification</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {completedTopics.map((topic) => (
                                    <tr key={topic.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                        <td className="py-8 px-6">
                                            <p className="font-black text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors uppercase tracking-tight">{topic.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-1">Course ID: DEV-{topic.id * 128}</p>
                                        </td>
                                        <td className="py-8 px-6 text-sm font-bold text-slate-400 dark:text-slate-500">{topic.date}</td>
                                        <td className="py-8 px-6 text-sm font-black text-violet-600 dark:text-violet-400">{topic.timeSpent}</td>
                                        <td className="py-8 px-6 text-right">
                                            <span className="px-6 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-[1rem] text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30">{topic.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { icon: <FiClock />,    label: 'Productive Hours',  val: '0' },
                    { icon: <FiActivity />, label: 'Avg Consistency',   val: '0%' },
                    { icon: <FiAward />,    label: 'badges Earned',     val: `${earnedCount}/${badges.length}` },
                    { icon: <FiActivity />, label: 'Target Accuracy',   val: '0%' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 premium-shadow p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-2 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 text-violet-600 dark:text-violet-400 flex items-center justify-center text-2xl mb-8 shadow-sm group-hover:bg-violet-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                            {stat.icon}
                        </div>
                        <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.val}</p>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-3 leading-none">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* 🏆 Trophy Room */}
            <div className="space-y-8">
                <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400 rounded-2xl flex items-center justify-center shadow-sm text-2xl">🏆</div>
                            Trophy Room
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">{earnedCount} of {badges.length} achievements unlocked. Keep learning!</p>
                    </div>
                    <div className="px-6 py-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-900/40">{earnedCount} Earned</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {badges.map((badge, i) => (
                        <div key={i} className={`relative p-8 rounded-3xl border flex flex-col items-center text-center transition-all duration-500 group ${badge.earned ? 'bg-slate-900 border-slate-800 hover:-translate-y-2 shadow-xl' : 'bg-slate-950/50 border-slate-900 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}>
                            {badge.earned
                                ? <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center"><FiCheckCircle className="text-emerald-400" size={12} /></div>
                                : <div className="absolute top-4 right-4 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center"><FiLock className="text-slate-500" size={12} /></div>
                            }
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg border transition-all duration-500 ${badge.color} ${badge.earned ? 'group-hover:scale-110 group-hover:rotate-6' : ''}`}>
                                {badge.icon}
                            </div>
                            <h4 className="text-sm font-black text-white leading-tight uppercase tracking-tight">{badge.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold mt-2 leading-relaxed uppercase tracking-tight">{badge.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insights;
