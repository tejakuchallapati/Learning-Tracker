import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft } from 'react-icons/fi';
import { Header } from '../components/ui/header-2';
import WalkthroughContent from '../components/landing/InteractiveWalkthrough';

const AppWalkthrough = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen landing-page-bg font-body selection:bg-sky-500/30 overflow-x-hidden">
            <div className="relative z-[1]">
                <div className="pt-10 md:pt-12 px-4 sm:px-6">
                    <Header />
                </div>

                <main className="max-w-5xl mx-auto px-3 sm:px-5 md:px-6 py-8 sm:py-10 md:py-14 pb-16">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-xs font-bold landing-muted-text hover:text-sky-300 transition-colors mb-6 sm:mb-8"
                    >
                        <FiChevronLeft size={16} /> Back to home
                    </button>

                    <div className="text-center mb-6 sm:mb-8 md:mb-10">
                        <p className="landing-nav-label text-[10px] sm:text-xs landing-accent-text mb-2">Interactive preview</p>
                        <h1 className="landing-display text-2xl sm:text-3xl md:text-4xl landing-heading-text mb-2 sm:mb-3 leading-tight">
                            See the app in action
                        </h1>
                        <p className="text-xs sm:text-sm landing-body-text font-medium max-w-lg mx-auto leading-relaxed">
                            Walk through login, goals, roadmaps, videos, and AI mentor — tap Next on each step.
                        </p>
                    </div>

                    <WalkthroughContent />

                    <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="landing-cta w-full sm:w-auto px-8 py-3 rounded-full landing-nav-label text-xs text-white flex items-center justify-center gap-2"
                        >
                            Create free account <FiArrowRight size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-8 py-3 rounded-full landing-nav-label text-xs landing-body-text border border-white/15 hover:border-sky-400/40 hover:text-sky-300 transition-colors"
                        >
                            I already have an account
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppWalkthrough;
