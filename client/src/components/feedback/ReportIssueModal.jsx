import { useEffect } from 'react';
import { FiX, FiMessageCircle } from 'react-icons/fi';
import ReportIssueForm from './ReportIssueForm';

const ReportIssueModal = ({ open, onClose }) => {
    useEffect(() => {
        if (!open) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <button
                type="button"
                aria-label="Close"
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="report-issue-title"
                className="relative w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90dvh] overflow-y-auto"
            >
                <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-t-3xl sm:rounded-t-2xl">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center text-sky-600 shrink-0">
                            <FiMessageCircle size={18} />
                        </div>
                        <div className="min-w-0">
                            <h2 id="report-issue-title" className="text-base font-black text-slate-900 dark:text-white truncate">
                                Report an issue
                            </h2>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">We&apos;ll use this to improve the app</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                        aria-label="Close dialog"
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <div className="p-5">
                    <ReportIssueForm compact onSuccess={() => setTimeout(onClose, 1800)} />
                </div>
            </div>
        </div>
    );
};

export default ReportIssueModal;
