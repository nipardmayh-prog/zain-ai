// =============================================================
// AIToggle — Dashboard AI ON/OFF toggle with glow effect
// Dramatically changes all dashboard stats
// =============================================================
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

export default function AIToggle() {
  const { aiEnabled, setAiEnabled } = useStore();

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium transition-colors duration-300 ${aiEnabled ? 'text-gray-500' : 'text-red-400'}`}>
        AI Off
      </span>

      <motion.button
        onClick={() => setAiEnabled(!aiEnabled)}
        className={`relative w-16 h-8 rounded-full transition-all duration-500 cursor-pointer ${
          aiEnabled
            ? 'bg-gradient-to-r from-zn-500 to-ai-500 shadow-[0_0_20px_rgba(0,255,178,0.4)]'
            : 'bg-gray-700 shadow-none'
        }`}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <motion.div
          className={`absolute top-1 w-6 h-6 rounded-full shadow-md transition-colors duration-300 ${
            aiEnabled ? 'bg-white' : 'bg-gray-400'
          }`}
          animate={{ left: aiEnabled ? '34px' : '4px' }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />

        {/* Glow ring when ON */}
        {aiEnabled && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(0,255,178,0.3)',
                '0 0 0 8px rgba(0,255,178,0)',
                '0 0 0 0 rgba(0,255,178,0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      <span className={`text-sm font-medium transition-colors duration-300 ${aiEnabled ? 'text-ai-500' : 'text-gray-500'}`}>
        AI On
      </span>

      {aiEnabled && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-1 px-2 py-0.5 rounded-full bg-ai-500/15 border border-ai-500/30 text-ai-500 text-[10px] font-bold uppercase tracking-wider"
        >
          Live
        </motion.span>
      )}
    </div>
  );
}
