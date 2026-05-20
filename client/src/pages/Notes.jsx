import { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiTrash2, FiCalendar, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const Notes = () => {
    // Get local date in YYYY-MM-DD format
    const getTodayString = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(getTodayString());
    const [learned, setLearned] = useState('');
    const [future, setFuture] = useState('');
    const [saved, setSaved] = useState(false);
    const [savedDates, setSavedDates] = useState(() => {
        try {
            const list = localStorage.getItem('notes-saved-dates');
            return list ? JSON.parse(list) : [];
        } catch {
            return [];
        }
    });

    // Load notes when selectedDate changes
    useEffect(() => {
        const todayStr = getTodayString();
        let storedLearned = localStorage.getItem(`notes-learned-${selectedDate}`);
        let storedFuture = localStorage.getItem(`notes-future-${selectedDate}`);

        // Fallback/backward compatibility for today's notes
        if (selectedDate === todayStr) {
            if (storedLearned === null) {
                storedLearned = localStorage.getItem('notes-learned') || '';
            }
            if (storedFuture === null) {
                storedFuture = localStorage.getItem('notes-future') || '';
            }
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLearned(storedLearned || '');
        setFuture(storedFuture || '');
    }, [selectedDate]);

    const handleSave = () => {
        const todayStr = getTodayString();
        
        // Save date-specific notes
        localStorage.setItem(`notes-learned-${selectedDate}`, learned);
        localStorage.setItem(`notes-future-${selectedDate}`, future);

        // For backward compatibility, if saving for today, also update default legacy keys
        if (selectedDate === todayStr) {
            localStorage.setItem('notes-learned', learned);
            localStorage.setItem('notes-future', future);
        }

        // Add to saved dates list if not already present, provided notes aren't completely empty
        if (learned.trim() !== '' || future.trim() !== '') {
            if (!savedDates.includes(selectedDate)) {
                const updatedDates = [...savedDates, selectedDate].sort((a, b) => b.localeCompare(a));
                setSavedDates(updatedDates);
                localStorage.setItem('notes-saved-dates', JSON.stringify(updatedDates));
            }
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleDeleteLog = (dateToDelete, e) => {
        e.stopPropagation();
        if (!window.confirm(`Are you sure you want to delete the notes for ${dateToDelete}?`)) return;

        localStorage.removeItem(`notes-learned-${dateToDelete}`);
        localStorage.removeItem(`notes-future-${dateToDelete}`);
        
        const todayStr = getTodayString();
        if (dateToDelete === todayStr) {
            localStorage.removeItem('notes-learned');
            localStorage.removeItem('notes-future');
        }

        const updatedDates = savedDates.filter(d => d !== dateToDelete);
        setSavedDates(updatedDates);
        localStorage.setItem('notes-saved-dates', JSON.stringify(updatedDates));

        if (selectedDate === dateToDelete) {
            setLearned('');
            setFuture('');
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
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Engineering Logs</h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-2 text-sm font-bold leading-relaxed">Persistent documentation of your daily technical growth.</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-violet-600 transition-all shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-2 btn-hover-scale"
                >
                    <FiSave size={16} /> SYNC LOGS {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1: Today's Learnings */}
                <div className="bg-white dark:bg-slate-900 premium-shadow p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6 transition-all">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-[0.2em]">
                            <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shadow-sm"><FiEdit size={16} /></div>
                            Daily Manifest
                        </h3>
                        <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-500 rounded-xl text-[8px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700">
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
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-white relative overflow-hidden group transition-all">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                        <h3 className="text-[10px] font-black flex items-center gap-3 uppercase tracking-[0.2em]">
                            <div className="w-8 h-8 bg-white/10 text-white rounded-xl flex items-center justify-center shadow-sm"><FiCalendar size={16} /></div>
                            Future Sprint
                        </h3>
                    </div>
                    <textarea 
                        value={future}
                        onChange={(e) => setFuture(e.target.value)}
                        placeholder="Write your future plan here..."
                        className="w-full h-[250px] bg-white/5 border border-white/10 rounded-xl p-6 text-[13px] font-bold text-violet-100 focus:ring-4 focus:ring-violet-500/10 transition-all resize-none placeholder-violet-300/10 leading-relaxed font-mono relative z-10 outline-none"
                    />
                    <div className="pt-2 flex items-center gap-3 text-[8px] font-black text-violet-400 uppercase tracking-[0.3em] relative z-10">
                        <FiArrowRight className="animate-pulse" /> BUILD SMALL • SHIP OFTEN • REPEAT
                    </div>
                </div>
            </div>

            {/* Persistence Reminder */}
            <div className="p-6 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-6 group transition-all">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl shrink-0 shadow-sm group-hover:rotate-12 transition-transform duration-500"><FiTrash2 /></div>
                <div>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Persistence Active</p>
                    <p className="text-[9px] text-slate-600 dark:text-slate-500 font-bold mt-1.5 uppercase tracking-tight leading-relaxed">Log data is stored in the local storage instance. No external telemetry.</p>
                </div>
            </div>

            {/* Logs History & Date Selection - Placed at the bottom */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 space-y-6">
                <div className="max-w-xl">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Logs History & Date Selection</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">Select other dates to log past learnings or review your journal archive.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Date Picker Card */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500">Choose Active Date</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                            />
                        </div>
                        <p className="text-[9px] text-violet-600 dark:text-violet-400 font-black uppercase tracking-tight">
                            Selected: {formatDisplayDate(selectedDate)}
                        </p>
                    </div>

                    {/* History/Saved List */}
                    <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500">Saved Logs Archive</label>
                        {savedDates.length === 0 ? (
                            <p className="text-xs font-bold text-slate-400 py-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl uppercase">No archived logs found.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                                {savedDates.map((dateStr) => {
                                    const isSelected = dateStr === selectedDate;
                                    const displayLearned = localStorage.getItem(`notes-learned-${dateStr}`) || localStorage.getItem('notes-learned') || 'Empty log';
                                    return (
                                        <button
                                            key={dateStr}
                                            onClick={() => setSelectedDate(dateStr)}
                                            className={`p-3 rounded-xl border text-left transition-all flex justify-between items-center group/item ${isSelected ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-violet-500 text-slate-900 dark:text-slate-300'}`}
                                        >
                                            <div className="min-w-0 flex-1 pr-2">
                                                <p className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                                    {new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                                <p className={`text-[9px] font-medium truncate mt-1 ${isSelected ? 'text-violet-200' : 'text-slate-500 dark:text-slate-400'}`}>
                                                    {displayLearned}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                    onClick={(e) => handleDeleteLog(dateStr, e)}
                                                    title="Delete this log"
                                                    className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'text-violet-200 hover:text-white hover:bg-violet-700' : 'text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                                >
                                                    <FiTrash2 size={12} />
                                                </button>
                                                <FiArrowRight size={14} className={`${isSelected ? 'text-white' : 'text-slate-400 group-hover/item:translate-x-1 transition-transform'}`} />
                                            </div>
                                        </button>
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
