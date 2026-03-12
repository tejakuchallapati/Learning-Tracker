import { useState, useRef, useEffect } from 'react';
import { FiSend, FiCpu, FiMessageCircle, FiArchive, FiSettings, FiPlus } from 'react-icons/fi';

const DevChatSection = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Welcome to your dedicated AI Research Space. I can help you with architecture diagrams, code reviews, or market research. What is on your mind?' }
    ]);
    const [input, setInput] = useState('');
    const [history] = useState([
        { id: 1, title: 'React Performance Help', date: '2 hours ago' },
        { id: 2, title: 'Career Path: AI vs Web', date: 'Yesterday' },
        { id: 3, title: 'Understanding TCP/IP', date: 'Mar 10' }
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', text: "That is an interesting technical perspective. In a professional environment, we would handle this by implementing a robust error boundary and logging system. Would you like a code snippet?" }]);
        }, 800);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex gap-8 animate-in fade-in slide-in-from-right-8 duration-1000 pb-4 pr-4">
            {/* Sidebar History - Immersive Dark */}
            <div className="w-80 hidden lg:flex flex-col bg-slate-900 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="p-10 border-b border-slate-800 relative z-10">
                    <button className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all btn-hover-scale">
                        <FiPlus /> New Research
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-3 relative z-10">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-6">Archive History</h4>
                    {history.map(item => (
                        <button key={item.id} className="w-full text-left p-6 hover:bg-white/5 rounded-[1.5rem] transition-all group border border-transparent hover:border-slate-700/50">
                            <p className="text-xs font-black text-slate-300 truncate group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{item.title}</p>
                            <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase tracking-widest">{item.date}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Interface - Premium Light/Glass */}
            <div className="flex-1 flex flex-col glass-card premium-shadow rounded-[4rem] border border-white/50 overflow-hidden relative">
                <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-900 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl shadow-xl transform rotate-3">
                            <FiCpu />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">Research Terminal v4.0</h2>
                            <p className="text-[9px] text-indigo-600 font-black uppercase tracking-[0.2em] mt-2 leading-none flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                Neural Engine Active
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-slate-100"><FiArchive /></button>
                        <button className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-slate-100"><FiSettings /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-slate-50/30" ref={scrollRef}>
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                            <div className={`max-w-[75%] flex gap-6 ${m.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row'}`}>
                                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-lg shadow-sm border border-white ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-indigo-400'}`}>
                                    {m.role === 'user' ? <FiMessageCircle /> : <FiCpu />}
                                </div>
                                <div className={`p-8 rounded-[2.5rem] text-sm font-medium leading-relaxed shadow-sm border ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none border-indigo-500' : 'bg-white text-slate-800 rounded-tl-none border-slate-100'}`}>
                                    {m.text}
                                    {m.role === 'ai' && (
                                        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-4">
                                            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Copy Code</button>
                                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:underline">References</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-10 border-t border-slate-50 bg-white/80 backdrop-blur-xl">
                    <div className="bg-slate-50 rounded-[2rem] p-3 pl-8 flex items-center gap-6 border border-slate-100 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
                        <FiCpu className="text-slate-400 w-6 h-6" />
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Input technical parameter or query..."
                            className="flex-1 bg-transparent border-none py-5 text-sm font-black text-slate-900 focus:ring-0 placeholder-slate-300"
                        />
                        <button 
                            onClick={handleSend}
                            className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl btn-hover-scale"
                        >
                            <FiSend />
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-black text-center mt-6 uppercase tracking-[0.3em]">Precision Core v4.0.2 • Verified Research Protocol</p>
                </div>
            </div>
        </div>
    );
};

export default DevChatSection;
