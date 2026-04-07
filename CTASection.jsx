// =============================================================
// DashboardGrid — Activity feed + performance (ZAIN branded)
// Live activity engine with smooth animated updates
// =============================================================
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

export default function DashboardGrid() {
  const { activity, stats, initLiveEngine, tickLiveEngine, liveLeadsCount, liveRevenueCount } = useStore();
  const intervalRef = useRef(null);

  // Initialize and run live activity engine
  useEffect(() => {
    initLiveEngine();
    intervalRef.current = setInterval(() => {
      tickLiveEngine();
    }, 3000); // Tick every 3 seconds
    return () => clearInterval(intervalRef.current);
  }, [stats]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Activity Feed */}
      <motion.div className="glass-card p-6 lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-heading font-semibold text-lg">Recent Activity</h3>
          <span className="text-ai-500 text-xs animate-pulse">● Live</span>
        </div>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {activity.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-sm">{item.message}</p>
                <p className="text-gray-500 text-xs mt-1">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Sidebar */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h3 className="text-white font-heading font-semibold text-lg mb-4">Performance</h3>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Avg Response Time</span>
              <span className="text-ai-500 font-medium">1.2s</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-ai-500 to-ai-400 rounded-full" initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ delay: 1, duration: 1, ease: 'easeOut' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Customer Satisfaction</span>
              <span className="text-zn-300 font-medium">97.3%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-zn-500 to-zn-400 rounded-full" initial={{ width: 0 }} animate={{ width: '97.3%' }} transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="text-ai-400 font-medium">23.7%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-zn-400 to-ai-500 rounded-full" initial={{ width: 0 }} animate={{ width: '23.7%' }} transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Bot Uptime</span>
              <span className="text-zn-400 font-medium">99.9%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-zn-500 to-ai-500 rounded-full" initial={{ width: 0 }} animate={{ width: '99.9%' }} transition={{ delay: 1.6, duration: 1, ease: 'easeOut' }} />
            </div>
          </div>
        </div>

        {/* Live counters */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-zn-500/10 to-zn-500/5 border border-zn-500/20 text-center">
            <motion.div key={liveLeadsCount} className="text-xl font-heading font-bold text-zn-400">
              {liveLeadsCount.toLocaleString()}
            </motion.div>
            <div className="text-gray-500 text-xs mt-0.5">Total Leads</div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-ai-500/10 to-ai-500/5 border border-ai-500/20 text-center">
            <motion.div key={liveRevenueCount} className="text-xl font-heading font-bold text-ai-400">
              ${liveRevenueCount.toLocaleString()}
            </motion.div>
            <div className="text-gray-500 text-xs mt-0.5">Revenue</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
