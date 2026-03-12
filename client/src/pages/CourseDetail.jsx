import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/CourseData';
import { FiChevronLeft, FiBookOpen, FiArrowRight, FiPlayCircle, FiCheckCircle } from 'react-icons/fi';

const CourseDetail = () => {
    const { courseId, stepIdx } = useParams();
    const navigate = useNavigate();
    
    const course = courses.find(c => c.id === courseId);
    const step = course?.roadmap[parseInt(stepIdx)];

    if (!course || !step) return <div className="p-20 text-center">Step not found.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            {/* Context Navigation */}
            <button 
                onClick={() => navigate(`/roadmap/${courseId}`)}
                className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-[0.2em] group"
            >
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors"><FiChevronLeft /></div> 
                Back to {course.title} Roadmap
            </button>

            {/* Step Hero - Premium Glass */}
            <div className="glass-card premium-shadow p-16 rounded-[4rem] border border-white/50 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-8">
                        <span className="px-6 py-2 bg-slate-900 text-indigo-400 rounded-[1.2rem] text-[9px] font-black uppercase tracking-[0.2em]">Milestone 0{parseInt(stepIdx) + 1}</span>
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                        <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">{course.title}</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">{step.step}</h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        In this technical module, we'll deep dive into the architecture and practical tooling required to master <span className="text-indigo-600 font-bold">{step.step.toLowerCase()}</span>.
                    </p>
                </div>
            </div>

            {/* Detailed Topics */}
            <div className="space-y-8">
                <h2 className="text-xs font-black text-slate-900 px-4 flex items-center gap-4 uppercase tracking-[0.3em]">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm"><FiBookOpen size={18} /></div>
                    Module Syllabus
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                    {step.topics?.map((topic, i) => (
                        <div key={i} className="group glass-card premium-shadow p-10 rounded-[3rem] border border-white/50 hover:border-indigo-100 transition-all duration-500 hover:-translate-y-1">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100/50 flex items-center justify-center text-indigo-600 font-black shrink-0 text-lg shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors tracking-tight">{topic.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-base font-medium">{topic.detail}</p>
                                    
                                    <div className="mt-8 flex items-center gap-8">
                                        <button 
                                            onClick={() => navigate(`/roadmap/${courseId}/${stepIdx}/${i}`)}
                                            className="flex items-center gap-3 text-[10px] font-black text-indigo-600 hover:gap-5 transition-all uppercase tracking-[0.2em]"
                                        >
                                            Technical Guide <FiArrowRight />
                                        </button>
                                        <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-[0.2em]">
                                            <FiPlayCircle size={14} /> Video Lecture
                                        </button>
                                    </div>
                                </div>
                                <div className="self-center">
                                    <div className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center text-slate-100 group-hover:border-emerald-200 group-hover:text-emerald-400 transition-all duration-500 bg-white shadow-sm">
                                        <FiCheckCircle size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!step.topics && (
                        <div className="p-24 text-center glass-card rounded-[4rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-black uppercase tracking-[0.2em]">Curriculum Finalization in Progress</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Next Module Preview */}
            {course.roadmap[parseInt(stepIdx) + 1] && (
                <div className="pt-12">
                    <div className="bg-slate-900 rounded-[4rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Core Track Progression</p>
                            <h3 className="text-3xl font-black tracking-tight">{course.roadmap[parseInt(stepIdx) + 1].step}</h3>
                        </div>
                        <button 
                            onClick={() => navigate(`/roadmap/${courseId}/${parseInt(stepIdx) + 1}`)}
                            className="px-10 py-5 bg-indigo-600 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-4 whitespace-nowrap shadow-2xl shadow-indigo-600/20 btn-hover-scale relative z-10"
                        >
                            Next Milestone <FiPlayCircle size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
