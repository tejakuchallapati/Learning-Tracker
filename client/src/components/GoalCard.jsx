import { FiClock, FiCalendar, FiTrash2, FiEdit2 } from 'react-icons/fi';

const GoalCard = ({ goal, onDelete, onEdit }) => {
    const startDate = new Date(goal.startDate).toLocaleDateString();
    const endDate = new Date(goal.endDate).toLocaleDateString();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{goal.technology}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                        Active
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit && onEdit(goal)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete && onDelete(goal._id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCalendar className="text-indigo-500" />
                    <span>{goal.durationDays} Days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiClock className="text-indigo-500" />
                    <span>{goal.dailyTargetHours} hrs/day</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between text-xs text-gray-500">
                <span>Start: {startDate}</span>
                <span>End: {endDate}</span>
            </div>
        </div>
    );
};

export default GoalCard;
