import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCode, FiCpu, FiLayout, FiSmartphone } from 'react-icons/fi';
import logo from '../assets/logo.png';

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
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-40">
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
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Trusted by <span className="text-slate-950 font-black">20,000+</span> elite developers</p>
                        </div>
                    </div>

                    <div className="relative group lg:block hidden h-[700px] w-full perspective-2000 preserve-3d">
                        {/* Background Symmetrical Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/20 dark:bg-violet-900/10 rounded-full blur-[160px] animate-glow-pulse pointer-events-none"></div>
                        
                        {/* 1. Central Data Core Pillar - Perfectly Centered */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-full z-10 pointer-events-none">
                            {/* Mastery HUD - Relocated to TOP for better structure */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[80%] text-center z-20">
                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-3">Global Mastery Index</p>
                                <div className="flex items-center justify-center gap-4">
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">98.4<span className="text-sm text-violet-600">%</span></h3>
                                    <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none">Node Sync Alpha</span>
                                        </div>
                                        <p className="text-[7px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1.5 leading-none">Protocol: Optimized-X24</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-x-12 inset-y-0 bg-gradient-to-b from-transparent via-violet-600/30 to-transparent w-24 h-full border-x border-violet-500/20 shadow-[0_0_80px_rgba(124,58,237,0.25)] overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-scanline"></div>
                                <div className="absolute top-0 left-0 w-full h-full opacity-[0.1] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:14px_14px]"></div>
                            </div>
                            
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                                <div className="p-1.5 bg-gradient-to-br from-violet-500/20 to-rose-500/20 rounded-full shadow-[0_0_60px_rgba(124,58,237,0.3)] backdrop-blur-sm">
                                    <div className="w-28 h-28 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white dark:border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-700">
                                        <div className="text-violet-600 text-5xl animate-pulse"><FiCpu className="animate-spin-slow" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Structured Matrix - Symmetrical Columns */}
                        <div className="absolute inset-0 flex justify-between px-10">
                            {/* Left Column (3 Tiles) */}
                            <div className="flex flex-col justify-around h-full py-10 w-fit">
                                {[
                                    { id: 1, name: 'Web Mastery', color: 'bg-indigo-600', icon: <FiLayout />, mastery: '82%' },
                                    { id: 2, name: 'AI Neural', color: 'bg-violet-600', icon: <FiCpu />, mastery: '76%' },
                                    { id: 3, name: 'Data Engine', color: 'bg-emerald-600', icon: <FiCode />, mastery: '89%' }
                                ].map((tile) => (
                                    <div key={tile.id} className="relative group/tile hover:z-30 transition-all">
                                        <svg className="absolute top-1/2 left-full w-48 h-10 pointer-events-none opacity-20 group-hover/tile:opacity-60 transition-all duration-700 -z-10 -translate-y-1/2">
                                            <path d="M 0 20 L 192 20" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeDasharray="10 10" className="animate-synapse-flow" />
                                        </svg>
                                        <div className="p-8 bg-white/95 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-3xl premium-shadow transform-gpu rotate-y-[25deg] skew-y-[-5deg] group-hover/tile:rotate-0 group-hover/tile:scale-110 group-hover/tile:-translate-x-4 transition-all duration-700 cursor-pointer w-72">
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 ${tile.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform rotate-[-8deg] group-hover/tile:rotate-0 transition-transform duration-500 shrink-0`}>
                                                    <span className="text-2xl">{tile.icon}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight">{tile.name}</h4>
                                                    <div className="flex justify-between items-center text-[9px] font-black text-slate-400 mt-2">
                                                        <span>Progress</span>
                                                        <span className="text-violet-600">{tile.mastery}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden mt-1.5">
                                                        <div className="h-full bg-violet-600 rounded-full" style={{ width: tile.mastery }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column (3 Tiles) */}
                            <div className="flex flex-col justify-around h-full py-10 w-fit">
                                {[
                                    { id: 4, name: 'Cloud Ops', color: 'bg-rose-600', icon: <FiLayout />, mastery: '64%' },
                                    { id: 5, name: 'Security Protocol', color: 'bg-slate-900', icon: <FiSmartphone />, mastery: '92%' },
                                    { id: 6, name: 'DevOps Track', color: 'bg-blue-600', icon: <FiArrowRight />, mastery: '45%' }
                                ].map((tile) => (
                                    <div key={tile.id} className="relative group/tile hover:z-30 transition-all">
                                        <svg className="absolute top-1/2 right-full w-48 h-10 pointer-events-none opacity-20 group-hover/tile:opacity-60 transition-all duration-700 -z-10 -translate-y-1/2">
                                            <path d="M 192 20 L 0 20" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeDasharray="10 10" className="animate-synapse-flow" />
                                        </svg>
                                        <div className="p-8 bg-white/95 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-3xl premium-shadow transform-gpu rotate-y-[-25deg] skew-y-[5deg] group-hover/tile:rotate-0 group-hover/tile:scale-110 group-hover/tile:translate-x-4 transition-all duration-700 cursor-pointer w-72">
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 ${tile.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform rotate-[8deg] group-hover/tile:rotate-0 transition-transform duration-500 shrink-0`}>
                                                    <span className="text-2xl">{tile.icon}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight">{tile.name}</h4>
                                                    <div className="flex justify-between items-center text-[9px] font-black text-slate-400 mt-2">
                                                        <span>Progress</span>
                                                        <span className="text-violet-600">{tile.mastery}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden mt-1.5">
                                                        <div className="h-full bg-violet-600 rounded-full" style={{ width: tile.mastery }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
