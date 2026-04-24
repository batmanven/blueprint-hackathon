import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { chatAPI } from '@/lib/api';
import { toast } from 'sonner';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hey - I’m your Aarogya assistant. Ask me anything.' }
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const msg = input;
    setMessages((p) => [...p, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await chatAPI.sendMessage(msg);
      setMessages((p) => [...p, { role: 'bot', content: res.data.reply }]);
    } catch {
      toast.error('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 h-16 w-16 bg-off-black text-white rounded-md shadow-2xl flex items-center justify-center z-50 cursor-pointer"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            className="fixed bottom-28 right-6 w-[420px] h-[640px] max-sm:w-[94%] max-sm:right-3 max-sm:left-3 bg-white border border-oat rounded-lg shadow-2xl flex flex-col overflow-hidden z-50"
          >

            {/* HEADER */}
            <div className="h-16 px-5 bg-off-black text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-fin rounded-md flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <span className="text-base font-semibold tracking-wide">
                  Aarogya Assistant
                </span>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/10 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[#faf9f6]">

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-4 py-3 text-[15px] leading-relaxed rounded-md ${
                      m.role === 'user'
                        ? 'bg-off-black text-white'
                        : 'bg-white border border-oat text-off-black'
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-1 px-1">
                  <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <form
              onSubmit={send}
              className="h-16 border-t border-oat flex items-center gap-3 px-3 bg-white shrink-0"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 h-12 px-4 text-[15px] bg-[#faf9f6] border border-oat rounded-md outline-none focus:border-fin focus:ring-2 focus:ring-fin/20 transition"
              />

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="submit"
                disabled={!input.trim() || loading}
                className="h-12 w-12 bg-off-black text-white rounded-md flex items-center justify-center hover:bg-fin transition disabled:opacity-40 cursor-pointer"
              >
                <Send size={18} />
              </motion.button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;