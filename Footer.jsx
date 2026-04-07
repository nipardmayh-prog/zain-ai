// =============================================================
// LiveFeed — Real-time lead/activity feed with interval updates
// =============================================================
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

const names = {
  default: ['Sarah', 'Mike', 'Emily', 'James', 'Priya', 'David', 'Lisa', 'Carlos', 'Jen', 'Tom'],
  restaurant: ['Ahmad', 'Marie', 'Luigi', 'Chen', 'Rosa', 'Pierre', 'Suki', 'Marco', 'Elena', 'Omar'],
  gym: ['Jake', 'Rachel', 'Derek', 'Sam', 'Brian', 'Kim', 'Alex', 'Jordan', 'Mia', 'Tyler'],
  clinic: ['Dr. Foster', 'Nurse Kim', 'Patient R.', 'Patient L.', 'Dr. Sharma', 'Patient M.', 'Dr. Park', 'Patient S.'],
  realestate: ['Amanda B.', 'Chris M.', 'Diana V.', 'Kevin P.', 'Natalie T.', 'Ryan F.', 'Buyer J.', 'Seller K.'],
};

const actions = {
  default: ['submitted a lead form', 'booked a demo call', 'started chat', 'asked about pricing', 'downloaded case study', 'signed up for trial'],
  restaurant: ['booked a table for 4', 'placed online order ($64)', 'asked about catering', 'left a 5★ review', 'joined loyalty program', 'ordered delivery'],
  gym: ['signed up for trial', 'booked PT session', 'enrolled in spin class', 'upgraded to Pro', 'referred a friend', 'asked about pricing'],
  clinic: ['booked appointment', 'requested Rx refill', 'completed intake form', 'asked about insurance', 'scheduled telehealth', 'left patient review'],
  realestate: ['requested home valuation', 'saved 3 listings', 'booked a viewing', 'asked about financing', 'RSVP\'d open house', 'submitted offer'],
};

const feedTypes = [
  { prefix: '🎯 New lead:', color: 'text-zn-400' },
  { prefix: '✅ Appointment:', color: 'text-ai-500' },
  { prefix: '💬 Chat started:', color: 'text-zn-300' },
  { prefix: '📞 Call booked:', color: 'text-ai-400' },
  { prefix: '💰 Conversion:', color: 'text-yellow-400' },
];

export default function LiveFeed() {
  const { aiEnabled, selectedIndustry } = useStore();
  const [items, setItems] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const intervalRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (!aiEnabled) {
      clearInterval(intervalRef.current);
      return;
    }

    const addItem = () => {
      const ind = selectedIndustry || 'default';
      const nameList = names[ind] || names.default;
      const actionList = actions[ind] || actions.default;
      const type = feedTypes[Math.floor(Math.random() * feedTypes.length)];
      const name = nameList[Math.floor(Math.random() * nameList.length)];
      const action = actionList[Math.floor(Math.random() * actionList.length)];

      const newItem = {
        id: idRef.current++,
        type,
        name,
        action,
        time: 'Just now',
        timestamp: Date.now(),
      };

      setItems(prev => [newItem, ...prev].slice(0, 12));
      setTotalLeads(prev => prev + 1);
    };

    // Add one immediately
    addItem();

    // Then every 3-6 seconds
    intervalRef.current = setInterval(addItem, 3000 + Math.random() * 3000);

    return () => clearInterval(intervalRef.current);
  }, [aiEnabled, selectedIndustry]);

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-heading font-semibold text-lg">Live Lead Feed</h3>
          <p className="text-gray-400 text-xs mt-0.5">Real-time activity stream</p>
        </div>
        <div className="flex items-center gap-2">
          {aiEnabled && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 py-0.5 rounded-full bg-ai-500/15 border border-ai-500/25 text-ai-500 text-[10px] font-bold"
            >
              {totalLeads} captured
            </motion.span>
          )}
          <span className={`text-xs ${aiEnabled ? 'text-ai-500 animate-pulse' : 'text-gray-600'}`}>
            {aiEnabled ? '● Live' : '○ Paused'}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {!aiEnabled && items.length === 0 && (
            <motion.div className="text-center py-8">
              <p className="text-gray-600 text-sm">Enable AI to see live activity</p>
            </motion.div>
          )}
          {items.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 30, height: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className={`font-medium ${item.type.color}`}>{item.type.prefix}</span>{' '}
                  <span className="text-white font-medium">{item.name}</span>{' '}
                  <span className="text-gray-400">{item.action}</span>
                </p>
              </div>
              <span className="text-gray-600 text-[10px] flex-shrink-0 mt-0.5">{item.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
