import { useEffect, useMemo, useRef, useState } from 'react';
import API from '../../services/api';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const intensityClass = (day) => {
    const { count, allCompleted } = day;
    if (allCompleted) {
        return 'bg-violet-600 dark:bg-violet-400 border-violet-600 dark:border-violet-300 shadow-sm shadow-violet-300/40';
    }
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700';
    if (count === 1) return 'bg-violet-200 dark:bg-violet-900/70 border-violet-200 dark:border-violet-800';
    if (count === 2) return 'bg-violet-400 dark:bg-violet-600 border-violet-400 dark:border-violet-500';
    if (count === 3) return 'bg-violet-500 dark:bg-violet-500 border-violet-500 dark:border-violet-400';
    return 'bg-violet-600 dark:bg-violet-400 border-violet-600 dark:border-violet-300';
};

const formatShortDate = (dateKey) => {
    const [y, m, d] = dateKey.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
};

const GoalConsistencyGraph = ({ refreshKey = 0 }) => {
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hovered, setHovered] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                setLoading(true);
                setError('');
                const { data } = await API.get('daily-goals/activity');
                setActivity(data);
            } catch (err) {
                console.error('Error fetching goal activity:', err);
                setError('Could not load consistency graph. Restart the server and try again.');
                setActivity(null);
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, [refreshKey]);

    useEffect(() => {
        if (!scrollRef.current || !activity?.days?.length) return;
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }, [activity]);

    const weeks = useMemo(() => {
        if (!activity?.days?.length) return [];

        const padded = [
            ...Array(activity.days[0].dayOfWeek).fill(null),
            ...activity.days,
        ];

        const columns = [];
        for (let i = 0; i < padded.length; i += 7) {
            const column = padded.slice(i, i + 7);
            while (column.length < 7) column.push(null);
            columns.push(column);
        }

        return columns;
    }, [activity]);

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-900 premium-shadow p-5 rounded-2xl border border-slate-100 dark:border-slate-800 animate-pulse">
                <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 premium-shadow p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                        Consistency graph
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                        Days you completed your daily goals
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                    <span>{activity?.activeDays ?? 0} active days</span>
                    <span>{activity?.totalCompletions ?? 0} completions</span>
                    {activity?.allCompletedToday && (
                        <span className="px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs uppercase tracking-wide">
                            All goals done today
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <p className="mb-3 text-sm font-bold text-rose-600 dark:text-rose-400">{error}</p>
            )}

            <div ref={scrollRef} className="overflow-x-auto pb-1 scroll-smooth">
                <div className="inline-flex gap-2 min-w-full">
                    <div className="flex flex-col justify-between py-0.5 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
                        {DAY_LABELS.map((label, i) => (
                            <span key={label} className={`h-4 leading-4 ${i % 2 === 0 ? '' : 'opacity-0 sm:opacity-100'}`}>
                                {label}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-1.5">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1.5">
                                {Array.from({ length: 7 }).map((_, rowIndex) => {
                                    const day = week[rowIndex];
                                    if (!day) {
                                        return (
                                            <span
                                                key={rowIndex}
                                                className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-transparent"
                                            />
                                        );
                                    }

                                    const isHovered = hovered?.date === day.date;
                                    const isToday = day.isToday;

                                    return (
                                        <button
                                            key={day.date}
                                            type="button"
                                            title={
                                                day.allCompleted
                                                    ? `${formatShortDate(day.date)}: all goals completed`
                                                    : `${formatShortDate(day.date)}: ${day.count} goal${day.count === 1 ? '' : 's'} completed`
                                            }
                                            onMouseEnter={() => setHovered(day)}
                                            onMouseLeave={() => setHovered(null)}
                                            onFocus={() => setHovered(day)}
                                            onBlur={() => setHovered(null)}
                                            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border transition-transform ${intensityClass(day)} ${isToday ? 'ring-2 ring-violet-400/70 dark:ring-violet-300/80' : ''} ${isHovered ? 'scale-110 ring-2 ring-violet-300 dark:ring-violet-500' : ''}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 min-h-[1rem]">
                    {hovered
                        ? hovered.allCompleted
                            ? `${formatShortDate(hovered.date)} — all ${activity?.totalGoals ?? hovered.count} goals completed`
                            : `${formatShortDate(hovered.date)} — ${hovered.count} goal${hovered.count === 1 ? '' : 's'} completed`
                        : activity?.allCompletedToday
                          ? 'Today: all goals completed — full box filled'
                          : 'Hover a box to see that day'}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                        <span
                            key={level}
                            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border ${intensityClass({ count: level, allCompleted: level === 4 })}`}
                        />
                    ))}
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default GoalConsistencyGraph;
