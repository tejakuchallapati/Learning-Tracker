const BrowserChrome = ({ title, children }) => (
    <div className="rounded-xl border border-slate-200 bg-slate-100 overflow-hidden shadow-inner">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-200/80 border-b border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-bold text-slate-500 truncate">{title}</span>
        </div>
        <div className="bg-white p-3 sm:p-4 pointer-events-none select-none">{children}</div>
    </div>
);

const DashboardPreview = () => (
    <BrowserChrome title="learning-tracker.app/dashboard">
        <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
                {[
                    { label: 'Study hours', value: '12.4h', color: 'bg-violet-500' },
                    { label: 'Active goals', value: '3', color: 'bg-blue-500' },
                    { label: 'Streak', value: '7d', color: 'bg-emerald-500' },
                ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-slate-100 p-2">
                        <div className={`w-6 h-6 rounded-md ${s.color} opacity-80 mb-2`} />
                        <p className="text-sm font-black text-slate-900">{s.value}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase">{s.label}</p>
                    </div>
                ))}
            </div>
            <div className="rounded-lg border border-slate-100 p-2 h-24 relative overflow-hidden">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Weekly intensity</p>
                <div className="absolute bottom-2 left-2 right-2 flex items-end gap-1 h-14">
                    {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-violet-200 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                </div>
            </div>
            <div className="rounded-lg border border-violet-100 bg-violet-50/50 p-2">
                <p className="text-xs font-black text-violet-700">Full Stack Development</p>
                <div className="mt-1 h-1.5 rounded-full bg-violet-100">
                    <div className="h-full w-[62%] rounded-full bg-violet-500" />
                </div>
            </div>
        </div>
    </BrowserChrome>
);

