import { FiClock, FiAlertCircle } from 'react-icons/fi';

const ReminderCard = ({ suggestion }) => {
    return (
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <div className="flex items-start gap-4">
                <div className="mt-1">
                    <FiAlertCircle className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                    <h4 className="text-amber-800 font-bold mb-1">Smart Reminder</h4>
                    <p className="text-amber-700 text-sm leading-relaxed">
                        {suggestion || "You haven't practiced today. Spend at least 1 hour learning to stay on track."}
                    </p>
                    <button className="mt-3 text-sm font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-2">
                        <FiClock /> Log Time Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderCard;
