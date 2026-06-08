import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { walkthroughSteps, WalkthroughFrame } from './WalkthroughSteps';

const YOUTUBE_ID = import.meta.env.VITE_DEMO_VIDEO_YOUTUBE_ID?.trim() || '';

const VideoEmbed = () => (
    <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
        <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
            title="Learning Tracker walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
);

const NavButton = ({ onClick, disabled, children, primary = false, className = '' }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 rounded-full border font-bold transition-all disabled:opacity-30 disabled:pointer-events-none ${primary
            ? 'border-sky-400/50 bg-sky-500/30 text-white hover:bg-sky-500/50'
            : 'border-white/15 bg-white/5 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400/40'
        } ${className}`}
    >
        {children}
    </button>
);

const InteractiveWalkthrough = () => {
    const [step, setStep] = useState(0);
    const total = walkthroughSteps.length;
    const current = walkthroughSteps[step];

    const goPrev = () => setStep((s) => Math.max(0, s - 1));
    const goNext = () => setStep((s) => Math.min(total - 1, s + 1));

    return (
        <div className="space-y-4 sm:space-y-5">
            <div className="text-center md:text-left px-1">
                <p className="landing-nav-label text-[10px] landing-muted-text mb-1">
                    Step {current.step} of {total}
                </p>
                <h2 className="landing-display text-base sm:text-lg md:text-xl landing-heading-text">{current.title}</h2>
                <p className="text-xs sm:text-sm landing-body-text font-medium mt-1 leading-relaxed">{current.desc}</p>
            </div>

            <div className="hidden md:flex items-stretch gap-4">
                <NavButton onClick={goPrev} disabled={step === 0} className="shrink-0 self-center w-14 h-14 shadow-lg">
                    <FiChevronLeft size={24} />
                </NavButton>
                <div className="flex-1 min-w-0">
                    <WalkthroughFrame stepIndex={step} />
                </div>
                <NavButton onClick={goNext} disabled={step === total - 1} primary className="shrink-0 self-center w-14 h-14 shadow-lg shadow-sky-500/20">
                    <FiChevronRight size={24} />
                </NavButton>
            </div>

            <div className="md:hidden space-y-3">
                <WalkthroughFrame stepIndex={step} />
                <div className="flex items-center gap-2">
                    <NavButton onClick={goPrev} disabled={step === 0} className="flex-1 h-12 text-xs uppercase tracking-wider">
                        <FiChevronLeft size={18} /> Prev
                    </NavButton>
                    <span className="text-[10px] font-black landing-muted-text tabular-nums px-1 shrink-0">
                        {step + 1}/{total}
                    </span>
                    <NavButton onClick={goNext} disabled={step === total - 1} primary className="flex-1 h-12 text-xs uppercase tracking-wider">
                        Next <FiChevronRight size={18} />
                    </NavButton>
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-none -mx-1 px-1 pb-1">
                <div className="flex gap-1.5 sm:gap-2 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
                    {walkthroughSteps.map((s, i) => (
                        <button
                            key={s.step}
                            type="button"
                            onClick={() => setStep(i)}
                            className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide transition-all ${
                                i === step
                                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40'
                                    : 'bg-white/5 text-slate-500 border border-white/10 hover:border-white/20'
                            }`}
                        >
                            <span className="sm:hidden">{s.step}. {s.short}</span>
                            <span className="hidden sm:inline">{s.step}. {s.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const WalkthroughContent = () => (YOUTUBE_ID ? <VideoEmbed /> : <InteractiveWalkthrough />);

export default WalkthroughContent;
export { InteractiveWalkthrough };
