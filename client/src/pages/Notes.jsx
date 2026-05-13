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
                        <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-500 rounded-xl text-[8px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700">{new Date().toLocaleDateString()}</span>
                    </div>
                    <textarea 
                        value={learned}
                        onChange={(e) => setLearned(e.target.value)}
                        placeholder="Mastered Flexbox centering, implemented async/await logic in the API service..."
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
                        placeholder="1. Start React Hooks module&#10;2. Refactor Navbar component&#10;3. Practice CSS Grid layouts"
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
        </div>
    );
};

export default Notes;
