// =============================================================
// AutomationToggle — Toggle switch for automation on/off
// =============================================================
import { motion } from 'framer-motion';

export default function AutomationToggle({ enabled, onToggle, size = 'md' }) {
  const sizes = {
    sm: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translateX(20px)' },
    md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translateX(24px)' },
  };

  const s = sizes[size];

  return (
    <button
      onClick={onToggle}
      className={`
        ${s.track} rounded-full p-0.5 transition-colors duration-300 cursor-pointer
        ${enabled
          ? 'bg-gradient-to-r from-electric-green to-emerald-500'
          : 'bg-gray-700'
        }
      `}
    >
      <motion.div
        className={`${s.thumb} rounded-full bg-white shadow-md`}
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
