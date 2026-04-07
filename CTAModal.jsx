// =============================================================
// VoiceAgentDemo — ZAIN branded voice simulation
// Enhanced: call states (dialing→speaking→ended), gradual transcript
// =============================================================
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const callScript = [
  { speaker: 'agent', text: 'Hello! This is ZAIN AI calling on behalf of your automation partner. Am I speaking with the business owner?', delay: 2000 },
  { speaker: 'user', text: "Yes, that's me. What's this about?", delay: 4500 },
  { speaker: 'agent', text: "We noticed your company could benefit from AI automation. Our clients typically see a 300% increase in lead capture. Do you have 5 minutes?", delay: 7000 },
  { speaker: 'user', text: "Sure, tell me more.", delay: 9500 },
  { speaker: 'agent', text: "Excellent! We specialize in chatbots, voice agents, and lead generation. Which area interests you most?", delay: 11500 },
  { speaker: 'user', text: "Lead generation sounds interesting.", delay: 13500 },
  { speaker: 'agent', text: "Our AI scrapes and qualifies leads from LinkedIn, scoring them 0-100. We can set up a demo. Would Tuesday at 2pm work?", delay: 16000 },
  { speaker: 'user', text: "That works. Send me the details.", delay: 18500 },
  { speaker: 'agent', text: "Done! I've sent a calendar invite to your email. Looking forward to it. Have a great day! 🎉", delay: 20500 },
];

export default function VoiceAgentDemo() {
  const [callState, setCallState] = useState('idle'); // idle | dialing | speaking | ended
  const [transcript, setTranscript] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (callState !== 'speaking' && callState !== 'dialing') return;

    if (callState === 'dialing') {
      const dialTimeout = setTimeout(() => setCallState('speaking'), 2000);
      return () => clearTimeout(dialTimeout);
    }

    timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);

    const timeouts = callScript.map((entry) =>
      setTimeout(() => setTranscript(prev => [...prev, entry]), entry.delay)
    );

    const endTimeout = setTimeout(() => {
      setCallState('ended');
      clearInterval(timerRef.current);
    }, 22000);

    return () => {
      clearInterval(timerRef.current);
      timeouts.forEach(clearTimeout);
      clearTimeout(endTimeout);
    };
  }, [callState]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' });
  }, [transcript]);

  const startCall = () => { setCallState('dialing'); setTranscript([]); setElapsed(0); };
  const endCall = () => { setCallState('ended'); clearInterval(timerRef.current); };
  const reset = () => { setCallState('idle'); setTranscript([]); setElapsed(0); };
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const stateLabel = { idle: 'Ready', dialing: 'Dialing...', speaking: 'In Call', ended: 'Call Ended' };

  return (
    <GlassCard hover={false} className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-white font-heading font-semibold text-lg mb-1">Voice Agent Simulation</h3>
        <p className="text-gray-400 text-sm">Simulate an outbound AI sales call</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <motion.div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 ${
            callState === 'speaking' ? 'bg-gradient-to-br from-zn-500 to-ai-500' :
            callState === 'dialing' ? 'bg-gradient-to-br from-zn-600 to-zn-800' :
            'bg-gradient-to-br from-gray-700 to-gray-800'
          }`}
          animate={callState === 'speaking' ? {
            boxShadow: ['0 0 0 0 rgba(10,132,255,0.4)', '0 0 0 20px rgba(10,132,255,0)', '0 0 0 0 rgba(10,132,255,0)']
          } : callState === 'dialing' ? {
            scale: [1, 1.05, 1]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >{callState === 'dialing' ? '📱' : callState === 'speaking' ? '🎙️' : callState === 'ended' ? '✅' : '📞'}</motion.div>

        {/* Status badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium mb-3 ${
          callState === 'speaking' ? 'bg-ai-500/20 text-ai-500' :
          callState === 'dialing' ? 'bg-zn-500/20 text-zn-400 animate-pulse' :
          callState === 'ended' ? 'bg-green-500/20 text-green-400' :
          'bg-gray-500/20 text-gray-400'
        }`}>{stateLabel[callState]}</div>

        {/* Waveform */}
        <div className="flex items-center justify-center gap-0.5 h-10 mb-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div key={i} className={`w-0.5 rounded-full ${callState === 'speaking' ? 'bg-ai-500' : 'bg-gray-700'}`}
              animate={callState === 'speaking' ? { height: [4, Math.random() * 35 + 4, 4] } : { height: 4 }}
              transition={{ duration: 0.3 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.03 }} />
          ))}
        </div>

        <p className={`text-xl font-mono font-bold ${callState === 'speaking' ? 'text-zn-400' : 'text-gray-500'}`}>{formatTime(elapsed)}</p>
      </div>

      <div className="flex justify-center mb-6">
        {callState === 'idle' ? (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={startCall}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-ai-500 to-ai-700 text-dark-950 font-semibold cursor-pointer flex items-center gap-2">
            <span>📞</span> Start Call
          </motion.button>
        ) : callState === 'ended' ? (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={reset}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-zn-500 to-zn-600 text-white font-semibold cursor-pointer">
            ↻ New Call
          </motion.button>
        ) : (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={endCall}
            className="px-8 py-3 rounded-full bg-red-500 text-white font-semibold cursor-pointer flex items-center gap-2">
            <span>✕</span> End Call
          </motion.button>
        )}
      </div>

      <div className="border-t border-white/10 pt-4">
        <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          📝 Live Transcript
          {callState === 'speaking' && <span className="text-ai-500 text-xs animate-pulse">● Recording</span>}
        </h4>
        <div ref={transcriptRef} className="max-h-48 overflow-y-auto space-y-2 pr-2">
          <AnimatePresence>
            {transcript.map((entry, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: entry.speaker === 'agent' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
                <span className={`text-xs font-bold flex-shrink-0 w-14 ${entry.speaker === 'agent' ? 'text-zn-400' : 'text-ai-400'}`}>
                  {entry.speaker === 'agent' ? 'Agent:' : 'Lead:'}
                </span>
                <span className="text-gray-300 text-sm">{entry.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {transcript.length === 0 && callState === 'idle' && (
            <p className="text-gray-500 text-sm text-center py-4">Start a call to see the live transcript</p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
