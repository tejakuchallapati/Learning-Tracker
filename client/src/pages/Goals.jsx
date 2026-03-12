import { useState, useEffect } from 'react';
import API from '../services/api';
import GoalCard from '../components/GoalCard';
import { FiPlus } from 'react-icons/fi';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        technology: '',
        durationDays: '',
        dailyTargetHours: '',
        endDate: ''
    });
    const [editingId, setEditingId] = useState(null);

    const fetchGoals = async () => {
        try {
            const { data } = await API.get('/goals');
            setGoals(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadGoals = async () => {
            await fetchGoals();
        };
        loadGoals();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/goals/${editingId}`, formData);
            } else {
                await API.post('/goals/create', formData);
            }
            setShowModal(false);
            setFormData({ technology: '', durationDays: '', dailyTargetHours: '', endDate: '' });
            setEditingId(null);
            fetchGoals();
        } catch (err) {
            console.error('Failed to save goal', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            try {
                await API.delete(`/goals/${id}`);
                fetchGoals();
            } catch (err) {
                console.error('Failed to delete', err);
            }
        }
    };

    const handleEdit = (goal) => {
        setFormData({
            technology: goal.technology,
            durationDays: goal.durationDays,
            dailyTargetHours: goal.dailyTargetHours,
            endDate: new Date(goal.endDate).toISOString().split('T')[0]
        });
        setEditingId(goal._id);
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Learning Goals</h2>
                <button
                    onClick={() => { setEditingId(null); setShowModal(true); }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                    <FiPlus /> Add Goal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => (
                    <GoalCard
                        key={goal._id}
                        goal={goal}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            {editingId ? 'Edit Goal' : 'Create New Goal'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Technology to Learn</label>
                                <input type="text" name="technology" value={formData.technology} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="e.g. React.js" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                                    <input type="number" name="durationDays" value={formData.durationDays} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Target (Hrs)</label>
                                    <input type="number" name="dailyTargetHours" value={formData.dailyTargetHours} onChange={handleChange} required step="0.5" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            </div>

                            <div className="flex gap-3 justify-end mt-8">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{editingId ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goals;
