const ProgressBar = ({ progress = 0, label }) => {
    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{label}</span>
                    <span className="text-sm font-black text-violet-600 dark:text-violet-400">{progress}%</span>
                </div>
            )}
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner">
                <div
                    className="bg-violet-600 dark:bg-violet-500 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                    style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
