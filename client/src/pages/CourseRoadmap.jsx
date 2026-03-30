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
        <div className="text-center py-20 animate-in fade-in duration-500">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white">Course not found</h2>
            <button onClick={() => navigate('/courses')} className="mt-8 px-8 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-sm btn-hover-scale">Back to Catalog</button>
        </div>
    );

    // Split View Selection
    if (course.subTracks && !activeSubTrack) {
        return (
            <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <button 
                    onClick={() => navigate('/courses')}
                    className="flex items-center gap-3 text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-all mb-10 group"
                >
                    <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                </button>

                <div className="text-center mb-20">
                    <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">{course.title}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Systematic mastery requires focus. Choose your specialized trajectory to begin the curriculum.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {course.subTracks.map(track => (
                        <div 
                            key={track.id}
                            onClick={() => setActiveSubTrack(track.id)}
                            className="glass-card premium-shadow rounded-3xl p-12 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden text-center border border-white/50 dark:border-slate-800"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="text-[140px] leading-none">{track.icon}</span>
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-24 h-24 bg-white dark:bg-slate-700 shadow-xl rounded-2xl flex items-center justify-center text-5xl mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-slate-50 dark:border-slate-600">
                                    {track.icon}
                                </div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{track.title}</h2>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 text-lg font-medium">{track.description}</p>
                                
                                <div className="w-full space-y-4 pt-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Core Architecture</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {track.tools.map(tool => (
                                            <span key={tool} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-700 rounded-[1rem] text-xs font-black text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-600 uppercase tracking-tight">{tool}</span>
                                        ))}
                                    </div>
                                </div>

                                <button className="mt-14 px-10 py-5 bg-slate-900 text-white rounded-xl font-black text-xs flex items-center gap-3 group-hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                                    BUILD CURRICULUM <FiArrowRight />
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
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-right-4 duration-1000">
            <button 
                onClick={() => activeSubTrack ? setActiveSubTrack(null) : navigate('/courses')}
                className="flex items-center gap-3 text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-all mb-10 group"
            >
                <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                {activeSubTrack ? `Switch ${course.title} Path` : 'Back to Catalog'}
            </button>

            {/* Hero Section */}
            <div className="glass-card premium-shadow rounded-3xl p-12 md:p-16 border border-white/50 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 blur-sm">
                    <span className="text-[180px] leading-none">{course.icon}</span>
                </div>
                
                <div className="relative z-10 max-w-3xl">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-600 text-white mb-8 border border-indigo-400/50">
                        {activeSubTrack ? `${course.subTracks.find(t => t.id === activeSubTrack).title} MASTERCLASS` : 'PROFESSIONAL PATHWAY'}
                    </span>
                    <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1]">
                        {activeSubTrack ? course.subTracks.find(t => t.id === activeSubTrack).title : `Mastering ${course.title}`}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-8 text-xl leading-relaxed font-medium">
                        Systematic technical roadmap engineered to bridge the gap between theoretical knowledge and professional production mastery.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center gap-10">
                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Primary Stack</p>
                            <div className="flex -space-x-4 mt-3">
                                {course.tools.slice(0, 5).map((tool, i) => (
                                    <div key={i} className="w-12 h-12 rounded-[1.2rem] bg-white dark:bg-slate-800 border-2 border-indigo-50 dark:border-indigo-900/50 flex items-center justify-center shadow-xl text-[10px] font-black text-indigo-600 dark:text-indigo-400 transform hover:-translate-y-1 transition-transform cursor-default">
                                        {tool[0].toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Progression</p>
                            <p className="text-3xl font-black text-indigo-600">{filteredRoadmap.length} Milestones</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="space-y-10 relative">
                <div className="absolute left-8 top-10 bottom-10 w-1 bg-slate-100 rounded-full hidden md:block opacity-50"></div>
                
                {filteredRoadmap.map((milestone, idx) => (
                    <div key={idx} className="relative md:pl-24 group">
                        <div className="absolute left-[30px] w-4 h-4 bg-white border-4 border-indigo-600 rounded-full z-10 mt-2 hidden md:block group-hover:scale-150 transition-all duration-500 shadow-xl shadow-indigo-200"></div>
                        
                        <div className="glass-card premium-shadow rounded-3xl p-10 hover:bg-white hover:-translate-y-1 transition-all duration-700">
                            <div className="flex flex-col lg:flex-row gap-10 items-start">
                                <div className="p-8 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-4xl shrink-0 shadow-2xl flex items-center justify-center w-24 h-24 group-hover:bg-indigo-600 transition-colors">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-3">
                                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{milestone.step}</h3>
                                        <FiCheckCircle className="text-emerald-100 dark:text-emerald-900/30 w-8 h-8 shrink-0 group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-3">
                                            <FiTool size={14} /> ARCHITECTURE & TOOLING
                                        </p>
                                        <div className="flex flex-wrap gap-2.5">
                                            {milestone.tools.map(tool => (
                                                <div key={tool} className="flex items-center gap-3 px-6 py-3 bg-slate-50/80 dark:bg-slate-800 border border-slate-100/50 dark:border-slate-700 rounded-[1.2rem] text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all cursor-default">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-lg shadow-indigo-300"></span>
                                                    {tool.toUpperCase()}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        const originalIdx = course.roadmap.findIndex(r => r.step === milestone.step);
                                        navigate(`/roadmap/${course.id}/${originalIdx}`);
                                    }}
                                    className="self-center lg:self-center px-10 py-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-black text-xs flex items-center gap-4 shadow-xl shadow-slate-200 transition-all active:scale-95 shrink-0 uppercase tracking-widest btn-hover-scale"
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
