const ProgressBar = ({ progress = 0, label }) => {
    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-medium text-indigo-600">{progress}%</span>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
