import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiCpu, FiLayout, FiSmartphone } from 'react-icons/fi';
import logo from '../assets/logo.png';
import roboCore from '../assets/ai_robo_core.png';

const Landing = () => {
    const navigate = useNavigate();

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

                    <div className="relative group lg:block hidden h-[850px] w-full flex flex-col items-center justify-center gap-12 perspective-2000 preserve-3d">
                        {/* Background Symmetrical Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-100/15 dark:bg-violet-900/10 rounded-full blur-[180px] animate-glow-pulse pointer-events-none"></div>
                        
                        {/* ROW 1: Top Modules (2) */}
                        <div className="flex gap-16 z-20">
                            {[
                                { id: 1, name: 'Web Mastery', color: 'bg-indigo-600', icon: <FiLayout />, mastery: '82%', rot: 'rotate-x-[15deg] rotate-y-[10deg]', delay: 0 },
                                { id: 4, name: 'Cloud Ops', color: 'bg-rose-600', icon: <FiLayout />, mastery: '64%', rot: 'rotate-x-[15deg] rotate-y-[-10deg]', delay: 1.5 }
                            ].map((tile) => (
                                <motion.div 
                                    key={tile.id} 
                                    className="relative group/tile hover:z-30 transition-all"
                                    animate={{ 
                                        y: [0, -12, 0, 12, 0],
                                        x: [0, 8, 0, -8, 0]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: tile.delay
                                    }}
                                >
                                    <div className={`p-7 bg-white/95 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-3xl premium-shadow transform-gpu ${tile.rot} group-hover/tile:rotate-0 group-hover/tile:scale-105 transition-all duration-700 cursor-pointer w-[260px]`}>
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 ${tile.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform rotate-[-8deg] group-hover/tile:rotate-0 transition-transform duration-500 shrink-0`}>
                                                <span className="text-xl">{tile.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight">{tile.name}</h4>
                                                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                                                    <div className="h-full bg-violet-600 rounded-full" style={{ width: tile.mastery }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* ROW 2: Middle Modules (Significant Gap for Circle) */}
                        <div className="flex items-center justify-between w-full max-w-6xl z-20 relative px-10">
                            {/* Left Middle */}
                            {[
                                { id: 2, name: 'AI Neural', color: 'bg-violet-600', icon: <FiCpu />, mastery: '76%', rot: 'rotate-y-[20deg]', delay: 3 }
                            ].map((tile) => (
                                <motion.div 
                                    key={tile.id} 
                                    className="relative group/tile hover:z-30 transition-all"
                                    animate={{ 
                                        y: [0, 10, 0, -10, 0],
                                        x: [0, -15, 0, 15, 0]
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: tile.delay
                                    }}
                                >
                                    <div className={`p-7 bg-white/95 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-3xl premium-shadow transform-gpu ${tile.rot} group-hover/tile:rotate-0 group-hover/tile:scale-105 transition-all duration-700 cursor-pointer w-[260px]`}>
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 ${tile.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform rotate-[-8deg] group-hover/tile:rotate-0 transition-transform duration-500 shrink-0`}>
                                                <span className="text-xl">{tile.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight">{tile.name}</h4>
                                                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                                                    <div className="h-full bg-violet-600 rounded-full" style={{ width: tile.mastery }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* THE AI ROBO-MENTOR: Perfectly Centered Holographic Core */}
                            <div className="relative group/robo flex flex-col items-center">
                                {/* Projection Aura behind the Robo */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-[60px] animate-pulse pointer-events-none -z-10"></div>
                                
                                <div className="relative z-20 flex flex-col items-center">
                                    {/* Holographic Mastery HUD projecting above Robo */}
                                    <motion.div 
                                        className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <p className="text-[7px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em] mb-1 leading-none">Global Mastery</p>
                                        <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tighter leading-none flex items-baseline gap-0.5">
                                            98.4<span className="text-[10px] text-violet-600">%</span>
                                        </h3>
                                        <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-full">
                                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
                                            <span className="text-[6px] font-black text-emerald-600 uppercase tracking-widest">Protocol: Active</span>
                                        </div>
                                    </motion.div>

                                    {/* The Robo Asset with Floating Motion */}
                                    <motion.img 
                                        src={roboCore} 
                                        alt="AI Mentor" 
                                        className="w-48 h-48 object-contain drop-shadow-[0_0_25px_rgba(124,58,237,0.2)] filter brightness-110 contrast-110"
                                        animate={{ 
                                            y: [0, -15, 0],
                                            rotate: [0, 1, 0, -1, 0]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </div>

                                {/* Radial Base Projection Line */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-violet-600/20 rounded-full blur-md animate-pulse -z-10"></div>

                                {/* Synapse Paths branching from the Robo's interface */}
                                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] pointer-events-none opacity-15 -z-10 group-hover/robo:opacity-40 transition-opacity duration-1000">
                                    <path d="M 600 400 L 400 150 M 600 400 L 800 150 M 600 400 L 300 400 M 600 400 L 900 400 M 600 400 L 400 650 M 600 400 L 800 650" stroke="#7c3aed" strokeWidth="2" fill="none" strokeDasharray="8 8" className="animate-synapse-flow" />
                                </svg>
                            </div>

                            {/* Right Middle */}
                            {[
                                { id: 5, name: 'Security Protocol', color: 'bg-slate-900', icon: <FiSmartphone />, mastery: '92%', rot: 'rotate-y-[-20deg]', delay: 4.5 }
                            ].map((tile) => (
                                <motion.div 
                                    key={tile.id} 
                                    className="relative group/tile hover:z-30 transition-all"
                                    animate={{ 
                                        y: [0, -10, 0, 10, 0],
                                        x: [0, 15, 0, -15, 0]
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: tile.delay
                                    }}
                                >
                                    <div className={`p-7 bg-white/95 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-3xl premium-shadow transform-gpu ${tile.rot} group-hover/tile:rotate-0 group-hover/tile:scale-105 transition-all duration-700 cursor-pointer w-[260px]`}>
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 ${tile.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform rotate-[8deg] group-hover/tile:rotate-0 transition-transform duration-500 shrink-0`}>
                                                <span className="text-xl">{tile.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0 text-left">
                                                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight">{tile.name}</h4>
                                                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                                                    <div className="h-full bg-violet-600 rounded-full" style={{ width: tile.mastery }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* ROW 3: Bottom Modules (2) */}
                        <div className="flex gap-16 z-20">
                            {[
                                { id: 3, name: 'Data Engine', color: 'bg-emerald-600', icon: <FiCode />, mastery: '89%', rot: 'rotate-x-[-15deg] rotate-y-[10deg]', delay: 6 },
                                { id: 6, name: 'DevOps Track', color: 'bg-blue-600', icon: <FiArrowRight />, mastery: '45%', rot: 'rotate-x-[-15deg] rotate-y-[-10deg]', delay: 7.5 }
                            ].map((tile) => (
                                <motion.div 
                                    key={tile.id} 
                                    className="relative group/tile hover:z-30 transition-all"
                                    animate={{ 
                                        y: [0, 12, 0, -12, 0],
                                        x: [0, -8, 0, 8, 0]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: tile.delay
                                    }}
                                >
                                    <div className={`p-7 bg-white/95 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-3xl premium-shadow transform-gpu ${tile.rot} group-hover/tile:rotate-0 group-hover/tile:scale-105 transition-all duration-700 cursor-pointer w-[260px]`}>
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 ${tile.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform rotate-[-8deg] group-hover/tile:rotate-0 transition-transform duration-500 shrink-0`}>
                                                <span className="text-xl">{tile.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight">{tile.name}</h4>
                                                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                                                    <div className="h-full bg-violet-600 rounded-full" style={{ width: tile.mastery }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
