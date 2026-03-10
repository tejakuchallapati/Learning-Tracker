const StatsCard = ({ title, value, icon, description }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="text-gray-500 text-sm font-medium">{title}</h4>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-800">{value}</span>
                    {description && <span className="text-xs text-gray-400">{description}</span>}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
