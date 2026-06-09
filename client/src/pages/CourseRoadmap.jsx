import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/CourseData';
import { FiChevronLeft, FiCheckCircle, FiTool, FiArrowRight } from 'react-icons/fi';

const CourseRoadmap = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = courses.find(c => c.id === id);

    const [activeSubTrack, setActiveSubTrack] = useState(null);

    if (!course) return (
        <div className="text-center py-20 animate-in fade-in duration-500 px-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">Course not found</h2>
            <button onClick={() => navigate('/courses')} className="mt-8 px-8 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-sm btn-hover-scale">Back to Catalog</button>
        </div>
    );

    // Split View Selection
    if (course.subTracks && !activeSubTrack) {
        return (
            <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pb-20 min-w-0 overflow-x-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <button 
                    onClick={() => navigate('/courses')}
                    className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 uppercase tracking-widest transition-all mb-6 sm:mb-10 group"
                >
                    <FiChevronLeft className="group-hover:-translate-x-1 transition-transform shrink-0" />
                    Back to Catalog
                </button>

                <div className="text-center mb-10 sm:mb-20 px-1">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6 leading-tight uppercase break-words hyphens-auto">
                        {course.title}
                    </h1>
                    <p className="text-slate-700 dark:text-slate-400 text-sm sm:text-xl font-bold max-w-2xl mx-auto leading-relaxed px-1">
                        Systematic mastery requires focus. Choose your specialized trajectory to begin the curriculum.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 md:gap-10">
                    {course.subTracks.map(track => (
                        <div 
                            key={track.id}
                            onClick={() => setActiveSubTrack(track.id)}
                            className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 md:p-12 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden text-center border border-slate-100 dark:border-slate-800 max-md:aspect-square flex flex-col justify-center"
                        >
                            <div className="absolute top-0 right-0 p-6 sm:p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                <span className="text-[4rem] sm:text-[140px] leading-none grayscale group-hover:grayscale-0 transition-all">{track.icon}</span>
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center min-h-0">
                                <div className="w-14 h-14 sm:w-24 sm:h-24 bg-slate-50 dark:bg-slate-800 shadow-xl rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-3xl sm:text-5xl mb-4 sm:mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white dark:border-slate-700 shrink-0">
                                    {track.icon}
                                </div>
                                <h2 className="text-lg sm:text-4xl font-black text-slate-900 dark:text-white mb-2 sm:mb-6 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors uppercase tracking-tight leading-tight break-words w-full">
                                    {track.title}
                                </h2>
                                <p className="text-slate-700 dark:text-slate-400 leading-snug sm:leading-relaxed mb-4 sm:mb-10 text-xs sm:text-lg font-bold line-clamp-3 sm:line-clamp-none px-1">
                                    {track.description}
                                </p>
                                
                                <div className="w-full space-y-2 sm:space-y-4 pt-2 sm:pt-4 hidden sm:block">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400 dark:text-violet-500">Core Architecture</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {track.tools.map(tool => (
                                            <span key={tool} className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-slate-100 dark:bg-slate-950 rounded-xl sm:rounded-[1rem] text-[10px] sm:text-xs font-black text-slate-700 dark:text-slate-400 border border-slate-100 dark:border-slate-800 uppercase tracking-tight">{tool}</span>
                                        ))}
                                    </div>
                                </div>

                                <button type="button" className="mt-4 sm:mt-14 px-4 sm:px-10 py-3 sm:py-5 bg-red-600 text-white rounded-xl font-black text-[10px] sm:text-xs flex items-center gap-2 sm:gap-3 hover:bg-red-700 transition-all shadow-xl shadow-red-200 uppercase tracking-widest shrink-0">
                                    BEGIN <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Filter roadmap based on active sub-track if applicable
    const filteredRoadmap = activeSubTrack 
        ? course.roadmap.filter(item => !item.subTrackId || item.subTrackId === activeSubTrack)
        : course.roadmap;

    return (
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 pb-20 min-w-0 overflow-x-hidden animate-in fade-in slide-in-from-right-4 duration-1000">
            <button 
                onClick={() => activeSubTrack ? setActiveSubTrack(null) : navigate('/courses')}
                className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 uppercase tracking-widest transition-all mb-6 sm:mb-10 group"
            >
                <FiChevronLeft className="group-hover:-translate-x-1 transition-transform shrink-0" />
                {activeSubTrack ? `Switch ${course.title} Path` : 'Back to Catalog'}
            </button>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-12 md:p-16 border border-slate-100 dark:border-slate-800 mb-10 sm:mb-16 relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-5 blur-sm grayscale pointer-events-none">
                    <span className="text-[6rem] sm:text-[180px] leading-none">{course.icon}</span>
                </div>
                
                <div className="relative z-10 max-w-3xl min-w-0">
                    <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] bg-violet-600 text-white mb-4 sm:mb-8 border border-violet-400/50 shadow-lg shadow-violet-200/50 dark:shadow-none">
                        {activeSubTrack ? `${course.subTracks.find(t => t.id === activeSubTrack).title} MASTERCLASS` : 'PROFESSIONAL PATHWAY'}
                    </span>
                    <h1 className="text-2xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight uppercase break-words">
                        {activeSubTrack ? course.subTracks.find(t => t.id === activeSubTrack).title : `Mastering ${course.title}`}
                    </h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-4 sm:mt-8 text-sm sm:text-xl leading-relaxed font-bold">
                        Systematic technical roadmap engineered to bridge the gap between theoretical knowledge and professional production mastery.
                    </p>

                    <div className="mt-8 sm:mt-14 flex flex-wrap items-center gap-6 sm:gap-10">
                        <div className="space-y-2 sm:space-y-4">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-500 pl-1">Primary Stack</p>
                            <div className="flex -space-x-2 sm:-space-x-3 mt-2 sm:mt-3">
                                {course.tools.slice(0, 5).map((tool, i) => (
                                    <div key={i} className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-[1.2rem] bg-slate-50 dark:bg-slate-800 border-2 border-white dark:border-slate-700 flex items-center justify-center shadow-xl text-[10px] sm:text-xs font-black text-violet-600 dark:text-violet-400">
                                        {tool[0].toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-12 sm:h-16 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />
                        <div className="space-y-2 sm:space-y-4">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-500 pl-1">Progression</p>
                            <p className="text-2xl sm:text-4xl font-black text-violet-600 dark:text-violet-400 tracking-tight leading-none uppercase">{filteredRoadmap.length} Milestones</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="space-y-8 sm:space-y-12 relative">
                <div className="absolute left-8 top-10 bottom-10 w-1.5 bg-slate-100 dark:bg-slate-800 rounded-full hidden md:block opacity-50" />
                
                {filteredRoadmap.map((milestone, idx) => (
                    <div key={idx} className="relative md:pl-28 group">
                        <div className="absolute left-[29px] w-5 h-5 bg-white dark:bg-slate-900 border-4 border-violet-600 rounded-full z-10 mt-3 hidden md:block group-hover:scale-125 transition-all duration-500 shadow-xl shadow-violet-200" />
                        
                        <div className="bg-white dark:bg-slate-900 premium-shadow rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-700 border border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col lg:flex-row gap-6 sm:gap-12 items-start min-w-0">
                                <div className="p-4 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl sm:rounded-3xl font-black text-2xl sm:text-4xl shrink-0 shadow-lg flex items-center justify-center w-16 h-16 sm:w-28 sm:h-28">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <h3 className="text-xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight break-words">{milestone.step}</h3>
                                        <FiCheckCircle className="text-slate-100 dark:text-slate-800 w-8 h-8 sm:w-10 sm:h-10 shrink-0 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                                    </div>
                                    <div className="mt-6 sm:mt-10">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400 mb-4 sm:mb-6 flex items-center gap-3">
                                            <FiTool size={16} /> ARCHITECTURE & TOOLING
                                        </p>
                                        <div className="flex flex-wrap gap-2 sm:gap-3">
                                            {milestone.tools.map(tool => (
                                                <div key={tool} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-[1.2rem] text-xs sm:text-sm font-black text-slate-800 dark:text-slate-400">
                                                    <span className="w-2 h-2 rounded-full bg-violet-600 shrink-0" />
                                                    {tool.toUpperCase()}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const originalIdx = course.roadmap.findIndex(r => r.step === milestone.step);
                                        navigate(`/roadmap/${course.id}/${originalIdx}`);
                                    }}
                                    className="w-full lg:w-auto self-stretch lg:self-center px-6 sm:px-12 py-4 sm:py-5 bg-red-600 hover:bg-red-700 text-white rounded-xl sm:rounded-2xl font-black text-xs flex items-center justify-center gap-3 sm:gap-4 shadow-xl shadow-red-200 transition-all active:scale-95 shrink-0 uppercase tracking-widest"
                                >
                                    Start Workshop <FiArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseRoadmap;
