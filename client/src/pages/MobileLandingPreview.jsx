import { FiArrowRight } from 'react-icons/fi';
import LandingModuleIcon from '../components/landing/LandingModuleIcon';

const modules = [
    { id: 'dashboard', title: 'Dashboard', desc: 'See active learning paths and goal progress in one place.' },
    { id: 'roadmaps', title: 'Roadmaps', desc: 'Browse structured course roadmaps across development, AI, frontend, and more.' },
    { id: 'daily-goals', title: 'Daily Goals', desc: 'Set daily objectives, build streaks, and get email reminders for incomplete tasks.' },
    { id: 'resources', title: 'Resources', desc: 'Organize docs, tutorials, videos, and tools in your personal resource library.' },
    { id: 'email-reminders', title: 'Email Reminders', desc: 'Get daily email nudges for incomplete goals so you stay consistent without checking the app.' },
    { id: 'study-notes', title: 'Study Notes', desc: 'Save daily learnings and future plans — synced securely to your account.' },
];

const workflowSteps = [
    { step: '01', label: 'Sign up', desc: 'Create your free account' },
    { step: '02', label: 'Pick a roadmap', desc: 'Choose your learning path' },
    { step: '03', label: 'Set daily goals', desc: 'Build streaks & habits' },
    { step: '04', label: 'Track progress', desc: 'Dashboard & resources' },
];

/**
 * Dev preview — open /preview/mobile to see phone layout before committing.
 * Not linked in production nav; safe to remove after review.
 */
const MobileLandingPreview = () => (
    <div className="min-h-screen landing-page-bg flex flex-col items-center justify-center gap-6 p-4 sm:p-8">
        <div className="text-center max-w-lg">
            <p className="landing-accent-text landing-nav-label text-xs mb-1">Preview only — not committed yet</p>
            <h1 className="landing-display text-lg landing-heading-text">Mobile landing preview</h1>
            <p className="landing-body-text text-xs mt-2">
                This is how About Us + Workflow look on a ~390px phone. Scroll inside the frame.
            </p>
        </div>

        {/* Phone frame */}
        <div
            className="relative shrink-0 rounded-[2.75rem] border-[10px] border-slate-800 bg-slate-950 shadow-2xl shadow-black/50 overflow-hidden"
            style={{ width: 390, height: 780 }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-950 rounded-b-2xl z-20 pointer-events-none" />
            <div className="h-full overflow-y-auto overflow-x-hidden landing-page-bg pt-10 pb-8 px-4">
                <section>
                    <div className="text-center mb-6">
                        <h2 className="landing-display text-2xl landing-heading-text mb-2">About us</h2>
                        <p className="landing-body-text text-xs leading-relaxed">
                            Learning Tracker is a free app for self-learners — plan roadmaps, hit daily goals, save notes,
                            and get email reminders.
                        </p>
                        <p className="landing-accent-text landing-nav-label text-xs mt-2">Tap any module to preview</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 px-4 w-full">
                        {modules.map((mod, index) => (
                            <div key={mod.id} className="w-full flex flex-col items-center">
                                <article
                                    style={{ animationDelay: `${index * 0.35}s` }}
                                    className="group relative rounded-2xl landing-card-dark flex flex-col cursor-default overflow-hidden w-[min(calc(100%-2rem),16.5rem)] aspect-square mx-auto landing-module-float border border-white/10 hover:border-sky-400/40"
                                >
                                    <div className="p-4 flex flex-col h-full min-h-0 justify-between">
                                        <div className="min-w-0">
                                            <span className="text-[9px] font-black landing-muted-text tabular-nums mb-1.5 block">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <div className="mb-2 w-fit">
                                                <LandingModuleIcon moduleId={mod.id} size="mobile" />
                                            </div>
                                            <h3 className="landing-display text-xs landing-heading-text mb-1.5 !tracking-tight leading-tight break-words line-clamp-2">
                                                {mod.title}
                                            </h3>
                                            <p className="text-[11px] landing-body-text font-medium leading-snug line-clamp-3">
                                                {mod.desc}
                                            </p>
                                        </div>
                                        <span className="landing-nav-label text-[9px] landing-accent-text flex items-center gap-1 shrink-0 mt-1.5">
                                            Tap to preview <FiArrowRight size={10} />
                                        </span>
                                    </div>
                                </article>
                                {index < modules.length - 1 && (
                                    <div className="flex justify-center py-0.5" aria-hidden>
                                        <span className="w-px h-2 bg-white/12" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-10 pt-8 border-t border-white/10">
                    <div className="text-center mb-6">
                        <p className="landing-nav-label text-xs text-white mb-1.5 tracking-[0.2em]">Workflow</p>
                        <h3 className="landing-display text-xl landing-heading-text mb-2 leading-tight">
                            Start here, <span className="landing-accent-text">stay consistent</span>
                        </h3>
                        <p className="landing-body-text text-xs leading-relaxed">
                            Sign up once, follow four simple steps, and turn scattered study sessions into a routine that lasts.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2.5 max-w-md mx-auto">
                        {workflowSteps.map((item, index) => (
                            <div key={item.step}>
                                <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-[#08080d] border-2 border-sky-500 shrink-0" />
                                            <span className="landing-display text-sm landing-accent-text">{item.step}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold landing-heading-text">{item.label}</p>
                                            <p className="text-xs landing-muted-text mt-0.5 leading-snug">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                {index < workflowSteps.length - 1 && (
                                    <div className="flex justify-center py-0.5">
                                        <span className="w-px h-2.5 bg-white/15" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>

        <p className="landing-muted-text text-xs text-center max-w-sm">
            Live app: run <code className="text-sky-400">npm run dev</code> → open{' '}
            <a href="/" className="text-sky-400 underline">localhost:3000</a> and use browser DevTools → iPhone size.
        </p>
    </div>
);

export default MobileLandingPreview;
