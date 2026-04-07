// =============================================================
// MissedRevenueCard — Shows missed/recovered revenue based on AI toggle
// =============================================================
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import useStore from '../../store/useStore';

export default function MissedRevenueCard() {
  const { aiEnabled } = useStore();

  const missedMessages = aiEnabled ? 3 : 47;
  const missedRevenue = aiEnabled ? 240 : 8420;

  return (
    <motion.div
      className={`glass-card p-6 relative overflow-hidden transition-all duration-700 ${
        aiEnabled
          ? 'border-ai-500/30'
          : 'border-red-500/30'
      }`}
      animate={{
        boxShadow: aiEnabled
          ? '0 0 30px rgba(0,255,178,0.08)'
          : '0 0 30px rgba(239,68,68,0.1)'
      }}
    >
      {/* Background pulse */}
      <div className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl transition-all duration-700 ${
        aiEnabled ? 'bg-ai-500/10' : 'bg-red-500/10'
      }`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={aiEnabled ? 'recovered' : 'missed'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`text-sm font-semibold ${aiEnabled ? 'text-ai-500' : 'text-red-400'}`}
            >
              {aiEnabled ? '✅ Revenue Recovered' : '⚠️ Missed Revenue Today'}
            </motion.span>
          </AnimatePresence>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
            aiEnabled
              ? 'bg-ai-500/20 text-ai-500'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {aiEnabled ? '💰' : '🚨'}
          </div>
        </div>

        {/* Missed messages */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-heading font-bold ${aiEnabled ? 'text-ai-400' : 'text-red-400'}`}>
              <AnimatedCounter target={missedMessages} />
            </span>
            <span className="text-gray-400 text-sm">
              {aiEnabled ? 'msgs auto-handled' : 'unanswered messages'}
            </span>
          </div>
        </div>

        {/* Revenue impact */}
        <div className={`p-3 rounded-lg ${aiEnabled ? 'bg-ai-500/10 border border-ai-500/15' : 'bg-red-500/10 border border-red-500/15'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${aiEnabled ? 'text-ai-400' : 'text-red-300'}`}>
              {aiEnabled ? 'Revenue saved today' : 'Estimated lost revenue'}
            </span>
            <motion.span
              key={missedRevenue}
              className={`text-xl font-heading font-bold ${aiEnabled ? 'text-ai-500' : 'text-red-400'}`}
            >
              $<AnimatedCounter target={missedRevenue} />
            </motion.span>
          </div>
        </div>

        {!aiEnabled && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-300/60 text-[10px] mt-3 text-center"
          >
            Turn AI ON to recover this revenue →
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
