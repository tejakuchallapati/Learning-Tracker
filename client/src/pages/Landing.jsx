import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCode, FiCpu, FiLayout, FiSmartphone, FiActivity } from 'react-icons/fi';
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
        <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-hidden relative transition-colors duration-500">
            {/* Animated Deep Space Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-[#020617] opacity-100"></div>
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-subtle"></div>
                <div className="absolute top-[30%] -right-[20%] w-[70%] h-[70%] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute -bottom-[30%] left-[20%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[130px] animate-spin-slow"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 px-8 py-10 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 border border-cyan-400/30">
                        <img src={logo} alt="L" className="w-6 h-6 object-contain dark:brightness-0 dark:invert" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Learning<span className="text-cyan-600 dark:text-cyan-400">Tracker</span></span>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-slate-400">
                    <a href="#" className="hover:text-cyan-400 transition-colors">Courses</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Resources</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Enterprise</a>
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-8 py-3.5 bg-slate-800/50 text-white rounded-2xl hover:bg-cyan-500 hover:text-slate-950 transition-all transform hover:scale-105 active:scale-95 shadow-xl font-black border border-slate-700 hover:border-cyan-400 backdrop-blur-sm"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-cyan-950/30 border border-cyan-800/50 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            v2.0 Next-Gen Platform
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black leading-[1] tracking-tighter text-slate-900 dark:text-white">
                            Master the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Tech Market.</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
                            Stop guessing. Start building. Follow premium visual roadmaps designed by elite engineers to take you from zero to expert.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full sm:w-auto px-12 py-5 bg-cyan-500 text-slate-950 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all shadow-xl group text-sm border-2 border-transparent"
                            >
                                Start Learning Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-12 py-5 bg-slate-900/50 border-2 border-slate-700 rounded-2xl font-black text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm backdrop-blur-sm">
                                View Curriculum
                            </button>
                        </div>
                        <div className="flex items-center gap-6 pt-10">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-black text-cyan-400 shadow-sm">
                                        {['TS', 'JS', 'PY', 'GO'][i-1]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trusted by <span className="text-slate-300 font-black">20,000+</span> elite developers</p>
                        </div>
                    </div>

                    <div className="relative group lg:block hidden">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-violet-600/20 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(6,182,212,0.1)] group-hover:border-cyan-500/50 transition-colors duration-500 backdrop-blur-xl">
                            {/* Abstract Code Grid */}
                            <div className="absolute inset-0 p-12 opacity-[0.3] pointer-events-none select-none">
                                <pre className="text-[12px] leading-relaxed text-cyan-600/50 font-mono font-bold">
                                    {`class Architect {
  constructor(vision) {
    this.vision = vision;
    this.stack = ['React', 'Next.js', 'Node'];
  }

  build() {
    return this.stack.map(tech => ({
      name: tech,
      status: 'Mastered'
    }));
  }
}

// Initialize learning path
const path = new Architect('FullStack');
path.build();`}
                                </pre>
                            </div>
                            <div className="relative z-10 w-full h-full bg-[#020617] rounded-3xl border border-slate-800 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700 shadow-2xl shadow-cyan-900/20 group-hover:border-cyan-500/50 overflow-hidden">
                                {/* Subtle Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
                                
                                {/* Animated Rings & Orbital Effects */}
                                <div className="relative flex items-center justify-center w-72 h-72">
                                    {/* Outer Dashed Orbit with Glowing Satellites */}
                                    <div className="absolute w-72 h-72 rounded-full border border-dashed border-slate-700/40 animate-[spin_15s_linear_infinite]"></div>
                                    <div className="absolute w-72 h-72 animate-[spin_15s_linear_infinite]">
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"></div>
                                        <div className="absolute bottom-1/4 -right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                                        <div className="absolute top-1/4 -left-1.5 w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_#a78bfa]"></div>
                                    </div>

                                    {/* Middle Solid Data Ring */}
                                    <div className="absolute w-56 h-56 rounded-full border-2 border-slate-800/80"></div>
                                    <div className="absolute w-56 h-56 rounded-full border-[3px] border-cyan-500/10 border-t-cyan-400 border-r-cyan-400/50 animate-[spin_8s_linear_infinite]"></div>
                                    
                                    {/* Inner Reverse Dashed Ring */}
                                    <div className="absolute w-44 h-44 rounded-full border border-dashed border-blue-500/30 animate-[spin_5s_linear_infinite_reverse]"></div>
                                    <div className="absolute w-44 h-44 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400/50 animate-[spin_5s_linear_infinite_reverse]"></div>

                                    {/* Floating Data Badges */}
                                    <div className="absolute -right-2 top-8 bg-slate-900/90 border border-cyan-500/30 px-3 py-2 rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(34,211,238,0.15)] z-20 animate-[bounce_3s_infinite]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                                            <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Optimizing</span>
                                        </div>
                                    </div>

                                    <div className="absolute -left-4 bottom-12 bg-slate-900/90 border border-blue-500/30 px-3 py-2 rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(59,130,246,0.15)] z-20 animate-[bounce_4s_infinite_reverse]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                            <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active Sync</span>
                                        </div>
                                    </div>
                                    
                                    {/* Core Data Center */}
                                    <div className="flex flex-col items-center justify-center z-10 mt-2">
                                        <div className="w-16 h-16 bg-slate-900/80 rounded-2xl border border-slate-700/50 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                                            <FiActivity className="text-4xl text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                        </div>
                                        <span className="text-5xl font-black text-white tracking-tighter">98<span className="text-2xl text-cyan-500">%</span></span>
                                        <span className="text-[10px] text-cyan-500/80 uppercase tracking-[0.3em] font-black mt-2">Mastery Rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Feature Grid */}
            <section className="bg-[#020617] border-t border-slate-800 py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <h2 className="text-xs font-black text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.3em]">Built for Professionals</h2>
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Everything you need to scale your skills.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
                                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center text-cyan-400 text-2xl mb-8 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm border border-slate-700 group-hover:border-transparent">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-black text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-300 transition-colors">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
