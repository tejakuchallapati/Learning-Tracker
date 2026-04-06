import { useState, useEffect, useRef } from 'react';
import { FiSend, FiUser, FiCpu, FiX, FiMinus, FiMessageSquare } from 'react-icons/fi';

const DevChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hey there! I am DevChat, your AI technical assistant. How can I help you with your learning path today?' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI thinking
        setTimeout(() => {
            let aiResponse = "That's a great question! Based on the tech market trends, I recommend mastering the fundamentals before jumping into frameworks. Would you like a code example?";
            
            if (input.toLowerCase().includes('react')) {
                aiResponse = "React is excellent for component-based architecture. Focus on Hooks like useEffect and useMemo for performance.";
            } else if (input.toLowerCase().includes('html')) {
                aiResponse = "HTML is the skeleton of the web. Always use Semantic HTML tags like <article> and <section> for better SEO and accessibility.";
            } else if (input.toLowerCase().includes('job')) {
                aiResponse = "To get a job in today's market, you need a strong portfolio. Build 3 solid projects that solve real-world problems.";
            }

            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        }, 800);
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 right-10 w-20 h-20 bg-violet-600 text-white rounded-[2rem] shadow-2xl flex items-center justify-center text-3xl hover:scale-110 hover:bg-violet-700 transition-all z-50 animate-bounce group"
            >
                <div className="absolute inset-0 bg-violet-400 rounded-[2rem] animate-ping opacity-20 group-hover:hidden"></div>
                <FiMessageSquare className="relative z-10" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-10 right-10 w-[420px] h-[650px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(124,58,237,0.25)] border border-slate-100 dark:border-slate-800 flex flex-col z-50 animate-in slide-in-from-bottom-10 duration-500 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 px-8 py-10 text-white flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                <div className="flex items-center gap-5 relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/10">
                        <FiCpu />
                    </div>
                    <div>
                        <h3 className="font-black text-lg uppercase tracking-widest leading-none">DevChat AI</h3>
                        <p className="text-[10px] text-violet-100 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Tactical Assistant Online
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 relative z-10">
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-3 rounded-xl transition-all hover:rotate-90"><FiX size={20} /></button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 dark:bg-slate-950/50" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        {m.role !== 'user' && (
                            <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mr-3 mt-1 shadow-sm shrink-0">
                                <FiCpu size={14} />
                            </div>
                        )}
                        <div className={`max-w-[75%] p-6 rounded-[2rem] text-sm font-bold leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-violet-600 text-white rounded-tr-none shadow-violet-200/50 dark:shadow-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800 shadow-slate-200/20 dark:shadow-none'}`}>
                            {m.text}
                        </div>
                        {m.role === 'user' && (
                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center ml-3 mt-1 shadow-sm shrink-0">
                                <FiUser size={14} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <div className="relative flex items-center gap-4">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask a technical doubt..."
                        className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-5 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                    <button 
                        onClick={handleSend}
                        className="w-14 h-14 bg-violet-600 text-white rounded-2xl flex items-center justify-center hover:bg-violet-700 transition-all shadow-xl shadow-violet-200 dark:shadow-none hover:-translate-y-1 active:scale-95 group shrink-0"
                    >
                        <FiSend size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
                <p className="text-[9px] text-center text-slate-400 dark:text-slate-600 mt-4 font-black uppercase tracking-widest leading-none">Powered by Engine Core v3.0 • AI Technical Protocol</p>
            </div>
        </div>
    );
};


export default DevChat;
