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
                    className="flex items-center gap-3 text-xs font-black text-slate-600 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 uppercase tracking-widest transition-all mb-10 group"
                >
                    <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                </button>

                <div className="text-center mb-20">
                    <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight uppercase">{course.title}</h1>
                    <p className="text-slate-700 dark:text-slate-400 text-xl font-bold max-w-2xl mx-auto leading-relaxed">Systematic mastery requires focus. Choose your specialized trajectory to begin the curriculum.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {course.subTracks.map(track => (
                        <div 
                            key={track.id}
                            onClick={() => setActiveSubTrack(track.id)}
                            className="bg-white dark:bg-slate-900 premium-shadow rounded-[2.5rem] p-12 hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden text-center border border-slate-100 dark:border-slate-800"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="text-[140px] leading-none grayscale group-hover:grayscale-0 transition-all">{track.icon}</span>
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 shadow-xl rounded-[2rem] flex items-center justify-center text-5xl mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white dark:border-slate-700">
                                    {track.icon}
                                </div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors uppercase tracking-tight leading-tight">{track.title}</h2>
                                <p className="text-slate-700 dark:text-slate-400 leading-relaxed mb-10 text-lg font-bold">{track.description}</p>
                                
                                <div className="w-full space-y-4 pt-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400 dark:text-violet-500">Core Architecture</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {track.tools.map(tool => (
                                            <span key={tool} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-950 rounded-[1rem] text-xs font-black text-slate-700 dark:text-slate-400 border border-slate-100 dark:border-slate-800 uppercase tracking-tight">{tool}</span>
                                        ))}
                                    </div>
                                </div>

                                <button className="mt-14 px-10 py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black text-xs flex items-center gap-3 group-hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 dark:shadow-none uppercase tracking-widest">
                                    INITIALIZE CURRICULUM <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
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
                className="flex items-center gap-3 text-xs font-black text-slate-600 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 uppercase tracking-widest transition-all mb-10 group"
            >
                <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                {activeSubTrack ? `Switch ${course.title} Path` : 'Back to Catalog'}
            </button>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-900 premium-shadow rounded-[3rem] p-12 md:p-16 border border-slate-100 dark:border-slate-800 mb-16 relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 p-12 opacity-5 blur-sm grayscale">
                    <span className="text-[180px] leading-none">{course.icon}</span>
                </div>
                
                <div className="relative z-10 max-w-3xl">
                    <span className="inline-flex items-center px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-violet-600 text-white mb-8 border border-violet-400/50 shadow-lg shadow-violet-200/50 dark:shadow-none">
                        {activeSubTrack ? `${course.subTracks.find(t => t.id === activeSubTrack).title} MASTERCLASS` : 'PROFESSIONAL PATHWAY'}
                    </span>
                    <h1 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1] uppercase">
                        {activeSubTrack ? course.subTracks.find(t => t.id === activeSubTrack).title : `Mastering ${course.title}`}
                    </h1>
                    <p className="text-slate-700 dark:text-slate-400 mt-8 text-xl leading-relaxed font-bold">
                        Systematic technical roadmap engineered to bridge the gap between theoretical knowledge and professional production mastery.
                    </p>

                    <div className="mt-14 flex flex-wrap items-center gap-10">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-500 pl-1">Primary Stack</p>
                            <div className="flex -space-x-3 mt-3">
                                {course.tools.slice(0, 5).map((tool, i) => (
                                    <div key={i} className="w-14 h-14 rounded-[1.2rem] bg-slate-50 dark:bg-slate-800 border-2 border-white dark:border-slate-700 flex items-center justify-center shadow-xl text-[10px] font-black text-violet-600 dark:text-violet-400 transform hover:-translate-y-2 transition-all cursor-default">
                                        {tool[0].toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-16 w-px bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-500 pl-1">Progression</p>
                            <p className="text-4xl font-black text-violet-600 dark:text-violet-400 tracking-tight leading-none uppercase">{filteredRoadmap.length} Milestones</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="space-y-12 relative">
                <div className="absolute left-8 top-10 bottom-10 w-1.5 bg-slate-100 dark:bg-slate-800 rounded-full hidden md:block opacity-50"></div>
                
                {filteredRoadmap.map((milestone, idx) => (
                    <div key={idx} className="relative md:pl-28 group">
                        <div className="absolute left-[29px] w-5 h-5 bg-white dark:bg-slate-900 border-4 border-violet-600 rounded-full z-10 mt-3 hidden md:block group-hover:scale-125 transition-all duration-500 shadow-xl shadow-violet-200"></div>
                        
                        <div className="bg-white dark:bg-slate-900 premium-shadow rounded-[2.5rem] p-10 hover:-translate-y-2 transition-all duration-700 border border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col lg:flex-row gap-12 items-start">
                                <div className="p-8 bg-slate-900 dark:bg-slate-950 text-white rounded-3xl font-black text-4xl shrink-0 shadow-2xl flex items-center justify-center w-28 h-28 group-hover:bg-violet-600 transition-all duration-500 transform group-hover:rotate-6">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">{milestone.step}</h3>
                                        <FiCheckCircle className="text-slate-100 dark:text-slate-800 w-10 h-10 shrink-0 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                                    </div>
                                    <div className="mt-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400 mb-6 flex items-center gap-3">
                                            <FiTool size={16} /> ARCHITECTURE & TOOLING
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {milestone.tools.map(tool => (
                                                <div key={tool} className="flex items-center gap-3 px-6 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[1.2rem] text-sm font-black text-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-2xl hover:shadow-violet-500/5 transition-all cursor-default">
                                                    <span className="w-2 h-2 rounded-full bg-violet-600 shadow-lg shadow-violet-300 dark:shadow-none"></span>
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
                                    className="self-center lg:self-center px-12 py-5 bg-slate-900 dark:bg-slate-800 hover:bg-violet-600 text-white rounded-2xl font-black text-xs flex items-center gap-4 shadow-xl shadow-slate-200 dark:shadow-none transition-all active:scale-95 shrink-0 uppercase tracking-widest btn-hover-scale"
                                >
                                    Start Workshop <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
