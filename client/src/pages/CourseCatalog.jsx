import { useState } from 'react';
import { courses } from '../data/CourseData';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageHeader, { PAGE_SHELL } from '../components/layout/PageHeader';

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
        <div className={PAGE_SHELL}>
            <PageHeader
                title="Mastery Tracks"
                description="Systematic learning paths engineered for rapid technical progression."
                actions={(
                    <div className="flex flex-wrap gap-1.5 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-1.5 rounded-md text-xs font-black transition-all active:scale-95 border ${
                                    category === cat
                                        ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-500/20'
                                        : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-sky-400 hover:text-sky-600'
                                }`}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredCourses.map(course => (
                    <div
                        key={course.id}
                        className="bg-white group rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden border border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 shadow-sm"
                        onClick={() => navigate(`/roadmap/${course.id}`)}
                    >
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-violet-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 blur-2xl"></div>

                        <div className="mb-4 relative z-10">
                            <div className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-md flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-6 group-hover:border-violet-300 transition-all duration-300">
                                {course.icon}
                            </div>
                        </div>

                        <div className="relative z-10 flex-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-violet-50 text-violet-600 mb-3 border border-violet-100">
                                {course.category}
                            </span>
                            <h3 className="text-lg font-black text-slate-900 group-hover:text-violet-600 transition-colors leading-tight">{course.title}</h3>
                            <p className="text-slate-500 mt-1.5 text-xs font-semibold leading-relaxed line-clamp-2">{course.description}</p>

                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {course.tools.slice(0, 3).map(tool => (
                                    <span key={tool} className="px-2 py-1 bg-slate-50 text-slate-600 rounded-md text-xs font-black border border-slate-200 capitalize">{tool}</span>
                                ))}
                                {course.tools.length > 3 && (
                                    <span className="px-2 py-1 bg-violet-50 text-violet-600 rounded-md text-xs font-black border border-violet-100">+{course.tools.length - 3}</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-900">{course.roadmap.length}</span>
                                <span className="text-xs font-black text-violet-500 uppercase tracking-widest">Chapters</span>
                            </div>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md font-black text-xs hover:bg-red-700 transition-all shadow-md shadow-red-500/20 flex items-center gap-1.5 group-hover:translate-x-1">
                                BEGIN <FiChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
