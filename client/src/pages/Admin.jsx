import { useState, useEffect, useCallback } from 'react';
import { FiUsers, FiAlertCircle, FiTarget, FiInbox, FiRefreshCw } from 'react-icons/fi';
import API from '../services/api';
import LoadingScreen from '../components/ui/LoadingScreen';
import PageHeader, { PAGE_SHELL_FULL } from '../components/layout/PageHeader';

const CATEGORY_LABELS = {
    bug: 'Broken',
    ui: 'Confusing UI',
    feature: 'Missing feature',
    other: 'Other',
};

const STATUS_STYLES = {
    open: 'bg-amber-50 text-amber-700 border-amber-200',
    reviewed: 'bg-sky-50 text-sky-700 border-sky-200',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const formatDate = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [overview, setOverview] = useState(null);
    const [users, setUsers] = useState([]);
    const [issues, setIssues] = useState([]);
    const [issueFilter, setIssueFilter] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);

    const loadData = useCallback(async () => {
        try {
            setError('');
            const [overviewRes, usersRes, issuesRes] = await Promise.all([
                API.get('admin/overview'),
                API.get('admin/users'),
                API.get('admin/feedback'),
            ]);
            setOverview(overviewRes.data);
            setUsers(usersRes.data);
            setIssues(issuesRes.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Could not load admin data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleStatusChange = async (id, status) => {
        setUpdatingId(id);
        try {
            const { data } = await API.patch(`admin/feedback/${id}`, { status });
            setIssues((prev) => prev.map((item) => (item._id === id ? data : item)));
            setOverview((prev) => {
                if (!prev) return prev;
                const openIssues = issues
                    .map((item) => (item._id === id ? data : item))
                    .filter((item) => item.status === 'open').length;
                return { ...prev, openIssues };
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update issue status.');
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredIssues =
        issueFilter === 'all' ? issues : issues.filter((item) => item.status === issueFilter);

    if (loading) {
        return <LoadingScreen message="Loading admin panel" compact />;
    }

    return (
        <div className={PAGE_SHELL_FULL}>
            <PageHeader
                title="Admin"
                description="Registered users and issue reports."
                actions={(
                    <button
                        type="button"
                        onClick={() => {
                            setLoading(true);
                            loadData().finally(() => setLoading(false));
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                    >
                        <FiRefreshCw size={16} /> Refresh
                    </button>
                )}
            />

            {error && (
                <p className="text-sm font-semibold text-rose-600 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-xl px-4 py-3">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Users', value: overview?.usersCount ?? 0, icon: FiUsers, color: 'text-sky-600 bg-sky-50' },
                    { label: 'Open issues', value: overview?.openIssues ?? 0, icon: FiAlertCircle, color: 'text-amber-600 bg-amber-50' },
                    { label: 'Total reports', value: overview?.totalIssues ?? 0, icon: FiInbox, color: 'text-violet-600 bg-violet-50' },
                    { label: 'Learning goals', value: overview?.totalGoals ?? 0, icon: FiTarget, color: 'text-emerald-600 bg-emerald-50' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <FiUsers className="text-sky-500" size={18} />
                        Registered users ({users.length})
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-950/50 text-left">
                            <tr>
                                <th className="px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Name</th>
                                <th className="px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Email</th>
                                <th className="px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Joined</th>
                                <th className="px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Sign-in</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                                    <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">{u.name}</td>
                                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{u.email}</td>
                                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{formatDate(u.createdAt)}</td>
                                    <td className="px-5 py-3">
                                        <span className="inline-flex px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                                            {u.googleId ? 'Google' : 'Email'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <FiAlertCircle className="text-amber-500" size={18} />
                        Issue reports ({filteredIssues.length})
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                        {['all', 'open', 'reviewed', 'resolved'].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setIssueFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border transition-all ${
                                    issueFilter === status
                                        ? 'bg-sky-600 text-white border-sky-500'
                                        : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-sky-400'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredIssues.length === 0 ? (
                        <p className="px-5 py-10 text-sm text-slate-500 text-center">No issue reports yet.</p>
                    ) : (
                        filteredIssues.map((issue) => (
                            <div key={issue._id} className="px-5 py-4 space-y-3">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${STATUS_STYLES[issue.status] || STATUS_STYLES.open}`}>
                                                {issue.status}
                                            </span>
                                            <span className="inline-flex px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                                                {CATEGORY_LABELS[issue.category] || issue.category}
                                            </span>
                                            <span className="text-xs text-slate-400">{formatDate(issue.createdAt)}</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            {issue.userName || 'Unknown user'}
                                            <span className="font-medium text-slate-500"> · {issue.userEmail}</span>
                                        </p>
                                        {issue.page && (
                                            <p className="text-xs text-slate-500 mt-1">Page: <code className="text-sky-600">{issue.page}</code></p>
                                        )}
                                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 whitespace-pre-wrap">{issue.message}</p>
                                    </div>
                                    <select
                                        value={issue.status}
                                        disabled={updatingId === issue._id}
                                        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                                        className="shrink-0 h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer disabled:opacity-50"
                                    >
                                        <option value="open">Open</option>
                                        <option value="reviewed">Reviewed</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
