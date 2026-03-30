import { useState } from 'react';
import { FiEdit, FiSave, FiTrash2, FiCalendar, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const Notes = () => {
    const [learned, setLearned] = useState(() => localStorage.getItem('notes-learned') || '');
    const [future, setFuture] = useState(() => localStorage.getItem('notes-future') || '');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        localStorage.setItem('notes-learned', learned);
        localStorage.setItem('notes-future', future);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Engineering Logs</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-xl font-medium leading-relaxed">Persistent documentation of your daily technical growth.</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="px-10 py-5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 btn-hover-scale"
                >
                    <FiSave size={18} /> SYNC ALL LOGS {saved && <FiCheckCircle className="animate-in zoom-in duration-300" />}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Column 1: Today's Learnings */}
                <div className="glass-card premium-shadow p-12 rounded-3xl border border-white/50 dark:border-slate-800 space-y-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-4 uppercase tracking-[0.2em]">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-sm"><FiEdit size={20} /></div>
                            Daily Manifest
                        </h3>
                        <span className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest border border-slate-100/50 dark:border-slate-700">{new Date().toLocaleDateString()}</span>
                    </div>
                    <textarea 
                        value={learned}
                        onChange={(e) => setLearned(e.target.value)}
                        placeholder="Mastered Flexbox centering, implemented async/await logic in the API service..."
                        className="w-full h-[500px] bg-slate-50/50 dark:bg-slate-800/50 border-none rounded-2xl p-10 text-sm font-bold text-slate-700 dark:text-slate-300 focus:ring-4 focus:ring-indigo-50 transition-all resize-none placeholder-slate-300 dark:placeholder-slate-600 leading-relaxed font-mono"
                    />
                </div>

                {/* Column 2: Tomorrow's Agenda */}
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 shadow-3xl space-y-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                        <h3 className="text-xs font-black flex items-center gap-4 uppercase tracking-[0.2em]">
                            <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center shadow-sm"><FiCalendar size={20} /></div>
                            Future Sprint
                        </h3>
                    </div>
                    <textarea 
                        value={future}
                        onChange={(e) => setFuture(e.target.value)}
                        placeholder="1. Start React Hooks module&#10;2. Refactor Navbar component&#10;3. Practice CSS Grid layouts"
                        className="w-full h-[500px] bg-white/5 border border-white/10 rounded-2xl p-10 text-sm font-bold text-indigo-100 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none placeholder-indigo-300/10 leading-relaxed font-mono relative z-10"
                    />
                    <div className="pt-4 flex items-center gap-5 text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] relative z-10">
                        <FiArrowRight className="animate-pulse" /> BUILD SMALL • SHIP OFTEN • REPEAT
                    </div>
                </div>
            </div>

            {/* Persistence Reminder */}
            <div className="p-10 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl shrink-0 shadow-sm group-hover:rotate-12 transition-transform duration-500"><FiTrash2 /></div>
                <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Client-Side Persistence Active</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-2 uppercase tracking-tight leading-relaxed">Log data is stored in the local storage instance of this browser. No external telemetry is active.</p>
                </div>
            </div>
        </div>
    );
};

export default Notes;
