import { useState } from 'react';
import { courses } from '../data/CourseData';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageHeader, { PAGE_SHELL_FULL } from '../components/layout/PageHeader';

const countTopics = (roadmap = []) =>
    roadmap.reduce((sum, chapter) => sum + (chapter.topics?.length ?? 0), 0);

const TrackCard = ({ course, onOpen, compact = false }) => {
    const chapterCount = course.roadmap?.length ?? 0;
    const topicCount = countTopics(course.roadmap);
    const visibleTools = compact ? 4 : 4;

    return (
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
            className={`group relative flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.99] ${
                compact ? 'min-h-[15rem] rounded-2xl p-5 gap-4' : 'p-3.5 lg:p-4'
            }`}
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/5 blur-2xl transition-transform duration-700 group-hover:scale-150" />

            <div className={`relative z-10 flex min-h-0 flex-1 flex-col ${compact ? 'gap-4' : 'gap-2'}`}>
                <div className="flex items-start justify-between gap-2">
                    <div className={`flex shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-all group-hover:scale-105 group-hover:border-violet-200 ${
                        compact ? 'h-12 w-12 text-2xl rounded-xl' : 'h-9 w-9 text-lg'
                    }`}>
                        {course.icon}
                    </div>
                    <span className="inline-flex shrink-0 items-center rounded-full border border-violet-100 bg-violet-50 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-violet-600">
                        {course.category}
                    </span>
                </div>

                <div className="min-w-0 space-y-1">
                    <h3 className={`font-black leading-snug text-slate-900 transition-colors group-hover:text-violet-600 break-words line-clamp-2 ${
                        compact ? 'text-base lg:text-[1.05rem]' : 'text-sm'
                    }`}>
                        {course.title}
                    </h3>
                    <p className={`font-medium text-slate-500 line-clamp-2 ${compact ? 'text-xs sm:text-sm leading-relaxed' : 'text-xs leading-snug'}`}>
                        {course.description}
                    </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-1 pt-0.5">
                    {course.tools.slice(0, visibleTools).map((tool) => (
                        <span
                            key={tool}
                            className="max-w-[6rem] truncate rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-bold capitalize text-slate-600"
                        >
                            {tool}
                        </span>
                    ))}
                    {course.tools.length > visibleTools && (
                        <span className="shrink-0 rounded border border-violet-100 bg-violet-50 px-2 py-0.5 text-[9px] font-black text-violet-600">
                            +{course.tools.length - visibleTools}
                        </span>
                    )}
                </div>
            </div>

            <div className={`relative z-10 flex shrink-0 items-center justify-between gap-2 border-t border-slate-100 ${compact ? 'mt-4 pt-4' : 'mt-2 pt-2.5'}`}>
                <div className="min-w-0">
                    <div className="flex items-baseline gap-1">
                        <span className={`font-black tabular-nums leading-none text-slate-900 ${compact ? 'text-lg' : 'text-base'}`}>
                            {chapterCount}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-wider text-violet-500">
                            Chapters
                        </span>
                    </div>
                    {topicCount > 0 && (
                        <p className="mt-0.5 text-[9px] font-bold text-slate-400 truncate">
                            {topicCount} topics · {course.tools.length} tools
                        </p>
                    )}
                </div>
                <span className={`inline-flex shrink-0 items-center gap-0.5 rounded-lg bg-red-600 font-black uppercase tracking-wide text-white shadow-md shadow-red-500/25 transition-colors group-hover:bg-red-700 ${
                    compact ? 'px-3.5 py-2 text-[10px]' : 'px-2.5 py-1.5 text-[9px]'
                }`}>
                    Begin <FiChevronRight size={compact ? 12 : 10} />
                </span>
            </div>
        </article>
    );
};

const CourseCatalog = () => {
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', ...new Set(courses.map((c) => c.category))];

    const filteredCourses = courses.filter((c) => category === 'All' || c.category === category);

    const categoryFilters = (
        <div className="flex max-w-full flex-nowrap gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-1 [-webkit-overflow-scrolling:touch] scrollbar-none sm:flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 rounded-md border px-2.5 py-1 text-[10px] font-black transition-all active:scale-95 sm:text-xs ${
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
        <div className={`${PAGE_SHELL_FULL} flex flex-col gap-2 md:gap-2.5`}>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5 space-y-1.5">
                <PageHeader
                    dense
                    embedded
                    title="Mastery Tracks"
                    description="Systematic learning paths engineered for rapid technical progression."
                />
                <div className="w-full min-w-0 pb-0.5">
                    {categoryFilters}
                </div>
            </div>

            {/* Mobile — stacked cards */}
            <div className="flex w-full min-w-0 flex-col gap-5 md:hidden">
                {filteredCourses.map((course) => (
                    <TrackCard key={course.id} course={course} onOpen={openCourse} compact />
                ))}
            </div>

            {/* Desktop — full-width grid, equal margins from sidebar & screen edge */}
            <div className="hidden w-full min-w-0 md:grid md:grid-cols-2 md:gap-3.5 lg:gap-4 xl:grid-cols-4 xl:gap-4 pb-1">
                {filteredCourses.map((course) => (
                    <TrackCard key={course.id} course={course} onOpen={openCourse} />
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
