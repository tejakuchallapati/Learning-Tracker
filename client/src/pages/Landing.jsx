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
        <div className="min-h-screen bg-[#3a0000] text-white font-sans selection:bg-red-500 selection:text-white overflow-hidden relative transition-colors duration-500">
            {/* Animated Shaded Red Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent opacity-100"></div>
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-red-600/40 rounded-full blur-[150px] animate-pulse-subtle mix-blend-screen"></div>
                <div className="absolute top-[30%] -right-[20%] w-[70%] h-[70%] bg-red-800/60 rounded-full blur-[150px] animate-pulse mix-blend-multiply"></div>
                <div className="absolute -bottom-[30%] left-[20%] w-[50%] h-[50%] bg-rose-600/30 rounded-full blur-[130px] animate-spin-slow mix-blend-overlay"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 px-8 py-10 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                        <img src={logo} alt="L" className="w-6 h-6 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(20%) sepia(90%) saturate(3000%) hue-rotate(350deg) brightness(95%) contrast(100%)' }} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">Learning<span className="text-red-200">Tracker</span></span>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-red-100">
                    <a href="#" className="hover:text-white transition-colors">Courses</a>
                    <a href="#" className="hover:text-white transition-colors">Resources</a>
                    <a href="#" className="hover:text-white transition-colors">Enterprise</a>
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-8 py-3.5 bg-white text-red-600 rounded-2xl hover:bg-black hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-red-900 font-black"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-700/50 border border-red-400 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            v2.0 Next-Gen Platform
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black leading-[1] tracking-tighter text-white">
                            Master the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-300">Tech Market.</span>
                        </h1>
                        <p className="text-xl text-red-100 max-w-xl leading-relaxed font-bold">
                            Stop guessing. Start building. Follow premium visual roadmaps designed by elite engineers to take you from zero to expert.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full sm:w-auto px-12 py-5 bg-black text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-900 hover:shadow-red-900 transition-all shadow-2xl group text-sm border-2 border-transparent"
                            >
                                Start Learning Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-white/50 rounded-2xl font-black text-white hover:bg-white hover:text-red-600 transition-all text-sm">
                                View Curriculum
                            </button>
                        </div>
                        <div className="flex items-center gap-6 pt-10">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-red-600 bg-white flex items-center justify-center text-[10px] font-black text-red-600 shadow-sm">
                                        {['TS', 'JS', 'PY', 'GO'][i-1]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-red-200 uppercase tracking-widest">Trusted by <span className="text-white font-black">20,000+</span> elite developers</p>
                        </div>
                    </div>

                    <div className="relative group lg:block hidden">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-red-800 to-red-500 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-red-700 border border-red-500 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                            {/* Abstract Code Grid */}
                            <div className="absolute inset-0 p-12 opacity-[0.2] pointer-events-none select-none">
                                <pre className="text-[12px] leading-relaxed text-red-100 font-mono font-bold">
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
                            <div className="relative z-10 w-full h-full bg-red-900 rounded-3xl border border-red-400 flex items-center justify-center text-9xl transform group-hover:scale-105 transition-transform duration-700 shadow-inner">
                                <span className="animate-rocket drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]">🚀</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Feature Grid */}
            <section className="bg-red-700 border-t border-red-500 py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <h2 className="text-xs font-black text-red-300 uppercase tracking-[0.3em]">Built for Professionals</h2>
                        <h3 className="text-4xl font-black text-white tracking-tight">Everything you need to scale your skills.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-red-600 border border-red-400 hover:border-white hover:shadow-2xl hover:shadow-red-900/50 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-red-600 text-2xl mb-8 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm border border-transparent">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-black text-white mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-red-100 text-sm leading-relaxed font-bold">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
