// =============================================================
// LeadScoring — Smart lead list with AI recommendations
// =============================================================
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

function ScoreBadge({ score }) {
  if (score >= 90) return <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">🔥 {score}</span>;
  if (score >= 75) return <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">⚠️ {score}</span>;
  return <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">❄️ {score}</span>;
}

export default function LeadScoring() {
  const { leads, fetchLeads, aiEnabled } = useStore();

  useEffect(() => { fetchLeads(); }, []);

  const sortedLeads = [...leads].sort((a, b) => b.score - a.score);

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-heading font-semibold text-lg">Smart Lead Scoring</h3>
          <p className="text-gray-400 text-xs mt-0.5">AI-ranked by conversion probability</p>
        </div>
        <div className="flex gap-2 text-[10px]">
          <span className="text-red-400">🔥 Hot</span>
          <span className="text-amber-400">⚠️ Mid</span>
          <span className="text-blue-400">❄️ Cold</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
        {sortedLeads.map((lead, i) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zn-500 to-ai-500 flex items-center justify-center text-white text-xs font-bold">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{lead.name}</p>
                <p className="text-gray-500 text-xs">{lead.title} · {lead.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {lead.score >= 90 && aiEnabled && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-ai-500/10 border border-ai-500/20 text-ai-500 text-[9px] font-medium"
                >
                  AI: Contact now
                </motion.span>
              )}
              <ScoreBadge score={lead.score} />
            </div>
          </motion.div>
        ))}
      </div>

      {aiEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 p-2 rounded-lg bg-zn-500/5 border border-zn-500/10 text-center"
        >
          <p className="text-zn-300 text-[10px]">
            🧠 AI analyzed {leads.length} leads — {leads.filter(l => l.score >= 90).length} hot leads ready for outreach
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
