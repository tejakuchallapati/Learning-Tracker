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
        <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white overflow-hidden relative transition-colors duration-500">
            {/* Background Glows - Refined for Ghost White */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-100/50 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-red-100/40 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-red-50/30 rounded-full blur-[120px]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 px-8 py-10 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-xl shadow-red-100 group-hover:scale-105 transition-transform duration-300 border border-black">
                        <img src={logo} alt="L" className="w-6 h-6 object-contain brightness-0 invert" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-black">Learning<span className="text-red-600">Tracker</span></span>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-gray-600">
                    <a href="#" className="hover:text-red-600 transition-colors">Courses</a>
                    <a href="#" className="hover:text-red-600 transition-colors">Resources</a>
                    <a href="#" className="hover:text-red-600 transition-colors">Enterprise</a>
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-8 py-3.5 bg-black text-white rounded-2xl hover:bg-red-600 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-gray-200 font-black border-2 border-transparent hover:border-black"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-black rounded-full text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                            </span>
                            v2.0 Next-Gen Platform
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black leading-[1] tracking-tighter text-black">
                            Master the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black">Tech Market.</span>
                        </h1>
                        <p className="text-xl text-gray-800 max-w-xl leading-relaxed font-bold">
                            Stop guessing. Start building. Follow premium visual roadmaps designed by elite engineers to take you from zero to expert.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full sm:w-auto px-12 py-5 bg-red-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-700 hover:shadow-red-200 transition-all shadow-2xl shadow-red-100 group text-sm border-2 border-transparent hover:border-black"
                            >
                                Start Learning Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-12 py-5 bg-white border-2 border-black rounded-2xl font-black text-black hover:bg-black hover:text-white transition-all text-sm shadow-xl shadow-gray-100">
                                View Curriculum
                            </button>
                        </div>
                        <div className="flex items-center gap-6 pt-10">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-black flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                                        {['TS', 'JS', 'PY', 'GO'][i-1]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Trusted by <span className="text-black font-black">20,000+</span> elite developers</p>
                        </div>
                    </div>

                    <div className="relative group lg:block hidden">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-red-500/20 via-red-500/10 to-red-600/20 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-white border-2 border-black rounded-[2.5rem] p-12 aspect-square flex items-center justify-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(220,38,38,0.15)] group-hover:border-red-600 transition-colors duration-500">
                            {/* Abstract Code Grid */}
                            <div className="absolute inset-0 p-12 opacity-[0.08] pointer-events-none select-none">
                                <pre className="text-[12px] leading-relaxed text-black font-mono font-bold">
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
                            <div className="relative z-10 w-full h-full bg-black rounded-3xl border border-red-600 flex items-center justify-center text-9xl transform group-hover:scale-105 transition-transform duration-700 shadow-2xl shadow-red-600/20">
                                <span className="animate-rocket drop-shadow-[0_20px_50px_rgba(220,38,38,0.3)]">🚀</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Feature Grid */}
            <section className="bg-white border-t-2 border-black py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.3em]">Built for Professionals</h2>
                        <h3 className="text-4xl font-black text-black tracking-tight">Everything you need to scale your skills.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-white border-2 border-black hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white text-2xl mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm border border-transparent group-hover:border-black">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-black text-black mb-4 tracking-tight group-hover:text-red-600 transition-colors">{f.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-bold">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
