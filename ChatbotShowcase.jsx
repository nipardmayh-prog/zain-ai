// =============================================================
// StatsCard — ZAIN branded dashboard stat card
// =============================================================
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function StatsCard({ title, value, prefix = '', suffix = '', icon, color, change, decimals = 0 }) {
  const colorClasses = {
    blue: 'from-zn-500 to-zn-700 shadow-glow-blue',
    green: 'from-ai-500 to-ai-700 shadow-glow-green',
    brand: 'from-zn-500 to-ai-500 shadow-glow-brand',
    cyan: 'from-zn-400 to-zn-600',
  };

  return (
    <motion.div
      className="glass-card p-6 relative overflow-hidden group"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 text-sm font-medium">{title}</span>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white text-lg`}>
            {icon}
          </div>
        </div>

        <div className="text-3xl font-heading font-bold text-white mb-2">
          <AnimatedCounter target={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        </div>

        {change && (
          <div className={`flex items-center text-sm ${change > 0 ? 'text-ai-500' : 'text-red-400'}`}>
            <span>{change > 0 ? '↑' : '↓'} {Math.abs(change)}%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
