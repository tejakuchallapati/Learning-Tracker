import { useState } from 'react';
import { courses } from '../data/CourseData';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageHeader, { PAGE_SHELL_WIDE } from '../components/layout/PageHeader';

const TrackCard = ({ course, onOpen, compact = false }) => (
    <article
        role="button"
        tabIndex={0}
        onClick={() => onOpen(course.id)}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen(course.id);
            }
        }}
        className={`group relative flex flex-col cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.99] ${
            compact ? 'w-[88%] p-4 gap-3' : 'h-full min-h-[12.5rem] p-4 lg:p-5'
        }`}
    >
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/5 blur-2xl transition-transform duration-700 group-hover:scale-150" />

        <div className="relative z-10 flex flex-col gap-3 flex-1 min-h-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl shadow-sm transition-all group-hover:scale-105 group-hover:border-violet-200">
                {course.icon}
            </div>

            <div className="min-w-0 space-y-1.5">
                <span className="inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-violet-600">
                    {course.category}
                </span>
                <h3 className="text-sm font-black leading-tight text-slate-900 transition-colors group-hover:text-violet-600 break-words line-clamp-2 lg:text-[0.95rem]">
                    {course.title}
                </h3>
            </div>

            <p className={`relative z-10 text-xs font-medium leading-relaxed text-slate-500 line-clamp-2 ${compact ? 'text-center px-1' : 'flex-1'}`}>
                {course.description}
            </p>

            <div className={`relative z-10 flex flex-wrap gap-1.5 ${compact ? 'justify-center' : ''}`}>
                {course.tools.slice(0, 3).map((tool) => (
                    <span
                        key={tool}
                        className="max-w-[6rem] truncate rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-bold capitalize text-slate-600"
                    >
                        {tool}
                    </span>
                ))}
                {course.tools.length > 3 && (
                    <span className="shrink-0 rounded-md border border-violet-100 bg-violet-50 px-2 py-0.5 text-[9px] font-black text-violet-600">
                        +{course.tools.length - 3}
                    </span>
                )}
            </div>
        </div>

        <div className="relative z-10 mt-3 flex shrink-0 items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <div className="flex items-baseline gap-1">
                <span className="text-base font-black tabular-nums leading-none text-slate-900">
                    {course.roadmap.length}
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider text-violet-500">
                    Chapters
                </span>
            </div>
            <span className="inline-flex items-center gap-0.5 rounded-lg bg-red-600 px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-white shadow-md shadow-red-500/25 transition-colors group-hover:bg-red-700">
                Begin <FiChevronRight size={11} />
            </span>
        </div>
    </article>
);

const CourseCatalog = () => {
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', ...new Set(courses.map((c) => c.category))];

    const filteredCourses = courses.filter((c) => category === 'All' || c.category === category);

    const desktopRows = Math.max(1, Math.ceil(filteredCourses.length / 4));

    const categoryFilters = (
        <div className="flex max-w-full flex-nowrap gap-1.5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-1.5 [-webkit-overflow-scrolling:touch] scrollbar-none sm:flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 rounded-lg border px-3 py-1.5 text-[10px] font-black transition-all active:scale-95 sm:text-xs ${
                        category === cat
                            ? 'border-sky-500 bg-sky-600 text-white shadow-md shadow-sky-500/20'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-sky-300 hover:text-sky-600'
                    }`}
                >
                    {cat.toUpperCase()}
                </button>
            ))}
        </div>
    );

    const openCourse = (courseId) => navigate(`/roadmap/${courseId}`);

    return (
        <div className={`${PAGE_SHELL_WIDE} flex flex-col`}>
            <PageHeader
                title="Mastery Tracks"
                description="Systematic learning paths engineered for rapid technical progression."
                actions={categoryFilters}
            />

            {/* Mobile — stacked cards */}
            <div className="flex flex-col items-center gap-4 py-2 md:hidden">
                {filteredCourses.map((course) => (
                    <TrackCard key={course.id} course={course} onOpen={openCourse} compact />
                ))}
            </div>

            {/* Desktop — 4×2 structured grid */}
            <div
                className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-4 pb-2"
                style={{
                    gridTemplateRows: `repeat(${desktopRows}, minmax(12.5rem, auto))`,
                }}
            >
                {filteredCourses.map((course) => (
                    <TrackCard key={course.id} course={course} onOpen={openCourse} />
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
