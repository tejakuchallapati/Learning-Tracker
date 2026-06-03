import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FiActivity, FiClock, FiList, FiDownload } from 'react-icons/fi';

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

    return (
        <div className="font-body max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
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
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 premium-shadow p-5 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6 flex flex-col items-center">
                    <h3 className="text-[10px] font-black text-slate-900 dark:text-white flex items-center gap-3 self-start uppercase tracking-[0.2em]">
                        <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiActivity size={16} /></div>
                        Focus Allocation
                    </h3>
                    <div className="w-full h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={timeData} innerRadius={60} outerRadius={85} paddingAngle={8} stroke="none" dataKey="value">
                                    {timeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#7c3aed' : index === 1 ? '#a78bfa' : index === 2 ? '#10b981' : '#f59e0b'} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '16px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', fontFamily: 'Outfit' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                            <p className="text-xl font-black text-slate-900 dark:text-white leading-none">0%</p>
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Consistency</p>
                        </div>
                    </div>
                </div>

                {/* Milestone Log */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 premium-shadow p-5 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
                    <h3 className="text-[10px] font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 uppercase tracking-[0.2em]">
                        <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiList size={16} /></div>
                        Milestone Log
                    </h3>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    <th className="pb-4 px-4">Technical Module</th>
                                    <th className="pb-4 px-4">Timestamp</th>
                                    <th className="pb-4 px-4">Intensity</th>
                                    <th className="pb-4 px-4 text-right">Verification</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {completedTopics.map((topic) => (
                                    <tr key={topic.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                        <td className="py-4 px-4">
                                            <p className="font-black text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors uppercase tracking-tight text-xs">{topic.title}</p>
                                            <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-0.5">Course ID: DEV-{topic.id * 128}</p>
                                        </td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400 dark:text-slate-500">{topic.date}</td>
                                        <td className="py-4 px-4 text-xs font-black text-violet-600 dark:text-violet-400">{topic.timeSpent}</td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-[1rem] text-[8px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30">{topic.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: <FiClock />,    label: 'Productive Hours',  val: '0' },
                    { icon: <FiActivity />, label: 'Avg Consistency',   val: '0%' },
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
        </div>
    );
};

export default Insights;
