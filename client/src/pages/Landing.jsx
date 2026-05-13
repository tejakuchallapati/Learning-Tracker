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
        <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative transition-colors duration-500">
            {/* Morris-Matrix Inspired Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 matrix-grid opacity-100"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-slate-950/50 to-white dark:to-[#020617]"></div>
                
                {/* Floating Orbs */}
                <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
            </div>

            <Header />

            {/* Hero Section - Optimized for Above-the-Fold Visibility */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-32 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-800 rounded-full text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
                    </span>
                    System Online: Version 2.0
                </div>
                
                <h1 className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-slate-900 dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 stagger-1">
                    Learning <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 animate-gradient-x">Tracker.</span>
                </h1>
                
                <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-bold mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 stagger-2 px-4">
                    Learning Tracker is more than a productivity platform — it’s a growth-driven ecosystem designed to help students build consistency and transform daily learning into long-term success.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-16 duration-1000 stagger-3">
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full sm:w-auto px-14 py-5 bg-violet-600 text-white rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-violet-700 hover:shadow-[0_20px_60px_rgba(124,58,237,0.4)] transition-all shadow-2xl group text-xs uppercase tracking-[0.2em] active:scale-95 glow-border"
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
                <div className="mt-24 md:mt-32 flex flex-col items-center gap-8 animate-in fade-in duration-1000 delay-700">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Integrated Neural Stack</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-14 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                        {['React', 'Next.js', 'Node.js', 'Python', 'Golang', 'Tailwind'].map((tech, i) => (
                            <span key={tech} className={`text-xs md:text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] hover:text-violet-500 transition-colors cursor-default stagger-${i+1}`}>{tech}</span>
                        ))}
                    </div>
                </div>
            </main>

            {/* Feature Section - Enhanced with More Space & Effects */}
            <section ref={featuresRef} className="bg-slate-50 dark:bg-[#020617] border-t border-slate-100 dark:border-slate-800 py-32 md:py-48 relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full matrix-grid opacity-30"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-40 space-y-8">
                        <h2 className="text-[10px] font-black text-violet-600 dark:text-violet-500 uppercase tracking-[0.6em] animate-in fade-in slide-in-from-bottom-4 duration-700">The Blueprint</h2>
                        <h3 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] uppercase animate-in fade-in slide-in-from-bottom-8 duration-700 stagger-1">Structured for <br/> Absolute <span className="text-violet-600">Consistency.</span></h3>
                        <div className="w-24 h-1.5 bg-violet-600 mx-auto rounded-full stagger-2"></div>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg md:text-2xl animate-in fade-in slide-in-from-bottom-12 duration-700 stagger-3">Every feature is engineered to remove friction and accelerate your transition from student to industry professional.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {features.map((f, i) => (
                            <div 
                                key={i} 
                                className={cn(
                                    "group p-10 rounded-[3.5rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 transition-all duration-700 hover:-translate-y-4 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-16 duration-1000",
                                    `stagger-${i+1}`,
                                    f.color === 'violet' && "hover:border-violet-500/50 hover:shadow-violet-500/20",
                                    f.color === 'cyan' && "hover:border-cyan-500/50 hover:shadow-cyan-500/20",
                                    f.color === 'rose' && "hover:border-rose-500/50 hover:shadow-rose-500/20"
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
                                    "text-xl font-black text-slate-900 dark:text-white mb-6 tracking-tight transition-colors uppercase leading-tight",
                                    f.color === 'violet' && "group-hover:text-violet-600",
                                    f.color === 'cyan' && "group-hover:text-cyan-600",
                                    f.color === 'rose' && "group-hover:text-rose-600"
                                )}>{f.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-bold group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Matrix-Inspired CTA Section */}
            <section className="py-48 text-center relative z-10 bg-white dark:bg-slate-950 transition-colors overflow-hidden">
                 <div className="absolute inset-0 matrix-grid opacity-20 animate-pulse"></div>
                 <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <h4 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em] mb-12 animate-in fade-in slide-in-from-bottom-4">System Initialized</h4>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-16 leading-[0.9] uppercase animate-in fade-in slide-in-from-bottom-8">Ready to join the <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Learning Tracker?</span></h2>
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-24 py-7 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-violet-500/30 glow-border"
                    >
                        Initialize Your Account
                    </button>
                 </div>
            </section>

            {/* Modern Minimal Footer */}
            <footer className="py-20 border-t border-slate-100 dark:border-slate-800 text-center relative z-10 bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-10 h-10 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 duration-500">
                        <img src={logo} alt="GG" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">© 2026 Learning Tracker Blueprint • Engineered for Performance</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
