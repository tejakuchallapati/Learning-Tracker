import { useState, useEffect } from 'react';
import API from '../services/api';
import ProgressBar from '../components/ProgressBar';
import { FiCheckCircle, FiClock, FiActivity, FiXCircle } from 'react-icons/fi';

const Progress = () => {
    const [goals, setGoals] = useState([]);
    const [progressData, setProgressData] = useState({});
    const [loading, setLoading] = useState(true);

    // Stopwatch state
    const [timerActive, setTimerActive] = useState(false);
    const [time, setTime] = useState(0); // seconds
    const [activeGoalId, setActiveGoalId] = useState('');

    const fetchData = async () => {
        try {
            const { data } = await API.get('/goals');
            setGoals(data);

            const progressMap = {};
            await Promise.all(data.map(async (goal) => {
                try {
                    const res = await API.get(`/progress/${goal._id}`);
                    progressMap[goal._id] = res.data;
                } catch (e) {
                    console.error('No progress yet for', goal._id);
                }
            }));
            setProgressData(progressMap);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Stopwatch effect
    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else if (!timerActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerActive, time]);

    const handleMarkComplete = async (goalId) => {
        try {
            await API.post('/progress/mark-complete', { goalId });
            alert('Day marked as completed!');
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to mark complete');
        }
    };

    const handleStopTimer = async () => {
        setTimerActive(false);
        if (!activeGoalId || time < 60) {
            alert("Please select a goal and study for at least 1 minute to save.");
            setTime(0);
            return;
        }

        const hours = Number((time / 3600).toFixed(2));

        try {
            await API.post('/time/log', { goalId: activeGoalId, hours });
            alert(`Logged ${hours} hours successfully!`);
            setTime(0);
            setActiveGoalId('');
            fetchData();
        } catch (err) {
            alert('Failed to log time');
        }
    };

    const formatTime = (secs) => {
        const h = Math.floor(secs / 3600).toString().padStart(2, '0');
        const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    if (loading) return <div className="p-8">Loading progress...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Track Progress</h2>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2"><FiClock className="text-indigo-600" /> Study Stopwatch</h3>
                    <p className="text-gray-500 text-sm mb-4">Start the timer when you begin studying. It will log your hours automatically when you stop.</p>

                    <select
                        value={activeGoalId}
                        onChange={(e) => setActiveGoalId(e.target.value)}
                        className="w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={timerActive}
                    >
                        <option value="">Select a Goal</option>
                        {goals.map(g => (
                            <option key={g._id} value={g._id}>{g.technology}</option>
                        ))}
                    </select>
                </div>

                <div className="text-center md:text-right">
                    <div className="text-5xl font-mono font-bold text-indigo-900 mb-4">{formatTime(time)}</div>
                    <div className="flex gap-3 justify-center md:justify-end">
                        {!timerActive ? (
                            <button onClick={() => setTimerActive(true)} disabled={!activeGoalId} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50">Start Timer</button>
                        ) : (
                            <button onClick={handleStopTimer} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold">Stop & Save</button>
                        )}
                        {time > 0 && !timerActive && (
                            <button onClick={() => setTime(0)} className="text-gray-500 hover:underline px-4">Reset</button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map(goal => {
                    const pData = progressData[goal._id] || { completedDays: 0, completionPercent: 0, daysRemaining: goal.durationDays };

                    return (
                        <div key={goal._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{goal.technology}</h3>
                                    <span className="text-sm text-gray-500">{pData.daysRemaining} days remaining</span>
                                </div>
                                <button
                                    onClick={() => handleMarkComplete(goal._id)}
                                    className="text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
                                >
                                    <FiCheckCircle /> Mark Complete Today
                                </button>
                            </div>

                            <div className="space-y-4">
                                <ProgressBar progress={pData.completionPercent} label="Overall Completion" />

                                <div className="flex items-center gap-4 mt-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md">
                                        <FiActivity className="text-indigo-500" />
                                        <span className="font-semibold text-gray-900">{pData.completedDays}</span> days completed
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md">
                                        <FiClock className="text-indigo-500" />
                                        <span className="font-semibold text-gray-900">{goal.dailyTargetHours}</span> hrs target
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {goals.length === 0 && <div className="text-gray-500 md:col-span-2 text-center py-8">No goals active.</div>}
            </div>
        </div>
    );
};

export default Progress;
