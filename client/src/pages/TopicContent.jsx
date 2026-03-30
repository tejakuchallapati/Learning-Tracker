import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/CourseData';
import { FiChevronLeft, FiBookOpen, FiArrowRight, FiCheckCircle, FiPlay, FiSearch, FiMessageSquare, FiLayout, FiX, FiSend, FiZap } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

const TopicContent = () => {
    const { courseId, stepIdx, topicIdx } = useParams();
    const navigate = useNavigate();
    const currentKey = `completed-${courseId}-${stepIdx}-${topicIdx}`;
    const [isCompleted, setIsCompleted] = useState(() => localStorage.getItem(currentKey) === 'true');
    const [prevKey, setPrevKey] = useState(currentKey);

    // AI Mentor State
    const [mentorOpen, setMentorOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const messagesEndRef = useRef(null);

    if (currentKey !== prevKey) {
        setPrevKey(currentKey);
        setIsCompleted(localStorage.getItem(currentKey) === 'true');
    }

    const course = courses.find(c => c.id === courseId);
    const step = course?.roadmap[parseInt(stepIdx)];
    const topic = step?.topics?.[parseInt(topicIdx)];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleComplete = () => {
        const newState = !isCompleted;
        setIsCompleted(newState);
        localStorage.setItem(currentKey, newState.toString());
    };

    const openMentor = () => {
        setMentorOpen(true);
        if (messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: `👋 Hi! I'm your AI Mentor for **${topic?.title}**. Ask me anything about this topic — concepts, code examples, interview questions, or debugging tips!`
            }]);
        }
    };

    const getSmartResponse = (question, topicTitle, topicDetail) => {
        const q = question.toLowerCase();
        if (q.includes('explain') || q.includes('what')) {
            return `**${topicTitle}** is a foundational concept in modern development.\n\n${topicDetail}\n\n**Key points to remember:**\n• It solves a specific problem in software design\n• Used widely in production systems\n• Has clear advantages over older approaches\n\nWould you like a code example or more details?`;
        }
        if (q.includes('code') || q.includes('example')) {
            return `Here's a practical example for **${topicTitle}**:\n\n\`\`\`javascript\n// ${topicTitle} - Practical Example\nconst example = () => {\n  // Core implementation pattern\n  console.log('${topicTitle} in action!');\n  return { success: true };\n};\n\nexample();\n\`\`\`\n\nThis demonstrates the core pattern. Want me to explain it step by step?`;
        }
        if (q.includes('interview') || q.includes('question')) {
            return `**Top Interview Questions for ${topicTitle}:**\n\n1. What problem does ${topicTitle} solve?\n2. How does it compare to alternatives?\n3. Give a real-world use case\n4. What are the performance implications?\n5. How would you implement it from scratch?\n\nWould you like detailed answers to any of these?`;
        }
        return `Great question about **${topicTitle}**! ${topicDetail}\n\nHere's what's most important to understand:\n\n• Master the fundamentals before moving to advanced patterns\n• Practice with real projects to solidify understanding\n• Study industry best practices and common pitfalls\n\nIs there a specific aspect you'd like to explore deeper?`;
    };

    const sendMessage = async () => {
        if (!input.trim() || aiLoading) return;
        const userMsg = { role: 'user', content: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setAiLoading(true);
        // Simulate AI response with smart fallback
        setTimeout(() => {
            const reply = getSmartResponse(userMsg.content, topic?.title || '', topic?.detail || '');
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            setAiLoading(false);
        }, 1200);
    };

    if (!topic) return (
        <div className="p-20 text-center animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-800">Concept not found</h2>
            <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 font-bold hover:underline">Go Back</button>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32 relative">
            {/* Header */}
            <div className="space-y-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 text-xs font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-all group"
                >
                    <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Roadmap
                </button>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">{topic.title}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-6 text-xl leading-relaxed font-medium">{topic.detail}</p>
                    </div>
                    <div className="flex flex-col gap-4 shrink-0">
                        <button 
                            onClick={handleComplete}
                            className={`px-10 py-5 rounded-xl font-black text-sm transition-all flex items-center gap-3 shadow-2xl btn-hover-scale ${isCompleted ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100 border border-emerald-100' : 'bg-slate-900 text-white shadow-slate-200 hover:bg-indigo-600'}`}
                        >
                            {isCompleted ? <><FiCheckCircle size={20} /> Accomplished</> : 'Mark as Completed'}
                        </button>
                        <button 
                            onClick={openMentor}
                            className="px-10 py-5 rounded-xl font-black text-sm transition-all flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-2xl shadow-indigo-300 btn-hover-scale hover:from-violet-700 hover:to-indigo-700"
                        >
                            <FiZap size={20} /> Ask AI Mentor
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Rendering Zone */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden premium-shadow">
                <div className="p-12 md:p-20 space-y-16 lg:space-y-24">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <FiBookOpen /> Architecture &amp; Logic
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">Mastering the Core</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-[1.8] text-lg font-medium">
                            {topic.deepContent?.description || 'In-depth technical analysis focusing on architecture, implementation patterns, and industry best practices. This section covers the fundamental internal mechanics and how this technology integrates into modern production environments.'}
                        </div>
                    </div>

                    {topic.deepContent?.table && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl"><FiLayout size={20} /></div>
                                Performance &amp; Structure
                            </h3>
                            <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 p-2">
                                <table className="w-full text-left border-collapse dark:text-slate-300">
                                    <thead>
                                        <tr>
                                            {topic.deepContent.table.headers.map((h, i) => (
                                                <th key={i} className="px-8 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 uppercase tracking-widest">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topic.deepContent.table.rows.map((row, i) => (
                                            <tr key={i} className="hover:bg-white dark:hover:bg-slate-800 transition-all group border-b border-slate-50/50 dark:border-slate-800/50 last:border-none">
                                                {row.map((cell, j) => (
                                                    <td key={j} className="px-8 py-6 text-sm font-bold text-slate-700 dark:text-slate-400">{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {topic.deepContent?.code && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                                <div className="p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl"><FiSearch size={20} /></div>
                                Implementation Snippet
                            </h3>
                            <div className="bg-slate-900 rounded-2xl p-10 shadow-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">standard_implementation.js</span>
                                </div>
                                <pre className="text-sm md:text-base font-mono leading-loose overflow-x-auto text-indigo-100 selection:bg-indigo-500/30">
                                    <code>{topic.deepContent.code}</code>
                                </pre>
                            </div>
                        </div>
                    )}

                    <div className="pt-16 border-t border-slate-100 dark:border-slate-800 space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Expert Curations</h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Industry-vetted channels for detailed visual mastery.</p>
                            </div>
                            <div className="px-8 py-4 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-rose-100">
                                <FiPlay size={16} /> Premium Sources
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {course.topChannels?.map((channel, i) => (
                                <a key={i} href={channel.url} target="_blank" rel="noopener noreferrer"
                                    className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-500/50 hover:bg-white dark:hover:bg-slate-700 hover:shadow-2xl hover:shadow-rose-500/5 transition-all flex items-center gap-6 group btn-hover-scale"
                                >
                                    <div className="w-16 h-16 rounded-xl bg-rose-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-rose-200 group-hover:rotate-12 transition-all">
                                        <FiPlay />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-base font-black text-slate-900 dark:text-white truncate leading-tight">{channel.name}</p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-2 group-hover:text-rose-600 transition-colors">Start Workshop</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Mentor CTA Banner */}
            <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-12 text-white overflow-hidden relative group border border-indigo-800/50 shadow-3xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[150px] -mr-48 -mt-48"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1 bg-violet-500/20 border border-violet-500/30 text-violet-300 rounded-full text-[10px] font-black uppercase tracking-widest">AI Intelligence</div>
                        <h2 className="text-4xl font-black tracking-tight leading-tight">Stuck on <span className="text-violet-400">{topic.title}</span>?<br/>Your Mentor is ready.</h2>
                        <p className="text-slate-400 text-lg max-w-xl font-medium leading-relaxed">Get instant explanations, code examples, and answers to questions about this exact topic.</p>
                    </div>
                    <button onClick={openMentor}
                        className="px-14 py-6 bg-white text-slate-900 rounded-2xl font-black text-base flex items-center gap-3 shadow-3xl hover:bg-violet-50 transition-all transform hover:scale-105 active:scale-95 shrink-0"
                    >
                        <FiZap size={22} /> Launch AI Mentor
                    </button>
                </div>
            </div>

            {/* AI Mentor Slide-In Panel */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-in-out ${mentorOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <FiZap className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-sm">AI Topic Mentor</h3>
                            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest truncate max-w-[180px]">{topic.title}</p>
                        </div>
                    </div>
                    <button onClick={() => setMentorOpen(false)} className="text-white/80 hover:text-white rounded-xl p-2 hover:bg-white/10 transition-all">
                        <FiX size={22} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-950">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm font-medium leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-lg' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-lg shadow-sm border border-slate-100 dark:border-slate-700'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {aiLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white px-5 py-4 rounded-3xl rounded-bl-lg shadow-sm border border-slate-100 flex gap-1.5 items-center">
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2 bg-slate-50 shrink-0">
                        {[`Explain ${topic.title} simply`, 'Give me a code example', 'Common interview questions'].map(q => (
                            <button key={q} onClick={() => setInput(q)}
                                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-all">
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder={`Ask about ${topic.title}...`}
                            className="flex-1 bg-transparent border-none text-sm font-medium outline-none placeholder-slate-400 dark:text-white"
                        />
                        <button onClick={sendMessage} disabled={aiLoading || !input.trim()}
                            className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center disabled:opacity-40 hover:bg-indigo-700 transition-all shrink-0">
                            <FiSend size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {mentorOpen && <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={() => setMentorOpen(false)} />}
        </div>
    );
};

export default TopicContent;
