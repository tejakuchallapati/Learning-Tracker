const ChartCard = ({ title, children }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
            <div className="flex-1 w-full min-h-[300px]">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;
