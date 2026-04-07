import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiCpu, FiLayout, FiSmartphone } from 'react-icons/fi';
import logo from '../assets/logo.png';
import roboCore from '../assets/ai_robo_v2.png';

const Landing = () => {
    const navigate = useNavigate();
    const [activeModuleId, setActiveModuleId] = useState(null);

    const modules = [
        { id: 1, name: 'Web Mastery', icon: <FiLayout />, mastery: 82, rotation: -12, y: -20, x: -10, desc: "Architect elite-level web applications with React, Next.js, and modern CSS strategies. Focus on performance, accessibility, and clean code." },
        { id: 2, name: 'AI Neural', icon: <FiCpu />, mastery: 76, rotation: 12, y: -40, x: 10, desc: "Leverage the power of LLMs and neural networks. Learn to build AI-first applications that scale and provide real-world value." },
        { id: 3, name: 'Data Engine', icon: <FiCode />, mastery: 89, rotation: -8, y: 30, x: -15, desc: "Scale your backend with robust database architectures and efficient API design. Master both SQL and NoSQL environments." },
        { id: 4, name: 'Cloud Ops', icon: <FiLayout />, mastery: 64, rotation: 15, y: 50, x: 15, desc: "Deploy with confidence using modern CI/CD pipelines, Docker, and Kubernetes. ensure high availability and security." },
    ];

    const features = [
        { icon: <FiCode />, title: "Code Mastery", desc: "Interactive environments and real-world projects designed for speed." },
        { icon: <FiCpu />, title: "AI Integration", desc: "Learn to build and leverage modern AI models with expert guidance." },
        { icon: <FiLayout />, title: "Visual Roadmaps", desc: "Step-by-step paths curated by industry experts for every stack." },
        { icon: <FiSmartphone />, title: "Mobile Friendly", desc: "Learn on the go with our fully responsive and fast platform." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-violet-600 selection:text-white overflow-hidden relative transition-colors duration-500">
            {/* Background Glows - Refined for Ghost White */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-100/50 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-fuchsia-100/40 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-rose-50/30 rounded-full blur-[120px]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 px-8 py-10 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-xl shadow-violet-100 group-hover:scale-105 transition-transform duration-300">
                        <img src={logo} alt="L" className="w-6 h-6 object-contain brightness-0 invert" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-900">Learning<span className="text-violet-600">Tracker</span></span>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-slate-600">
                    <a href="#" className="hover:text-violet-600 transition-colors">Courses</a>
                    <a href="#" className="hover:text-violet-600 transition-colors">Resources</a>
                    <a href="#" className="hover:text-violet-600 transition-colors">Enterprise</a>
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-violet-600 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200 font-black"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-violet-50 border border-violet-100 rounded-full text-violet-600 text-[10px] font-black uppercase tracking-[0.2em]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
                            </span>
                            v2.0 Next-Gen Platform
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black leading-[1] tracking-tighter text-slate-950">
                            Master the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-600">Tech Market.</span>
                        </h1>
                        <p className="text-xl text-slate-800 max-w-xl leading-relaxed font-medium">
                            Stop guessing. Start building. Follow premium visual roadmaps designed by elite engineers to take you from zero to expert.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full sm:w-auto px-12 py-5 bg-violet-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-violet-700 hover:shadow-violet-200 transition-all shadow-2xl shadow-violet-100 group text-sm"
                            >
                                Start Learning Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-12 py-5 bg-white border border-slate-200 rounded-2xl font-black text-slate-800 hover:bg-slate-50 transition-all text-sm shadow-xl shadow-slate-100">
                                View Curriculum
                            </button>
                        </div>
                        <div className="flex items-center gap-6 pt-10">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-violet-600 shadow-sm">
                                        {['TS', 'JS', 'PY', 'GO'][i-1]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Trusted by <span className="text-slate-950 font-black">20,000+</span> elite employees</p>
                        </div>
                    </div>

                    <div className="absolute -right-24 top-1/2 -translate-y-1/2 lg:block hidden h-[850px] w-1/2 flex items-center justify-end perspective-2000 preserve-3d overflow-visible z-20">
                        {/* 1. Digital Grid Lattice Background (Subtle Depth) */}
                        <div className="absolute inset-x-[-100px] inset-y-[-100px] bg-[radial-gradient(#7c3aed_0.5px,transparent_0.5px)] [background-size:48px_48px] opacity-[0.03] dark:opacity-[0.05] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] rotate-[15deg]"></div>
                        
                        {/* 2. Knowledge Boxes (Command Panel) */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
                            {modules.map((module) => (
                                <motion.div
                                    key={module.id}
                                    whileHover={{ x: 10 }}
                                    onClick={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
                                    className={`p-3.5 w-48 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg ${
                                        activeModuleId === module.id 
                                        ? 'bg-violet-600 border-violet-500 text-white translate-x-2' 
                                        : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-lg ${activeModuleId === module.id ? 'bg-white/20' : 'bg-violet-100 dark:bg-violet-900/30'}`}>
                                            <span className={`text-base ${activeModuleId === module.id ? 'text-white' : 'text-violet-600'}`}>
                                                {module.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-[7px] font-black uppercase tracking-widest leading-none mb-1">{module.name}</h4>
                                            <div className="h-0.5 w-12 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-violet-600 dark:bg-violet-400" 
                                                    style={{ width: `${module.mastery}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* 3. Central AI Robo-Mentor (Enhanced Holographic Presence) */}
                        <div className="relative z-20 flex flex-col items-end">
                            {/* NEW: Holographic Aura Effects (Hides JPEG Edges) */}
                            <div className="absolute top-1/2 right-40 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[150px] -z-10 mix-blend-screen"></div>
                            <div className="absolute top-1/2 right-60 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[100px] -z-10 animate-pulse-subtle"></div>
                            <div className="absolute top-1/2 right-20 -translate-y-1/2 w-[200px] h-[200px] bg-sky-400/20 rounded-full blur-[60px] -z-10"></div>

                            {/* Holographic Orbital Halo */}
                            <div className="absolute -bottom-10 right-20 w-80 h-24 border-[3px] border-violet-500/20 rounded-full animate-spin-slow blur-[2px] -z-10"></div>
                            
                            {/* Selecting Robot (Static but Glowing) */}
                            <motion.div
                                animate={activeModuleId ? { 
                                    scale: 1.15,
                                    filter: "brightness(1.2) contrast(1.1)",
                                } : { scale: 1.1, filter: "brightness(1) contrast(1)" }}
                                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                                className="relative group/robo-core"
                            >
                                <img 
                                    src={roboCore} 
                                    alt="AI Mentor" 
                                    style={{ mixBlendMode: 'multiply' }}
                                    className="w-[750px] h-auto max-h-[800px] object-contain drop-shadow-[0_40px_120px_rgba(124,58,237,0.5)] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" 
                                />
                                {activeModuleId && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1.2 }}
                                        className="absolute inset-0 bg-violet-500/10 rounded-full blur-[100px] -z-10"
                                    />
                                )}
                            </motion.div>

                            {/* 4. Compact Info Card (Positioned to avoid all overlaps) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={activeModuleId ? { opacity: 1, scale: 1, y: 0, x: -450 } : { opacity: 0, scale: 0.9, y: 30, x: -420 }}
                                className="absolute right-0 top-[-50px] w-[280px] p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] z-50 pointer-events-none border-2"
                            >
                                {activeModuleId && (
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-violet-600 rounded-full text-[7px] font-black text-white uppercase tracking-widest">
                                            Insight 
                                        </div>
                                        <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">
                                            {modules.find(m => m.id === activeModuleId).name}
                                        </h3>
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            {modules.find(m => m.id === activeModuleId).desc}
                                        </p>
                                        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[10px] font-black uppercase text-slate-400">Mastery Progress</span>
                                                <span className="text-lg font-black text-violet-600">{modules.find(m => m.id === activeModuleId).mastery}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-violet-600" 
                                                    style={{ width: `${modules.find(m => m.id === activeModuleId).mastery}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Feature Grid */}
            <section className="bg-slate-100/50 border-t border-slate-200 py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em]">Built for Professionals</h2>
                        <h3 className="text-4xl font-black text-slate-900 tracking-tight">Everything you need to scale your skills.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-100/50 transition-all duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 text-2xl mb-8 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