const RoadmapsPreview = () => (
    <BrowserChrome title="learning-tracker.app/courses">
        <div className="space-y-2">
            <p className="text-xs font-black text-slate-900">Mastery Tracks</p>
            <div className="flex gap-1">
                {['All', 'Frontend', 'AI'].map((c, i) => (
                    <span
                        key={c}
                        className={`text-[7px] font-black px-2 py-0.5 rounded ${i === 0 ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                    >
                        {c}
                    </span>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
                {[
                    { title: 'React Mastery', emoji: '⚛️' },
                    { title: 'Node.js Backend', emoji: '🟢' },
                    { title: 'Python & AI', emoji: '🐍' },
                    { title: 'DevOps Basics', emoji: '☁️' },
                ].map((c) => (
                    <div key={c.title} className="rounded-lg border border-slate-100 p-2">
                        <span className="text-base">{c.emoji}</span>
                        <p className="text-xs font-black text-slate-800 mt-1 leading-tight">{c.title}</p>
                    </div>
                ))}
            </div>
        </div>
    </BrowserChrome>
);

const DailyGoalsPreview = () => (
    <BrowserChrome title="learning-tracker.app/goals">
        <div className="space-y-2">
            <p className="text-xs font-black text-slate-900 flex items-center gap-1">Daily Objectives</p>
            {[
                { task: 'Complete React hooks module', done: true },
                { task: '30 min JavaScript practice', done: false },
                { task: 'Review yesterday\'s notes', done: false },
            ].map((g) => (
                <div key={g.task} className="flex items-center gap-2 rounded-lg border border-slate-100 px-2 py-1.5">
                    <span className={`w-3.5 h-3.5 rounded border-2 shrink-0 ${g.done ? 'bg-violet-600 border-violet-600' : 'border-slate-300'}`} />
                    <span className={`text-xs font-semibold ${g.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{g.task}</span>
                </div>
            ))}
            <div className="flex items-center justify-between rounded-lg bg-violet-50 border border-violet-100 px-2 py-1.5">
                <span className="text-xs font-bold text-violet-700">Current streak</span>
                <span className="text-sm font-black text-violet-600">7 days 🔥</span>
            </div>
        </div>
    </BrowserChrome>
);

const ResourcesPreview = () => (
    <BrowserChrome title="learning-tracker.app/bookmarks">
        <div className="space-y-2">
            <p className="text-xs font-black text-slate-900">Resource Library</p>
            {[
                { title: 'React Official Docs', tag: 'Documentation', color: 'text-violet-600 bg-violet-50' },
                { title: 'JavaScript.info', tag: 'Tutorial', color: 'text-fuchsia-600 bg-fuchsia-50' },
                { title: 'Fireship YouTube', tag: 'YouTube', color: 'text-rose-600 bg-rose-50' },
            ].map((b) => (
                <div key={b.title} className="flex items-center justify-between rounded-lg border border-slate-100 px-2 py-1.5">
                    <p className="text-xs font-bold text-slate-800 truncate pr-2">{b.title}</p>
                    <span className={`text-[7px] font-black px-1.5 py-0.5 rounded shrink-0 ${b.color}`}>{b.tag}</span>
                </div>
            ))}
        </div>
    </BrowserChrome>
);

const EmailRemindersPreview = () => (
    <BrowserChrome title="learning-tracker.app/settings">
        <div className="space-y-2">
            <p className="text-xs font-black text-slate-900">Email Reminders</p>
            {[
                { label: 'Daily goal emails', on: true },
                { label: 'Streak alerts', on: true },
                { label: 'Push notifications', on: false },
            ].map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-lg border border-slate-100 px-2 py-1.5">
                    <span className="text-xs font-semibold text-slate-700">{t.label}</span>
                    <span className={`w-8 h-4 rounded-full relative ${t.on ? 'bg-violet-600' : 'bg-slate-200'}`}>
                        <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow ${t.on ? 'right-0.5' : 'left-0.5'}`} />
                    </span>
                </div>
            ))}
            <div className="rounded-lg bg-blue-50 border border-blue-100 px-2 py-1.5 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">Reminder time</span>
                <span className="text-xs font-black text-blue-800">8:00 PM</span>
            </div>
        </div>
    </BrowserChrome>
);

const StudyNotesPreview = () => (
    <BrowserChrome title="learning-tracker.app/notes">
        <div className="space-y-2">
            <p className="text-xs font-black text-slate-900">Study Notes — Today</p>
            <div className="rounded-lg border border-slate-100 p-2">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">What I learned</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                    Covered useEffect cleanup patterns and custom hooks for API fetching...
                </p>
            </div>
            <div className="rounded-lg border border-slate-100 p-2">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tomorrow&apos;s plan</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                    Practice React Router nested routes and finish module quiz.
                </p>
            </div>
        </div>
    </BrowserChrome>
);

const TopicVideosPreview = () => (
    <BrowserChrome title="learning-tracker.app/roadmap/react/0/0">
        <div className="space-y-2">
            <p className="text-xs font-black text-slate-900">Expert video sources</p>
            <p className="text-[10px] font-semibold text-slate-500">Curated YouTube channels for each topic in your roadmap.</p>
            <div className="grid grid-cols-2 gap-2">
                {[
                    { name: 'Fireship', tag: 'YouTube' },
                    { name: 'Traversy Media', tag: 'YouTube' },
                ].map((c) => (
                    <div key={c.name} className="flex items-center gap-2 rounded-lg border border-rose-100 bg-rose-50/50 p-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0">
                            <span className="text-xs">▶</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-800 truncate">{c.name}</p>
                            <p className="text-[8px] font-bold text-rose-600 uppercase">{c.tag}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </BrowserChrome>
);

const AiMentorPreview = () => (
    <BrowserChrome title="learning-tracker.app — AI Mentor">
        <div className="space-y-2">
            <div className="rounded-lg bg-violet-50 border border-violet-100 px-2 py-1.5">
                <p className="text-[10px] font-semibold text-violet-800">Ask anything about this topic — concepts, code, or interview prep.</p>
            </div>
            <div className="rounded-lg bg-slate-100 px-2 py-1.5">
                <p className="text-[10px] font-bold text-slate-500 mb-0.5">You</p>
                <p className="text-xs text-slate-700">Explain React hooks simply</p>
            </div>
            <div className="rounded-lg bg-violet-600/10 border border-violet-100 px-2 py-1.5">
                <p className="text-[10px] font-bold text-violet-600 mb-0.5">AI Mentor</p>
                <p className="text-xs text-slate-700">Hooks let you use state in function components…</p>
            </div>
        </div>
    </BrowserChrome>
);

const DailyRemindersPreview = () => (
    <BrowserChrome title="learning-tracker.app/goals">
        <div className="space-y-2">
            <p className="text-xs font-black text-slate-900">Daily goals + bell</p>
            {[
                { task: 'Watch roadmap video', bell: true },
                { task: 'Complete one module', bell: true },
            ].map((g) => (
                <div key={g.task} className="flex items-center justify-between rounded-lg border border-slate-100 px-2 py-1.5">
                    <span className="text-xs font-semibold text-slate-700 truncate pr-2">{g.task}</span>
                    <span className="text-rose-500 text-xs shrink-0">🔔</span>
                </div>
            ))}
            <div className="rounded-lg bg-blue-50 border border-blue-100 px-2 py-1.5 text-center">
                <p className="text-[10px] font-bold text-blue-700">Email reminder if incomplete</p>
            </div>
        </div>
    </BrowserChrome>
);

const previews = {
    dashboard: DashboardPreview,
    roadmaps: RoadmapsPreview,
    'daily-goals': DailyGoalsPreview,
    'topic-videos': TopicVideosPreview,
    'ai-mentor': AiMentorPreview,
    'daily-reminders': DailyRemindersPreview,
    resources: ResourcesPreview,
    'email-reminders': EmailRemindersPreview,
    'study-notes': StudyNotesPreview,
};

const ModulePreview = ({ moduleId }) => {
    const Preview = previews[moduleId];
    if (!Preview) return null;
    return <Preview />;
};

export default ModulePreview;
