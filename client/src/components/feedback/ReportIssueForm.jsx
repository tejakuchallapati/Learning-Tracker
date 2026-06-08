import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiAlertCircle, FiCheckCircle, FiSend } from 'react-icons/fi';
import API from '../../services/api';

const CATEGORIES = [
    { value: 'bug', label: 'Something is broken' },
    { value: 'ui', label: 'Hard to use / confusing' },
    { value: 'feature', label: 'Missing feature' },
    { value: 'other', label: 'Other' },
];

const ReportIssueForm = ({ onSuccess, compact = false }) => {
    const location = useLocation();
    const [category, setCategory] = useState('bug');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (message.trim().length < 10) {
            setError('Please describe the problem in a bit more detail (at least 10 characters).');
            return;
        }

        setSubmitting(true);
        try {
            const { data } = await API.post('feedback', {
                category,
                message: message.trim(),
                page: location.pathname,
            });
            setSuccess(data?.message || 'Report sent. Thank you!');
            setMessage('');
            setCategory('bug');
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.message || 'Could not send your report. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={compact ? 'space-y-4' : 'space-y-5'}>
            <p className={`text-slate-500 dark:text-slate-400 ${compact ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                Running into trouble? Tell us what happened and we&apos;ll work on a fix.
            </p>

            <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    What kind of issue?
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer"
                >
                    {CATEGORIES.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Describe the problem
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={compact ? 4 : 5}
                    maxLength={2000}
                    placeholder="What were you trying to do? What went wrong?"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all resize-y min-h-[100px]"
                />
                <p className="text-[11px] text-slate-400 text-right">{message.length}/2000</p>
            </div>

            {error && (
                <p className="flex items-start gap-2 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-xl px-3 py-2.5">
                    <FiAlertCircle className="shrink-0 mt-0.5" size={14} />
                    {error}
                </p>
            )}

            {success && (
                <p className="flex items-start gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl px-3 py-2.5">
                    <FiCheckCircle className="shrink-0 mt-0.5" size={14} />
                    {success}
                </p>
            )}

            <button
                type="submit"
                disabled={submitting || message.trim().length < 10}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
                <FiSend size={16} />
                {submitting ? 'Sending…' : 'Send report'}
            </button>
        </form>
    );
};

export default ReportIssueForm;
