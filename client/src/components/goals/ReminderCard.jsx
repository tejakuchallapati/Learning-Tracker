import { FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ReminderCard = ({ suggestion }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-5 border border-violet-100 dark:border-violet-900/40">
            <div>
                <h4 className="text-violet-900 dark:text-violet-200 font-bold mb-1">Smart Reminder</h4>
                <p className="text-violet-800/90 dark:text-violet-300/90 text-sm leading-relaxed">
                    {suggestion || "You haven't practiced today. Spend at least 1 hour learning to stay on track."}
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/progress')}
                    className="mt-3 w-full sm:w-auto text-sm font-semibold text-violet-700 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-100 inline-flex items-center gap-2 min-h-[44px] px-3 py-2.5 -ml-3 rounded-lg hover:bg-violet-100/60 dark:hover:bg-violet-900/40 transition-colors"
                >
                    <FiClock /> Log Time Now
                </button>
            </div>
        </div>
    );
};

export default ReminderCard;
