/** Full-format mock screens for the step-by-step product walkthrough */

import Logo from '../brand/Logo';

const Frame = ({ path, children }) => (
    <div className="w-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-100 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-200/90 border-b border-slate-300/50">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400 shrink-0" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 shrink-0" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="ml-1 sm:ml-2 text-[9px] sm:text-[11px] font-bold text-slate-500 truncate min-w-0">{path}</span>
        </div>
        <div className="bg-white min-h-[min(58vh,420px)] sm:min-h-[460px] md:min-h-[480px] p-3 sm:p-5 md:p-6 overflow-y-auto">
            {children}
        </div>
    </div>
);

const TapHint = ({ label, className = '' }) => (
    <div className={`flex items-center gap-1.5 sm:gap-2 text-sky-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider animate-pulse ${className}`}>
        <span className="text-base sm:text-lg leading-none">→</span>
        <span>{label}</span>
    </div>
);

export const walkthroughSteps = [
    {
        step: 1,
        short: 'Login',
        title: 'Sign in',
        desc: 'Open the login page and sign in with email or Google.',
        path: 'learning-tracker.app/login',
        Screen: () => (
            <div className="flex flex-col items-center justify-center min-h-[min(52vh,380px)] py-4 sm:py-6">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-4 sm:mb-6">
                        <Logo className="w-12 h-12 sm:w-14 sm:h-14 mb-2 sm:mb-3 shadow-lg shadow-sky-200/80 rounded-2xl mx-auto" />
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Welcome back</h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">Sign in to continue</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-lg space-y-3 sm:space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Email</label>
                            <div className="h-10 sm:h-11 rounded-xl bg-slate-50 border border-slate-200 px-3 flex items-center text-xs sm:text-sm text-slate-400">you@email.com</div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Password</label>
                            <div className="h-10 sm:h-11 rounded-xl bg-slate-50 border border-slate-200 px-3 flex items-center text-xs sm:text-sm text-slate-400">••••••••</div>
                        </div>
                        <div className="relative pt-1 sm:pt-2">
                            <button type="button" className="w-full h-11 sm:h-12 bg-sky-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-200 ring-2 ring-sky-400 ring-offset-2">
                                Sign In →
                            </button>
                            <TapHint label="Tap sign in" className="justify-center mt-2 sm:mt-3" />
                        </div>
                        <div className="h-px bg-slate-100" />
                        <button type="button" className="w-full h-10 sm:h-11 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-600">Continue with Google</button>
                    </div>
                </div>
            </div>
        ),
    },
    {
        step: 2,
        short: 'Home',
        title: 'Dashboard',
        desc: 'After login you land on your dashboard — stats and active paths.',
        path: 'learning-tracker.app/dashboard',
        Screen: () => (
            <div className="space-y-3 sm:space-y-4">
                <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
                    <p className="text-[10px] sm:text-xs font-black text-sky-600 uppercase tracking-widest mb-1">Adaptive Roadmap</p>
                    <h2 className="text-base sm:text-xl font-black text-slate-900 leading-tight">Fast-Track Your Learning Goal</h2>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                        { label: 'Study', value: '12h' },
                        { label: 'Week', value: '4h' },
                        { label: 'Done', value: '62%' },
                    ].map((s) => (
                        <div key={s.label} className="rounded-lg sm:rounded-xl border border-slate-100 p-2 sm:p-3 bg-white shadow-sm text-center">
                            <p className="text-base sm:text-lg font-black text-slate-900">{s.value}</p>
                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">{s.label}</p>
                        </div>
                    ))}
                </div>
                <div className="rounded-xl border border-slate-100 p-3 sm:p-4 h-20 sm:h-28 bg-gradient-to-t from-sky-50 to-white flex items-end gap-1">
                    {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-sky-400 rounded-t opacity-80" style={{ height: `${h}%` }} />
                    ))}
                </div>
                <TapHint label="Your home base" />
            </div>
        ),
    },
    {
        step: 3,
        short: 'Path',
        title: 'Add a learning goal',
        desc: 'Pick a course and add a long-term path to your dashboard.',
        path: 'learning-tracker.app/dashboard',
        Screen: () => (
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span className="text-sky-600">◎</span> Fast-Track Goal
                </h3>
                <div className="space-y-3 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 bg-white shadow-sm">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase">Course</label>
                        <div className="mt-1 h-10 sm:h-11 rounded-xl bg-sky-50 border-2 border-sky-300 px-3 flex items-center text-xs sm:text-sm font-bold text-slate-800 ring-2 ring-sky-400 ring-offset-1">
                            React Mastery ▾
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase">Target date</label>
                        <div className="mt-1 h-10 sm:h-11 rounded-xl bg-slate-50 border border-slate-200 px-3 flex items-center text-xs sm:text-sm font-bold text-slate-700">Aug 30, 2026</div>
                    </div>
                    <button type="button" className="w-full h-11 sm:h-12 bg-slate-900 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-2xl ring-2 ring-sky-400 ring-offset-2">
                        Add to active paths
                    </button>
                    <TapHint label="Add your path" className="justify-center" />
                </div>
            </div>
        ),
    },
    {
        step: 4,
        short: 'Daily',
        title: 'Set daily goals',
        desc: 'Go to Goals — add today’s tasks and tick them off as you learn.',
        path: 'learning-tracker.app/goals',
        Screen: () => (
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">Daily Objectives</h3>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">7d streak 🔥</span>
                </div>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex-1 h-10 sm:h-11 rounded-xl bg-slate-50 border-2 border-sky-300 px-3 flex items-center text-xs sm:text-sm text-slate-500 ring-2 ring-sky-400 ring-offset-1">
                        Watch 1 roadmap video…
                    </div>
                    <button type="button" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 font-bold text-lg">+</button>
                </form>
                <TapHint label="Add daily goal" />
                <div className="space-y-2 pt-1">
                    {[
                        { task: 'Complete React hooks module', done: true },
                        { task: '30 min practice', done: false },
                        { task: 'Review notes', done: false },
                    ].map((g) => (
                        <div key={g.task} className="flex items-center gap-2 sm:gap-3 rounded-xl border border-slate-100 px-3 py-2.5 sm:py-3 bg-white">
                            <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 shrink-0 flex items-center justify-center text-[10px] ${g.done ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'}`}>
                                {g.done ? '✓' : ''}
                            </span>
                            <span className={`text-xs sm:text-sm font-semibold flex-1 min-w-0 ${g.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{g.task}</span>
                        </div>
                    ))}
                </div>
                <TapHint label="Check off tasks" />
            </div>
        ),
    },
    {
        step: 5,
        short: 'Bell',
        title: 'Turn on reminders',
        desc: 'Tap the bell on any daily goal — you’ll get an email if it’s still incomplete.',
        path: 'learning-tracker.app/goals',
        Screen: () => (
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
                <h3 className="text-base sm:text-lg font-black text-slate-900">Daily goals + bell</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Bell on = included in your daily email reminder.</p>
                <div className="space-y-2">
                    {[
                        { task: 'Watch roadmap video', bell: true, highlight: true },
                        { task: 'Complete one module', bell: true, highlight: false },
                        { task: 'Read docs (optional)', bell: false, highlight: false },
                    ].map((g) => (
                        <div
                            key={g.task}
                            className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 sm:py-3 ${g.highlight ? 'border-sky-300 bg-sky-50 ring-2 ring-sky-400 ring-offset-1' : 'border-slate-100 bg-white'}`}
                        >
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{g.task}</span>
                            <button
                                type="button"
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${g.bell ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400'}`}
                                aria-label="Toggle reminder"
                            >
                                🔔
                            </button>
                        </div>
                    ))}
                </div>
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 sm:p-4 text-center">
                    <p className="text-xs sm:text-sm font-bold text-blue-800">📧 Daily email at 8 PM IST</p>
                    <p className="text-[10px] sm:text-xs text-blue-600 font-medium mt-1">Only for goals with bell enabled</p>
                </div>
                <TapHint label="Tap bell to remind" className="justify-center" />
            </div>
        ),
    },
    {
        step: 6,
        short: 'Map',
        title: 'Open your roadmap',
        desc: 'Select a path and pick a topic to study.',
        path: 'learning-tracker.app/roadmap/react',
        Screen: () => (
            <div className="space-y-3 sm:space-y-4">
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">React Mastery</p>
                <div className="space-y-2 sm:space-y-3">
                    {[
                        { n: '01', title: 'React fundamentals', done: true },
                        { n: '02', title: 'Hooks & state', active: true },
                        { n: '03', title: 'Routing & data', done: false },
                    ].map((t) => (
                        <div
                            key={t.n}
                            className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${t.active ? 'border-sky-400 bg-sky-50 ring-2 ring-sky-400 ring-offset-1' : 'border-slate-100 bg-white'}`}
                        >
                            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-100 text-sky-700 font-black flex items-center justify-center text-xs sm:text-sm shrink-0">{t.n}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm sm:text-base font-black text-slate-900 leading-tight">{t.title}</p>
                                {t.active && <p className="text-[10px] sm:text-xs text-sky-600 font-bold mt-0.5">Open topic →</p>}
                            </div>
                            {t.done && <span className="text-emerald-500 text-sm font-bold shrink-0">✓</span>}
                        </div>
                    ))}
                </div>
                <TapHint label="Select a topic" />
            </div>
        ),
    },
    {
        step: 7,
        short: 'Video',
        title: 'Watch topic videos',
        desc: 'Curated YouTube channels open right from each topic.',
        path: 'learning-tracker.app/roadmap/react/1/0',
        Screen: () => (
            <div className="space-y-3 sm:space-y-4 flex flex-col">
                <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">Hooks &amp; State</h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Expert video sources</p>
                </div>
                <div className="space-y-2 sm:space-y-3 flex-1">
                    {[
                        { name: 'Fireship', highlight: true },
                        { name: 'Traversy Media', highlight: false },
                        { name: 'Web Dev Simplified', highlight: false },
                    ].map((c) => (
                        <div
                            key={c.name}
                            className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border ${c.highlight ? 'border-rose-300 bg-rose-50/50 ring-2 ring-sky-400 ring-offset-1' : 'border-slate-200 bg-slate-50'}`}
                        >
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center text-lg shrink-0 shadow-md">▶</div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm sm:text-base font-black text-slate-900 truncate">{c.name}</p>
                                <p className="text-[10px] font-bold text-rose-600 uppercase">Start workshop</p>
                            </div>
                        </div>
                    ))}
                </div>
                <TapHint label="Watch & learn" />
            </div>
        ),
    },
    {
        step: 8,
        short: 'AI',
        title: 'Ask the AI mentor',
        desc: 'Stuck? Open AI Mentor on any topic and ask questions.',
        path: 'learning-tracker.app — AI Mentor',
        Screen: () => (
            <div className="flex flex-col min-h-[min(50vh,360px)]">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 border-b border-slate-100">
                    <div>
                        <p className="text-[10px] sm:text-xs font-black text-sky-600 uppercase">AI Mentor</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-700">Hooks &amp; State</p>
                    </div>
                    <button type="button" className="w-full xs:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white text-xs font-black ring-2 ring-sky-400 ring-offset-2">
                        ⚡ Ask AI Mentor
                    </button>
                </div>
                <div className="flex-1 space-y-2 sm:space-y-3">
                    <div className="rounded-xl sm:rounded-2xl bg-sky-50 border border-sky-100 p-3 sm:p-4 max-w-[95%]">
                        <p className="text-[10px] font-bold text-sky-600 mb-1">AI Mentor</p>
                        <p className="text-xs sm:text-sm text-slate-700">Ask me anything about this topic!</p>
                    </div>
                    <div className="rounded-xl sm:rounded-2xl bg-slate-100 p-3 sm:p-4 max-w-[90%] ml-auto">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">You</p>
                        <p className="text-xs sm:text-sm text-slate-800">Explain useEffect simply</p>
                    </div>
                    <div className="rounded-xl sm:rounded-2xl bg-sky-600/10 border border-sky-100 p-3 sm:p-4 max-w-[95%]">
                        <p className="text-[10px] font-bold text-sky-600 mb-1">AI Mentor</p>
                        <p className="text-xs sm:text-sm text-slate-700">Cleanup prevents memory leaks when…</p>
                    </div>
                </div>
                <TapHint label="Get instant help" className="justify-center mt-3" />
            </div>
        ),
    },
];

export const WalkthroughFrame = ({ stepIndex }) => {
    const { path, Screen } = walkthroughSteps[stepIndex];
    return (
        <Frame path={path}>
            <Screen />
        </Frame>
    );
};
