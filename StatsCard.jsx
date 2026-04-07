// =============================================================
// ChatWidget — Global floating chat with API key settings
// Mounted in App.jsx, appears on ALL pages
// =============================================================
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCog, HiX, HiChevronLeft } from 'react-icons/hi';
import useStore from '../../store/useStore';

export default function ChatWidget() {
  const {
    widgetOpen, setWidgetOpen,
    widgetMessages, widgetLoading, sendWidgetMessage,
    widgetSettingsOpen, setWidgetSettingsOpen,
    apiKey, setApiKey, apiProvider, setApiProvider,
  } = useStore();

  const [input, setInput] = useState('');
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempProvider, setTempProvider] = useState(apiProvider);
  const [saved, setSaved] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [widgetMessages, widgetLoading]);

  // Focus input when widget opens
  useEffect(() => {
    if (widgetOpen && !widgetSettingsOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [widgetOpen, widgetSettingsOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || widgetLoading) return;
    sendWidgetMessage(input.trim());
    setInput('');
  };

  const handleSaveSettings = () => {
    setApiKey(tempKey);
    setApiProvider(tempProvider);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setWidgetSettingsOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* ─── Floating Z Button ─── */}
      <motion.button
        className="fixed top-6 left-6 z-[100] w-12 h-12 rounded-full cursor-pointer
          bg-gradient-to-br from-zn-500 to-ai-500
          flex items-center justify-center
          shadow-glow-brand"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        whileHover={{ scale: 1.15, boxShadow: '0 0 35px rgba(10,132,255,0.5), 0 0 70px rgba(0,255,178,0.2)' }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setWidgetOpen(!widgetOpen)}
        aria-label="Open ZAIN AI chat"
      >
        <AnimatePresence mode="wait">
          {widgetOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HiX className="text-white text-xl" />
            </motion.span>
          ) : (
            <motion.span
              key="logo"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white font-heading font-bold text-lg"
            >
              Z
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {widgetOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 25 }}
            className="fixed top-20 left-6 z-[99] w-[360px] h-[480px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(4, 13, 26, 0.95) 0%, rgba(2, 8, 16, 0.98) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(10, 132, 255, 0.2)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(10,132,255,0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                {widgetSettingsOpen && (
                  <button onClick={() => setWidgetSettingsOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                    <HiChevronLeft size={18} />
                  </button>
                )}
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-zn-500 to-ai-500 flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-xs">Z</span>
                </div>
                <div>
                  <p className="text-white font-heading font-semibold text-sm">
                    {widgetSettingsOpen ? 'Settings' : 'ZAIN AI'}
                  </p>
                  {!widgetSettingsOpen && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-500 animate-pulse" />
                      <span className="text-gray-400 text-[10px]">
                        {apiKey ? `Connected (${apiProvider})` : 'Demo mode'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setWidgetSettingsOpen(!widgetSettingsOpen)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  widgetSettingsOpen ? 'bg-zn-500/20 text-zn-400' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
                aria-label="Settings"
              >
                <HiCog size={16} />
              </button>
            </div>

            {/* Settings Panel */}
            <AnimatePresence mode="wait">
              {widgetSettingsOpen ? (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 p-4 space-y-4 overflow-y-auto"
                >
                  <div>
                    <label className="text-gray-400 text-xs font-medium block mb-1.5">AI Provider</label>
                    <select
                      value={tempProvider}
                      onChange={(e) => setTempProvider(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-zn-500/50 appearance-none cursor-pointer"
                    >
                      <option value="openai" className="bg-dark-900">OpenAI (GPT)</option>
                      <option value="gemini" className="bg-dark-900">Google (Gemini)</option>
                      <option value="claude" className="bg-dark-900">Anthropic (Claude)</option>
                      <option value="custom" className="bg-dark-900">Custom Endpoint</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs font-medium block mb-1.5">
                      {tempProvider === 'custom' ? 'Endpoint URL' : 'API Key'}
                    </label>
                    <input
                      type={tempProvider === 'custom' ? 'url' : 'password'}
                      value={tempKey}
                      onChange={(e) => setTempKey(e.target.value)}
                      placeholder={tempProvider === 'custom' ? 'https://your-api.com/chat' : 'sk-...'}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-zn-500/50"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveSettings}
                    className={`w-full py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all ${
                      saved
                        ? 'bg-ai-500/20 text-ai-500 border border-ai-500/30'
                        : 'bg-gradient-to-r from-zn-500 to-ai-500 text-white'
                    }`}
                  >
                    {saved ? '✓ Saved!' : 'Save Settings'}
                  </motion.button>

                  <div className="pt-2 border-t border-white/5">
                    <p className="text-gray-500 text-[10px] leading-relaxed">
                      {apiKey
                        ? '✅ Your API key is saved locally and never sent to our servers.'
                        : '💡 Without an API key, ZAIN uses intelligent demo responses. Add your key for real AI.'}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 min-h-0">
                    {widgetMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-zn-500/25 text-white rounded-br-md border border-zn-500/20'
                            : 'bg-white/[0.04] text-gray-300 rounded-bl-md border border-white/5'
                        }`}>
                          <div className="chat-message-ai whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {widgetLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white/[0.04] rounded-2xl rounded-bl-md px-3 py-2 border border-white/5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-500 text-xs">AI is thinking</span>
                            <div className="flex gap-0.5">
                              <motion.span className="w-1 h-1 bg-zn-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
                              <motion.span className="w-1 h-1 bg-zn-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.12 }} />
                              <motion.span className="w-1 h-1 bg-zn-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.24 }} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSend} className="px-3 pb-3 pt-1 flex gap-2 flex-shrink-0 border-t border-white/5">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask ZAIN anything..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-zn-500/40 transition-all"
                      disabled={widgetLoading}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={widgetLoading || !input.trim()}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-zn-500 to-zn-600 text-white text-sm font-semibold disabled:opacity-40 cursor-pointer"
                    >
                      ↑
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
