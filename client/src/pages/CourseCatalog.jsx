import { useState } from 'react';
import { courses } from '../data/CourseData';
import { FiChevronRight, FiSearch, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CourseCatalog = () => {
    const [search] = useState('');
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', ...new Set(courses.map(c => c.category))];

    const filteredCourses = courses.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                             c.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || c.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Mastery Tracks</h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-4 text-xl font-medium leading-relaxed">Systematic learning paths engineered for rapid technical progression.</p>
                </div>
                
                <div className="flex flex-wrap gap-3 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-6 py-3 rounded-xl text-xs font-black transition-all transform active:scale-95 ${
                                category === cat 
                                ? 'bg-violet-600 text-white shadow-xl shadow-violet-200 dark:shadow-none' 
                                : 'bg-transparent text-slate-600 hover:text-slate-800 dark:hover:text-slate-300'
                            }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredCourses.map(course => (
                    <div 
                        key={course.id}
                        className="bg-white dark:bg-slate-900 premium-shadow group rounded-3xl p-10 hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden border border-slate-100 dark:border-slate-800"
                        onClick={() => navigate(`/roadmap/${course.id}`)}
                    >
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-violet-50/30 dark:bg-violet-500/10 rounded-full group-hover:scale-125 transition-transform duration-1000 blur-2xl"></div>
                        
                        <div className="mb-8 relative z-10">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-xl shadow-xl flex items-center justify-center text-5xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 border border-slate-50 dark:border-slate-700">
                                {course.icon}
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex-1">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-6 border border-violet-100/50 dark:border-violet-500/20">
                                {course.category}
                            </span>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-tight">{course.title}</h3>
                            <p className="text-slate-700 dark:text-slate-400 mt-4 text-base font-bold leading-relaxed line-clamp-2">{course.description}</p>
                            
                            <div className="mt-8 flex flex-wrap gap-2">
                                {course.tools.slice(0, 3).map(tool => (
                                    <span key={tool} className="px-4 py-2 bg-slate-50/80 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-xl text-xs font-black border border-slate-100/50 dark:border-slate-700 capitalize">{tool}</span>
                                ))}
                                {course.tools.length > 3 && (
                                    <span className="px-4 py-2 bg-slate-50/80 dark:bg-slate-800 text-slate-300 dark:text-slate-600 rounded-xl text-xs font-black border border-slate-100/50 dark:border-slate-700">+{course.tools.length - 3}</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between relative z-10">
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-slate-900 dark:text-white">{course.roadmap.length}</span>
                                <span className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest">Chapters</span>
                            </div>
                            <button className="px-8 py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-black text-xs hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 dark:shadow-none flex items-center gap-2 group-hover:translate-x-1">
                                BEGIN PATH <FiChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
