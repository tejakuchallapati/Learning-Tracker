import { useState, useEffect } from 'react';
import API from '../services/api';
import ChartCard from '../components/ChartCard';
import ProgressBar from '../components/ProgressBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyConsistencyData = [];

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/analytics/dashboard').then(res => {
            setAnalytics(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-8">Loading analytics...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Learning Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Monthly Consistency Score">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dummyConsistencyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                            <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Smart Progress Analysis</h3>
                    <div className="space-y-6">
                        {analytics?.goalsAnalysis?.map(g => (
                            <div key={g.goalId}>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold text-gray-700 dark:text-slate-300">{g.technology}</span>
                                    <span className="text-xs text-gray-500 dark:text-slate-500">Expected: {g.expectedProgress}%</span>
                                </div>
                                <ProgressBar progress={g.currentProgress} label="Current" />
                                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 italic border-l-2 border-indigo-400 pl-3">
                                    "{g.suggestion}"
                                </p>
                            </div>
                        ))}
                        {(!analytics?.goalsAnalysis || analytics.goalsAnalysis.length === 0) && (
                            <p className="text-gray-500 text-sm">No goals to analyze.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
