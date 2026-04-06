const StatsCard = ({ title, value, icon, description }) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl premium-shadow border border-slate-200 dark:border-slate-800 flex items-center gap-6 transition-all group hover:scale-[1.02]">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0 group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500 transition-all duration-300">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{value}</span>
                    {description && <span className="text-xs font-bold text-emerald-500">{description}</span>}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
