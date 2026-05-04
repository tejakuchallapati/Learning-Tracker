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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white min-h-screen p-8 rounded-3xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-black">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-black text-black tracking-tight leading-tight">Mastery Tracks</h1>
                    <p className="text-gray-800 mt-2 text-lg font-bold leading-relaxed">Systematic learning paths engineered for rapid technical progression.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border-2 border-black">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all transform active:scale-95 border-2 ${
                                category === cat 
                                ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30' 
                                : 'bg-white text-black border-transparent hover:border-black'
                            }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <div 
                        key={course.id}
                        className="bg-black group rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden border-2 border-transparent hover:border-red-600 shadow-lg"
                        onClick={() => navigate(`/roadmap/${course.id}`)}
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full group-hover:scale-150 transition-transform duration-700 blur-2xl"></div>
                        
                        <div className="mb-6 relative z-10">
                            <div className="w-14 h-14 bg-red-600 rounded-xl shadow-lg flex items-center justify-center text-3xl text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                                {course.icon}
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex-1">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-red-950 text-red-500 mb-4 border border-red-900">
                                {course.category}
                            </span>
                            <h3 className="text-xl font-black text-white group-hover:text-red-500 transition-colors leading-tight">{course.title}</h3>
                            <p className="text-gray-400 mt-2 text-sm font-semibold leading-relaxed line-clamp-2">{course.description}</p>
                            
                            <div className="mt-5 flex flex-wrap gap-2">
                                {course.tools.slice(0, 3).map(tool => (
                                    <span key={tool} className="px-3 py-1.5 bg-zinc-900 text-red-100 rounded-lg text-[10px] font-black border border-red-900/50 capitalize">{tool}</span>
                                ))}
                                {course.tools.length > 3 && (
                                    <span className="px-3 py-1.5 bg-zinc-900 text-red-400 rounded-lg text-[10px] font-black border border-red-900/50">+{course.tools.length - 3}</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-red-900/30 flex items-center justify-between relative z-10">
                            <div className="flex flex-col">
                                <span className="text-base font-black text-white">{course.roadmap.length}</span>
                                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Chapters</span>
                            </div>
                            <button className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-black text-xs hover:bg-red-700 transition-all shadow-md shadow-red-600/20 flex items-center gap-2 group-hover:translate-x-1">
                                BEGIN PATH <FiChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
