import { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiTrash2, FiCalendar, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import API from '../services/api';

const Notes = () => {
    // Get local date in YYYY-MM-DD format
    const getTodayString = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const normalizeDate = (dateStr) => {
        if (!dateStr) return getTodayString();
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return dateStr;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(getTodayString());
    const [learned, setLearned] = useState('');
    const [future, setFuture] = useState('');
    const [saved, setSaved] = useState(false);
    const [notesList, setNotesList] = useState([]);

    const fetchNotesList = async () => {
        try {
            const { data } = await API.get('notes');
            setNotesList(data);
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    };

    // Load notes list on mount
    useEffect(() => {
        fetchNotesList();
    }, []);

    const loadNoteForDate = async (date, preload = null) => {
        const normalized = normalizeDate(date);
        setSelectedDate(normalized);

        if (preload) {
            setLearned(preload.learned || '');
            setFuture(preload.future || '');
            return;
        }

        try {
            const { data } = await API.get(`notes/date/${normalized}`);
            setLearned(data.learned || '');
            setFuture(data.future || '');
        } catch (err) {
            console.error('Error loading note:', err);
            setLearned('');
            setFuture('');
        }
    };

    useEffect(() => {
        loadNoteForDate(selectedDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openArchiveLog = (note) => {
        loadNoteForDate(note.date, note);
        document.getElementById('notes-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSave = async () => {
        try {
            await API.post('notes/save', {
                date: selectedDate,
                learned: learned.trim(),
                future: future.trim()
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            fetchNotesList();
        } catch (err) {
            console.error('Error saving note:', err);
            alert('Failed to save notes. Please try again.');
        }
    };

    const handleDeleteLog = async (dateToDelete, e) => {
        e.stopPropagation();
        if (!window.confirm(`Are you sure you want to delete the notes for ${dateToDelete}?`)) return;

        try {
            await API.delete(`notes/date/${dateToDelete}`);
            fetchNotesList();

            if (selectedDate === normalizeDate(dateToDelete)) {
                setLearned('');
                setFuture('');
            }
        } catch (err) {
            console.error('Error deleting note:', err);
            alert('Failed to delete note. Please try again.');
        }
    };

    // Format selectedDate for title header
    const formatDisplayDate = (dateStr) => {
        try {
            const parts = dateStr.split('-');
            const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            return dateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Engineering Logs</h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-2 text-sm font-bold leading-relaxed">Persistent documentation of your daily technical growth.</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-violet-600 transition-all shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-2 btn-hover-scale"
                >
                    <FiSave size={16} /> Save logs {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                </button>
            </div>

            <div id="notes-editor" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1: Today's Learnings */}
                <div className="bg-white dark:bg-slate-900 premium-shadow p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6 transition-all">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-[0.2em]">
                            <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiEdit size={16} /></div>
                            Daily Manifest
                        </h3>
                        <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                            {formatDisplayDate(selectedDate)}
                        </span>
                    </div>
                    <textarea 
                        value={learned}
                        onChange={(e) => setLearned(e.target.value)}
                        placeholder="Write your learnings here..."
                        className="w-full h-[250px] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl p-6 text-[13px] font-bold text-slate-800 dark:text-slate-300 focus:ring-4 focus:ring-violet-500/10 transition-all resize-none placeholder-slate-500 dark:placeholder-slate-600 leading-relaxed font-mono outline-none"
                    />
                </div>

                {/* Column 2: Tomorrow's Agenda */}
                <div className="bg-white dark:bg-slate-900 premium-shadow p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                        <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-[0.2em]">
                            <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiCalendar size={16} /></div>
                            Future Sprint
                        </h3>
                    </div>
                    <textarea 
                        value={future}
                        onChange={(e) => setFuture(e.target.value)}
                        placeholder="Write your future plan here..."
                        className="w-full h-[250px] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl p-6 text-[13px] font-bold text-slate-800 dark:text-slate-300 focus:ring-4 focus:ring-violet-500/10 transition-all resize-none placeholder-slate-500 dark:placeholder-slate-600 leading-relaxed font-mono relative z-10 outline-none"
                    />
                    <div className="pt-2 flex items-center gap-3 text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-[0.3em] relative z-10">
                        <FiArrowRight className="animate-pulse" /> BUILD SMALL • SHIP OFTEN • REPEAT
                    </div>
                </div>
            </div>

            {/* Persistence Reminder */}
            <div className="p-6 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-6 group transition-all">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl shrink-0 shadow-sm group-hover:rotate-12 transition-transform duration-500"><FiTrash2 /></div>
                <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Persistence Active</p>
                    <p className="text-xs text-slate-600 dark:text-slate-500 font-bold mt-1.5 uppercase tracking-tight leading-relaxed">Log data is stored securely in the database. Connected to your user profile.</p>
                </div>
            </div>

            {/* Logs History & Date Selection - Placed at the bottom */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-6 space-y-6">
                <div className="max-w-xl">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Logs History & Date Selection</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">Select other dates to log past learnings or review your journal archive.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Date Picker Card */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Choose Active Date</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                value={selectedDate}
                                onChange={(e) => loadNoteForDate(e.target.value)}
                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                            />
                        </div>
                        <p className="text-xs text-violet-600 dark:text-violet-400 font-black uppercase tracking-tight">
                            Selected: {formatDisplayDate(selectedDate)}
                        </p>
                    </div>

                    {/* History/Saved List */}
                    <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Saved Logs Archive</label>
                        {notesList.length === 0 ? (
                            <p className="text-xs font-bold text-slate-400 py-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl uppercase">No archived logs found.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                                {notesList.map((note) => {
                                    const isSelected = normalizeDate(note.date) === selectedDate;
                                    const displayLearned = note.learned || 'Empty log';
                                    return (
                                        <div
                                            key={note.date}
                                            className={`p-3 rounded-xl border text-left transition-all flex justify-between items-center group/item ${isSelected ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-violet-500 text-slate-900 dark:text-slate-300'}`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => openArchiveLog(note)}
                                                className="min-w-0 flex-1 pr-2 text-left"
                                            >
                                                <p className={`text-xs font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                                    {new Date(normalizeDate(note.date) + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                                <p className={`text-xs font-medium truncate mt-1 ${isSelected ? 'text-violet-200' : 'text-slate-500 dark:text-slate-400'}`}>
                                                    {displayLearned}
                                                </p>
                                            </button>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleDeleteLog(note.date, e)}
                                                    title="Delete this log"
                                                    className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'text-violet-200 hover:text-white hover:bg-violet-700' : 'text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                                >
                                                    <FiTrash2 size={12} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => openArchiveLog(note)}
                                                    title="Open saved log"
                                                    className={`p-1.5 rounded-lg transition-all ${isSelected ? 'text-white hover:bg-violet-700' : 'text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-800 group-hover/item:translate-x-0.5'}`}
                                                >
                                                    <FiArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;
