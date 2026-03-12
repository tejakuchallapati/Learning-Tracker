import { useState } from 'react';
import { FiBookmark, FiPlus, FiTrash2, FiExternalLink, FiLink, FiTag } from 'react-icons/fi';

const categoryColors = {
    'Documentation': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    'Tutorial':      { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
    'YouTube':       { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
    'Tool':          { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    'Article':       { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    'Other':         { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
};

const defaultBookmarks = [
    { id: 1, title: 'React Official Docs',      url: 'https://react.dev',           category: 'Documentation', topic: 'React' },
    { id: 2, title: 'JavaScript.info',          url: 'https://javascript.info',     category: 'Tutorial',      topic: 'JavaScript' },
    { id: 3, title: 'Fireship YouTube',         url: 'https://youtube.com/@Fireship', category: 'YouTube',    topic: 'General' },
    { id: 4, title: 'CSS Tricks',               url: 'https://css-tricks.com',      category: 'Article',       topic: 'CSS' },
    { id: 5, title: 'Vite.js Build Tool',       url: 'https://vitejs.dev',          category: 'Tool',          topic: 'Tooling' },
];

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState(defaultBookmarks);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', url: '', category: 'Other', topic: '' });
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Documentation', 'Tutorial', 'YouTube', 'Tool', 'Article', 'Other'];

    const addBookmark = () => {
        if (!form.title.trim() || !form.url.trim()) return;
        setBookmarks(prev => [...prev, { ...form, id: Date.now() }]);
        setForm({ title: '', url: '', category: 'Other', topic: '' });
        setShowForm(false);
    };

    const removeBookmark = (id) => {
        setBookmarks(prev => prev.filter(b => b.id !== id));
    };

    const filtered = filter === 'All' ? bookmarks : bookmarks.filter(b => b.category === filter);

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-slate-100">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Resource Library</h1>
                    <p className="text-slate-500 mt-4 text-xl font-medium leading-relaxed">Your personal knowledge base. Save links, tools, and references.</p>
                </div>
                <button
                    onClick={() => setShowForm(v => !v)}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-[2rem] font-black text-sm hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 btn-hover-scale shrink-0"
                >
                    <FiPlus size={18} /> Add Resource
                </button>
            </div>

            {/* Add Form */}
            {showForm && (
                <div className="glass-card premium-shadow p-10 rounded-[3rem] border border-white/50 space-y-6 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-3"><FiLink className="text-indigo-600" /> New Resource</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</label>
                            <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. React Docs" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL</label>
                            <input value={form.url} onChange={e => setForm(p => ({...p, url: e.target.value}))} placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                            <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none cursor-pointer">
                                {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic / Tag</label>
                            <input value={form.topic} onChange={e => setForm(p => ({...p, topic: e.target.value}))} placeholder="e.g. React, JavaScript" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
                        </div>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <button onClick={addBookmark} className="px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm hover:bg-indigo-700 transition-all">Save Resource</button>
                        <button onClick={() => setShowForm(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black text-sm hover:bg-slate-200 transition-all">Cancel</button>
                    </div>
                </div>
            )}

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-3">
                {categories.map(c => (
                    <button key={c} onClick={() => setFilter(c)} className={`px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all border ${filter === c ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-indigo-200 hover:text-indigo-600'}`}>
                        {c} {c !== 'All' && `(${bookmarks.filter(b => b.category === c).length})`}
                    </button>
                ))}
            </div>

            {/* Bookmarks Grid */}
            {filtered.length === 0 ? (
                <div className="p-20 text-center glass-card rounded-[4rem] border-2 border-dashed border-slate-200">
                    <div className="text-6xl mb-4">📌</div>
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em]">No resources yet</p>
                    <button onClick={() => setShowForm(true)} className="mt-6 text-indigo-600 font-black hover:underline text-sm">Add your first resource</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map(b => {
                        const color = categoryColors[b.category] || categoryColors['Other'];
                        return (
                            <div key={b.id} className="glass-card premium-shadow p-8 rounded-[3rem] border border-white/50 group hover:-translate-y-1 transition-all relative">
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                        <FiBookmark size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${color.bg} ${color.text} ${color.border}`}>{b.category}</span>
                                            {b.topic && (
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 border border-slate-100">
                                                    <FiTag size={9} /> {b.topic}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{b.title}</h3>
                                        <p className="text-[11px] text-slate-400 font-bold mt-1 truncate">{b.url}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-50">
                                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all">
                                        <FiExternalLink size={12} /> Open
                                    </a>
                                    <button onClick={() => removeBookmark(b.id)} className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100 hover:bg-rose-500 hover:text-white transition-all ml-auto">
                                        <FiTrash2 size={12} /> Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="glass-card premium-shadow p-8 rounded-[3rem] border border-white/50 flex items-center justify-between">
                <div>
                    <p className="font-black text-slate-900">{bookmarks.length} resources saved</p>
                    <p className="text-sm text-slate-400 font-medium mt-1">Your personal knowledge vault grows with every bookmark.</p>
                </div>
                <div className="text-5xl">🗂️</div>
            </div>
        </div>
    );
};

export default Bookmarks;
