import { useState } from 'react';
import { courses } from '../data/CourseData';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';

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
        <div className="w-full min-h-[calc(100dvh-5rem)] max-md:min-h-[calc(100dvh-8.5rem)] flex flex-col pt-3 md:pt-4 pb-3 md:pb-4 min-w-0 overflow-x-hidden">
            <PageHeader
                title="Mastery Tracks"
                description="Systematic learning paths engineered for rapid technical progression."
                actions={(
                    <div className="flex flex-nowrap sm:flex-wrap gap-1.5 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto max-w-full [-webkit-overflow-scrolling:touch] scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setCategory(cat)}
                                className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-black transition-all active:scale-95 border ${
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

            <div className="grid flex-1 grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3 md:gap-4 w-full min-h-0 content-start">
                {filteredCourses.map(course => (
                    <div
                        key={course.id}
                        className="bg-white group rounded-xl p-3 sm:p-4 md:p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col min-h-0 relative overflow-hidden border border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 shadow-sm"
                        onClick={() => navigate(`/roadmap/${course.id}`)}
                    >
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-violet-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 blur-2xl pointer-events-none" />

                        <div className="mb-2 sm:mb-3 relative z-10 shrink-0">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-lg sm:text-xl group-hover:scale-110 group-hover:border-violet-300 transition-all duration-300">
                                {course.icon}
                            </div>
                        </div>

                        <div className="relative z-10 flex-1 flex flex-col min-h-0 min-w-0">
                            <span className="inline-flex w-fit max-w-full items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wide sm:tracking-[0.15em] bg-violet-50 text-violet-600 mb-1.5 sm:mb-2 border border-violet-100 truncate">
                                {course.category}
                            </span>
                            <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-900 group-hover:text-violet-600 transition-colors leading-snug break-words line-clamp-2">
                                {course.title}
                            </h3>
                            <p className="hidden sm:block text-slate-500 mt-1.5 text-xs font-semibold leading-relaxed line-clamp-2">
                                {course.description}
                            </p>

                            <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5 min-w-0">
                                {course.tools.slice(0, 2).map(tool => (
                                    <span
                                        key={tool}
                                        className="max-w-full truncate px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-50 text-slate-600 rounded-md text-[9px] sm:text-[10px] font-bold border border-slate-200 capitalize"
                                    >
                                        {tool}
                                    </span>
                                ))}
                                {course.tools.length > 2 && (
                                    <span className="shrink-0 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-violet-50 text-violet-600 rounded-md text-[9px] sm:text-[10px] font-black border border-violet-100">
                                        +{course.tools.length - 2}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-2 relative z-10 shrink-0 min-w-0">
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs sm:text-sm font-black text-slate-900 leading-none tabular-nums">
                                    {course.roadmap.length}
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-black text-violet-500 uppercase tracking-wider mt-0.5">
                                    Chapters
                                </span>
                            </div>
                            <button
                                type="button"
                                className="shrink-0 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-red-600 text-white rounded-md font-black text-[9px] sm:text-[10px] hover:bg-red-700 transition-all shadow-md shadow-red-500/20 flex items-center gap-0.5 sm:gap-1"
                            >
                                BEGIN <FiChevronRight size={11} className="sm:w-3 sm:h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
