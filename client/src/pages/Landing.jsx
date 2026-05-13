import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { FiArrowRight, FiCode, FiCpu, FiLayout, FiSmartphone, FiActivity, FiSearch, FiCompass, FiShield, FiZap, FiTarget } from 'react-icons/fi';
import { Header } from '../components/ui/header-2';
import logo from '../assets/logo.png';
import { cn } from '@/lib/utils';

const Landing = () => {
    const navigate = useNavigate();
    const featuresRef = useRef(null);

    const scrollToFeatures = () => {
        featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const features = [
        { 
            icon: <FiZap />, 
            title: "Phase 01: Ignition", 
            desc: "Build industry-grade consistency with daily technical challenges and real-time feedback.",
            color: "violet",
            theme: "text-violet-600 bg-violet-50 dark:bg-violet-950/50 border-violet-100 dark:border-violet-900/50 shadow-violet-500/20"
        },
        { 
            icon: <FiCpu />, 
            title: "Phase 02: Synthesis", 
            desc: "Leverage AI to personalize your learning path based on your unique growth metrics.",
            color: "cyan",
            theme: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-100 dark:border-cyan-900/50 shadow-cyan-500/20"
        },
        { 
            icon: <FiTarget />, 
            title: "Phase 03: Mastery", 
            desc: "Engineered to transform theoretical knowledge into career-ready excellence.",
            color: "rose",
            theme: "text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900/50 shadow-rose-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-body selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden relative transition-colors duration-500 noise-bg">
            {/* Premium Light Matrix Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 matrix-grid opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white"></div>
                
                {/* Soft Ethereal Lighting */}
                <div className="absolute top-[-5%] left-[10%] w-[1000px] h-[1000px] bg-violet-500/5 rounded-full blur-[180px] animate-pulse"></div>
                <div className="absolute bottom-[5%] right-[5%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[180px] animate-pulse delay-1000"></div>
            </div>

            <div className="pt-10 md:pt-16">
                <Header />
            </div>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-32 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mb-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                    System Initialized: LT-v2.0
                </div>
                
                <h1 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-heading leading-[0.8] tracking-tighter text-slate-950 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 stagger-1">
                    Learning <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 animate-gradient-x text-glow">Tracker.</span>
                </h1>
                
                <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 stagger-2 px-4 italic">
                    The architect of your technical future. Structured for students who demand absolute mastery and consistent growth.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 stagger-3">
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full sm:w-auto px-16 py-6 bg-slate-950 text-white rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-violet-600 hover:shadow-[0_30px_60px_rgba(124,58,237,0.25)] transition-all shadow-xl group text-xs uppercase tracking-[0.3em] active:scale-95 glow-border"
                    >
                        Login to Terminal <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={scrollToFeatures}
                        className="w-full sm:w-auto px-14 py-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-slate-900 dark:text-white hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 active:scale-95 shadow-xl backdrop-blur-md"
                    >
                        <FiCompass className="text-lg" /> Explore Blueprint
                    </button>
                </div>

                {/* Staggered Tech Stack */}
                <div className="mt-32 md:mt-48 flex flex-col items-center gap-10 animate-in fade-in duration-1000 delay-700">
                    <p className="text-[10px] font-black text-violet-500/60 uppercase tracking-[0.8em]">Engineered with Industry Core</p>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                        {['React', 'Next.js', 'Node.js', 'Python', 'Golang', 'Tailwind'].map((tech, i) => (
                            <span key={tech} className={`text-sm md:text-lg font-heading text-white uppercase tracking-[0.4em] hover:text-violet-400 transition-colors cursor-default stagger-${i+1}`}>{tech}</span>
                        ))}
                    </div>
                </div>
            </main>

            {/* Blueprint Section - Refined for Light Mode */}
            <section ref={featuresRef} id="features" className="bg-slate-50 border-t border-slate-100 py-32 md:py-48 relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full matrix-grid opacity-40"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-40 space-y-10">
                        <h2 className="text-[10px] font-black text-violet-600 uppercase tracking-[0.8em] animate-in fade-in slide-in-from-bottom-4 duration-700">The Blueprint</h2>
                        <h3 className="text-6xl md:text-[9rem] font-heading text-slate-950 tracking-tighter leading-[0.85] uppercase animate-in fade-in slide-in-from-bottom-8 duration-700 stagger-1">Structured for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500">Absolute Mastery.</span></h3>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full stagger-2"></div>
                        <p className="text-slate-500 font-bold text-lg md:text-2xl animate-in fade-in slide-in-from-bottom-12 duration-700 stagger-3 italic">Engineered to remove friction and accelerate your transition from student to industry professional.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {features.map((f, i) => (
                            <div 
                                key={i} 
                                className={cn(
                                    "group p-10 rounded-[3.5rem] bg-white border border-slate-100 transition-all duration-700 hover:-translate-y-4 shadow-sm hover:shadow-2xl animate-in fade-in slide-in-from-bottom-16 duration-1000",
                                    `stagger-${i+1}`,
                                    f.color === 'violet' && "hover:border-violet-200 hover:shadow-violet-500/10",
                                    f.color === 'cyan' && "hover:border-cyan-200 hover:shadow-cyan-500/10",
                                    f.color === 'rose' && "hover:border-rose-200 hover:shadow-rose-500/10"
                                )}
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-12 transition-all duration-500 shadow-sm border",
                                    f.theme,
                                    f.color === 'violet' && "group-hover:bg-violet-600",
                                    f.color === 'cyan' && "group-hover:bg-cyan-600",
                                    f.color === 'rose' && "group-hover:bg-rose-600",
                                    "group-hover:text-white group-hover:rotate-12"
                                )}>
                                    {f.icon}
                                </div>
                                <h3 className={cn(
                                    "text-2xl font-heading text-slate-900 mb-6 tracking-tight transition-colors uppercase leading-tight",
                                    f.color === 'violet' && "group-hover:text-violet-600",
                                    f.color === 'cyan' && "group-hover:text-cyan-600",
                                    f.color === 'rose' && "group-hover:text-rose-600"
                                )}>{f.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-bold group-hover:text-slate-600 transition-colors">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Matrix-Inspired CTA Section */}
            <section className="py-48 text-center relative z-10 bg-white transition-colors overflow-hidden">
                 <div className="absolute inset-0 matrix-grid opacity-20 animate-pulse"></div>
                 <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <h4 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em] mb-12 animate-in fade-in slide-in-from-bottom-4">System Initialized</h4>
                    <h2 className="text-7xl md:text-[10rem] font-heading text-slate-950 tracking-tighter mb-20 leading-[0.8] uppercase animate-in fade-in slide-in-from-bottom-8">Ready to join the <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 text-glow">Learning Tracker?</span></h2>
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-28 py-8 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:scale-110 active:scale-[0.98] transition-all shadow-[0_30px_70px_rgba(0,0,0,0.1)] glow-border"
                    >
                        Initialize Your Account
                    </button>
                 </div>
            </section>

            {/* Modern Minimal Footer */}
            <footer className="py-24 border-t border-slate-100 text-center relative z-10 bg-white">
                <div className="flex flex-col items-center gap-8">
                    <div className="w-12 h-12 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 duration-500">
                        <img src={logo} alt="LT" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2026 Learning Tracker Blueprint • Engineered for Performance</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
