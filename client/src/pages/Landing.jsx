import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiCpu, FiLayout, FiSmartphone } from 'react-icons/fi';
import logo from '../assets/logo.png';
import roboCore from '../assets/ai_robo_v2.png';

const Landing = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

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

                    <div className="relative group lg:block hidden h-[850px] w-full flex items-center justify-center perspective-2000 preserve-3d overflow-visible">
                        {/* 1. Digital Grid Lattice Background (Subtle Depth) */}
                        <div className="absolute inset-x-[-100px] inset-y-[-100px] bg-[radial-gradient(#7c3aed_0.5px,transparent_0.5px)] [background-size:48px_48px] opacity-[0.03] dark:opacity-[0.05] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] rotate-[15deg]"></div>
                        
                        {/* 2. Central AI Robo-Mentor (Commander Host) */}
                        <div className="relative z-20 flex flex-col items-center">
                            {/* Holographic Orbital Halo */}
                            <div className="absolute -bottom-10 w-64 h-20 border-[3px] border-violet-500/20 rounded-full animate-spin-slow blur-[1px] -z-10"></div>
                            <div className="absolute -bottom-12 w-48 h-12 border-2 border-rose-500/10 rounded-full animate-spin-reverse-slow blur-[2px] -z-10"></div>
                            
                            {/* Robot with Breathing Float - MASSIVE SCALE */}
                            <motion.div
                                animate={{ y: [0, -30, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="relative cursor-pointer group/robo-core"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                <img src={roboCore} alt="AI Mentor" className="w-[450px] h-[450px] object-contain drop-shadow-[0_20px_80px_rgba(124,58,237,0.4)] filter brightness-110" />
                                
                                {/* Floated Mastery HUD above Robo (The Interactive Toggle) */}
                                <motion.div 
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-10 py-5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/60 dark:border-slate-700 rounded-3xl flex flex-col items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-105 hover:bg-white/60 transition-all duration-500 border-2"
                                    animate={{ 
                                        y: isExpanded ? [-5, 5, -5] : [0, -10, 0],
                                        borderColor: isExpanded ? ['rgba(124,58,237,0.6)', 'rgba(236,72,153,0.6)'] : 'white'
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.5em] mb-1">Global Mastery</p>
                                    <h3 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter leading-none flex items-baseline gap-1">
                                        98.4<span className="text-xl text-violet-600">%</span>
                                    </h3>
                                    <p className="mt-3 text-[8px] font-black text-violet-600 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-pulse"></span>
                                        {isExpanded ? 'System: Viewing Roadmap' : 'Click to Explore Intelligence'}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* 3. Neural Lattice Modules (3D Perspective Constellation) */}
                        {[
                            { id: 1, name: 'Web Mastery', icon: <FiLayout />, mastery: 82, pos: 'top-[10%] left-[10%]', scale: 'scale-90', blur: 'blur-[0.5px]', z: 'z-10', delay: 0 },
                            { id: 2, name: 'AI Neural', icon: <FiCpu />, mastery: 76, pos: 'top-[35%] -left-[15%]', scale: 'scale-110', blur: 'blur-0', z: 'z-30', delay: 1 },
                            { id: 3, name: 'Data Engine', icon: <FiCode />, mastery: 89, pos: 'bottom-[10%] left-[5%]', scale: 'scale-95', blur: 'blur-[0.5px]', z: 'z-10', delay: 2 },
                            { id: 4, name: 'Cloud Ops', icon: <FiLayout />, mastery: 64, pos: 'top-[15%] right-[10%]', scale: 'scale-95', blur: 'blur-[0.5px]', z: 'z-10', delay: 1.5 },
                            { id: 5, name: 'Security Logic', icon: <FiSmartphone />, mastery: 92, pos: 'top-[45%] -right-[15%]', scale: 'scale-105', blur: 'blur-0', z: 'z-30', delay: 0.5 },
                            { id: 6, name: 'DevOps Flow', icon: <FiArrowRight />, mastery: 45, pos: 'bottom-[15%] right-[15%]', scale: 'scale-90', blur: 'blur-[1px]', z: 'z-10', delay: 2.5 }
                        ].map((tile) => (
                            <motion.div
                                key={tile.id}
                                className={`absolute ${tile.pos} ${tile.z} group/tile transition-all duration-700`}
                                initial={false}
                                animate={{ 
                                    y: isExpanded ? [0, -15, 0, 15, 0] : 0,
                                    x: isExpanded ? [0, 8, 0, -8, 0] : 0,
                                    scale: isExpanded ? 1 : 0,
                                    opacity: isExpanded ? 1 : 0
                                }}
                                transition={{
                                    scale: { duration: 0.8, ease: "backOut", delay: tile.delay * 0.2 },
                                    opacity: { duration: 0.5, delay: tile.delay * 0.2 },
                                    y: { duration: 8 + tile.id, repeat: Infinity, ease: "easeInOut" },
                                    x: { duration: 8 + tile.id, repeat: Infinity, ease: "easeInOut" }
                                }}
                            >
                                <div className={`p-4 bg-white/5 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dark:border-slate-800 rounded-[1.5rem] shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:border-violet-500/50 hover:shadow-violet-500/20 transition-all duration-500 w-[180px] ${tile.scale} ${tile.blur}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-rose-600 text-white rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0.5px,transparent_0.5px)] bg-[size:4px_4px] opacity-20"></div>
                                            <span className="text-sm relative z-10">{tile.icon}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[9px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest truncate leading-none mb-1.5">{tile.name}</h4>
                                            
                                            {/* Micro-Gauge Circle Indicator */}
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-3 h-3 transform -rotate-90">
                                                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" fill="transparent" 
                                                        className="text-violet-600"
                                                        strokeDasharray={2 * Math.PI * 5}
                                                        strokeDashoffset={2 * Math.PI * 5 * (1 - tile.mastery / 100)}
                                                    />
                                                </svg>
                                                <span className="text-[8px] font-bold text-slate-400 uppercase leading-none tracking-tighter">{tile.mastery}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* 4. Neural-Bus Circuits (Animated ONLY on Expanded) */}
                        <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${isExpanded ? 'opacity-20' : 'opacity-0'}`}>
                            <defs>
                                <linearGradient id="bus-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#7c3aed" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                            {/* Circuit Board Paths from Robot to Modules */}
                            <path d="M 600 400 L 450 150 M 600 400 L 750 150 M 600 400 L 350 400 M 600 400 L 850 400 M 600 400 L 450 650 M 600 400 L 750 650" 
                                stroke="url(#bus-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className={isExpanded ? 'animate-synapse-flow' : ''} />
                            
                            {/* Data Bits (Moving dots on circuits) */}
                            {isExpanded && [0,1,2,3,4,5].map(i => (
                                <circle key={i} r="2" fill="#7c3aed" className="animate-data-bit" style={{ offsetPath: `path('M 600 400 L ${[450, 750, 350, 850, 450, 750][i]} ${[150, 150, 400, 400, 650, 650][i]}')`, animationDelay: `${i * 1.2}s` }} />
                            ))}
                        </svg>
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
