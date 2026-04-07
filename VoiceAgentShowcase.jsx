// =============================================================
// ChatbotDemo — ZAIN branded interactive chatbot with
// realistic AI behavior: typing delays, "AI is thinking..."
// =============================================================
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import GlassCard from '../ui/GlassCard';

export default function ChatbotDemo() {
  const [input, setInput] = useState('');
  const { chatMessages, chatLoading, sendMessage, lastUserMessage } = useStore();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || chatLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const suggestions = ['Tell me about pricing', 'How do chatbots work?', 'Schedule a demo', 'Lead generation'];

  return (
    <GlassCard hover={false} className="max-w-2xl mx-auto flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zn-500 to-ai-500 flex items-center justify-center">
          <span className="text-white text-lg font-bold">Z</span>
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">ZAIN AI Assistant</p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-ai-500 animate-pulse" />
            <span className="text-gray-400 text-xs">Online — Try asking about pricing, chatbots, or voice agents</span>
          </div>
        </div>
        {lastUserMessage && (
          <div className="text-gray-600 text-[10px] max-w-[100px] truncate" title={`Last: ${lastUserMessage}`}>
            Memory: active
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 min-h-0">
        <AnimatePresence>
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-zn-500/30 text-white rounded-br-md border border-zn-500/20'
                  : 'bg-white/5 text-gray-300 rounded-bl-md border border-white/5'
              }`}>
                <div className="chat-message-ai whitespace-pre-wrap">{msg.content}</div>
                <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-zn-300/50' : 'text-gray-500'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {chatLoading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs">AI is thinking...</span>
                <div className="flex gap-1">
                  <motion.span className="w-2 h-2 bg-zn-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                  <motion.span className="w-2 h-2 bg-zn-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                  <motion.span className="w-2 h-2 bg-zn-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {chatMessages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mt-3 flex-shrink-0">
          {suggestions.map((s, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
              onClick={() => { setInput(s); inputRef.current?.focus(); }}
              className="px-3 py-1.5 rounded-full bg-zn-500/10 border border-zn-500/20 text-zn-300 text-xs hover:bg-zn-500/20 transition-colors cursor-pointer"
            >{s}</motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="mt-4 flex gap-2 flex-shrink-0">
        <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-zn-500/50 focus:ring-1 focus:ring-zn-500/20 transition-all" disabled={chatLoading} />
        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={chatLoading || !input.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-zn-500 to-zn-600 text-white font-semibold text-sm disabled:opacity-50 cursor-pointer transition-opacity">Send</motion.button>
      </form>
    </GlassCard>
  );
}
