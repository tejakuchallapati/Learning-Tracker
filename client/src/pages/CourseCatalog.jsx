import { useState } from 'react';
import { courses } from '../data/CourseData';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CourseCatalog = () => {
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', ...new Set(courses.map(c => c.category))];

    const filteredCourses = courses.filter((c) => {
        return category === 'All' || c.category === category;
    });

    const desktopRows = Math.max(1, Math.ceil(filteredCourses.length / 4));

    const categoryFilters = (
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
    );

    const openCourse = (courseId) => navigate(`/roadmap/${courseId}`);

    return (
        <div className="w-full min-w-0 flex flex-col pt-3 md:pt-4 pb-4">
            <header className="shrink-0 flex flex-col lg:flex-row lg:items-end justify-between gap-2 md:gap-3 pb-2 md:pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        Mastery Tracks
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-[11px] sm:text-xs font-medium leading-snug line-clamp-1 md:line-clamp-2 max-w-xl">
                        Systematic learning paths engineered for rapid technical progression.
                    </p>
                </div>
                <div className="shrink-0 w-full lg:w-auto">{categoryFilters}</div>
            </header>

            {/* Mobile — one card per row (like landing About us) */}
            <div className="md:hidden flex flex-col items-center gap-4 py-4 px-1">
                {filteredCourses.map((course) => (
                    <article
                        key={course.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => openCourse(course.id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openCourse(course.id);
                            }
                        }}
                        className="w-[88%] rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col gap-3 cursor-pointer active:scale-[0.99] transition-transform"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 shrink-0 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-xl">
                                {course.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide bg-violet-50 text-violet-600 border border-violet-100">
                                    {course.category}
                                </span>
                                <h3 className="text-sm font-black text-slate-900 leading-tight break-words mt-1">
                                    {course.title}
                                </h3>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 font-medium leading-relaxed text-center px-1">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-1.5">
                            {course.tools.slice(0, 3).map((tool) => (
                                <span
                                    key={tool}
                                    className="px-2 py-0.5 bg-slate-50 text-slate-600 rounded-md text-[9px] font-bold border border-slate-200 capitalize"
                                >
                                    {tool}
                                </span>
                            ))}
                            {course.tools.length > 3 && (
                                <span className="px-2 py-0.5 bg-violet-50 text-violet-600 rounded-md text-[9px] font-black border border-violet-100">
                                    +{course.tools.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                            <div>
                                <span className="text-sm font-black text-slate-900 tabular-nums leading-none">
                                    {course.roadmap.length}
                                </span>
                                <span className="text-[9px] font-black text-violet-500 uppercase tracking-wider ml-1">
                                    Chapters
                                </span>
                            </div>
                            <span className="text-[10px] font-black text-red-600 flex items-center gap-0.5">
                                BEGIN <FiChevronRight size={12} />
                            </span>
                        </div>
                    </article>
                ))}
            </div>

            {/* Desktop — 4 columns, rows stretch to fill viewport */}
            <div
                className="hidden md:grid grid-cols-4 gap-3 pt-3 min-h-[calc(100dvh-11rem)]"
                style={{ gridTemplateRows: `repeat(${desktopRows}, minmax(0, 1fr))` }}
            >
                {filteredCourses.map((course) => (
                    <article
                        key={course.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => openCourse(course.id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openCourse(course.id);
                            }
                        }}
                        className="group h-full min-h-[10rem] bg-white rounded-xl p-3 lg:p-4 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden border border-slate-200 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 shadow-sm"
                    >
                        <div className="absolute -top-8 -right-8 w-20 h-20 bg-violet-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 blur-2xl pointer-events-none" />

                        <div className="relative z-10 flex items-start gap-2.5 shrink-0 mb-2">
                            <div className="w-9 h-9 lg:w-10 lg:h-10 shrink-0 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-lg group-hover:scale-105 group-hover:border-violet-300 transition-all">
                                {course.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-wide bg-violet-50 text-violet-600 border border-violet-100">
                                    {course.category}
                                </span>
                                <h3 className="text-xs lg:text-sm font-black text-slate-900 group-hover:text-violet-600 transition-colors leading-tight break-words line-clamp-2 mt-0.5">
                                    {course.title}
                                </h3>
                            </div>
                        </div>

                        <p className="relative z-10 text-[10px] lg:text-xs text-slate-500 font-semibold leading-snug line-clamp-2 flex-1 min-h-0">
                            {course.description}
                        </p>

                        <div className="relative z-10 mt-2 flex flex-wrap gap-1 shrink-0">
                            {course.tools.slice(0, 3).map((tool) => (
                                <span
                                    key={tool}
                                    className="truncate max-w-[5.5rem] px-1.5 py-0.5 bg-slate-50 text-slate-600 rounded text-[8px] lg:text-[9px] font-bold border border-slate-200 capitalize"
                                >
                                    {tool}
                                </span>
                            ))}
                            {course.tools.length > 3 && (
                                <span className="shrink-0 px-1.5 py-0.5 bg-violet-50 text-violet-600 rounded text-[8px] lg:text-[9px] font-black border border-violet-100">
                                    +{course.tools.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="relative z-10 mt-auto pt-2 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-black text-slate-900 tabular-nums leading-none">
                                    {course.roadmap.length}
                                </span>
                                <span className="text-[8px] lg:text-[9px] font-black text-violet-500 uppercase tracking-wider">
                                    Chapters
                                </span>
                            </div>
                            <button
                                type="button"
                                className="shrink-0 px-2.5 py-1.5 bg-red-600 text-white rounded-md font-black text-[8px] lg:text-[9px] hover:bg-red-700 transition-all shadow-md shadow-red-500/20 flex items-center gap-0.5"
                            >
                                BEGIN <FiChevronRight size={10} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
