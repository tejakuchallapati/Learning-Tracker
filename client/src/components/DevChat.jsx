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
                className="fixed bottom-10 right-10 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 hover:bg-indigo-700 transition-all z-50 animate-bounce"
            >
                <FiMessageSquare />
            </button>
        );
    }

    return (
        <div className="fixed bottom-10 right-10 w-96 h-[600px] bg-white rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col z-50 animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                        <FiCpu />
                    </div>
                    <div>
                        <h3 className="font-black text-sm uppercase tracking-widest">DevChat AI</h3>
                        <p className="text-[10px] text-indigo-200 font-bold">Online & Ready to Help</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors"><FiMinus /></button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-50 flex items-center gap-3">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask a technical doubt..."
                    className="flex-1 bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <button 
                    onClick={handleSend}
                    className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    <FiSend />
                </button>
            </div>
        </div>
    );
};


export default DevChat;
