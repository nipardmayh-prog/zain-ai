// =============================================================
// LeadScraperDemo — ZAIN branded lead scraper simulation
// Enhanced step-by-step stages: scanning→collecting→verifying→completed
// =============================================================
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import useStore from '../../store/useStore';

const stages = [
  { label: 'Initializing ZAIN scraper...', pct: 5, phase: 'scanning' },
  { label: 'Connecting to LinkedIn API...', pct: 12, phase: 'scanning' },
  { label: 'Scanning profiles by ICP criteria...', pct: 22, phase: 'scanning' },
  { label: 'Found 847 potential profiles', pct: 32, phase: 'collecting' },
  { label: 'Collecting contact information...', pct: 42, phase: 'collecting' },
  { label: 'Enriching data from 3 sources...', pct: 52, phase: 'collecting' },
  { label: 'Validating email addresses...', pct: 65, phase: 'verifying' },
  { label: 'Running AI lead scoring model...', pct: 78, phase: 'verifying' },
  { label: 'Applying quality filters...', pct: 90, phase: 'verifying' },
  { label: '✓ Complete! Qualified leads ready', pct: 100, phase: 'completed' },
];

const phaseColors = {
  scanning: 'text-zn-400',
  collecting: 'text-ai-400',
  verifying: 'text-yellow-400',
  completed: 'text-green-400',
};

export default function LeadScraperDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [stageIndex, setStageIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [visibleLeads, setVisibleLeads] = useState([]);
  const { leads, fetchLeads } = useStore();
  const timeoutsRef = useRef([]);

  useEffect(() => { fetchLeads(); }, []);

  const startScrape = () => {
    setIsRunning(true); setStageIndex(0); setShowResults(false); setVisibleLeads([]);

    stages.forEach((_, i) => {
      const t = setTimeout(() => {
        setStageIndex(i);
        if (i === stages.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setShowResults(true);
            // Append results one by one
            leads.forEach((lead, j) => {
              setTimeout(() => setVisibleLeads(prev => [...prev, lead]), j * 200);
            });
          }, 600);
        }
      }, i * 650 + Math.random() * 350);
      timeoutsRef.current.push(t);
    });
  };

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsRunning(false); setStageIndex(-1); setShowResults(false); setVisibleLeads([]);
  };

  const currentStage = stageIndex >= 0 ? stages[stageIndex] : null;

  return (
    <GlassCard hover={false} className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-white font-heading font-semibold text-lg mb-1">Lead Scraper Simulation</h3>
        <p className="text-gray-400 text-sm">Watch ZAIN AI find and qualify leads in real-time</p>
      </div>

      {/* Target Config */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[{ l: 'Platform', v: 'LinkedIn' }, { l: 'Target', v: 'VP/Director, Marketing' }, { l: 'Industry', v: 'SaaS & Tech' }, { l: 'Min Score', v: '>75' }].map(({ l, v }, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <p className="text-gray-500 text-xs mb-1">{l}</p>
            <p className="text-white text-sm font-medium">{v}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      {(isRunning || stageIndex >= 0) && !showResults && (
        <div className="mb-6">
          {/* Phase indicators */}
          <div className="flex items-center justify-between mb-3">
            {['scanning', 'collecting', 'verifying', 'completed'].map((phase, i) => (
              <div key={phase} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${currentStage?.phase === phase ? 'bg-current animate-pulse' : stageIndex >= 0 && stages.findIndex(s => s.phase === phase) <= stageIndex ? 'bg-ai-500' : 'bg-gray-700'} ${phaseColors[phase]}`} />
                <span className={`text-[10px] capitalize ${currentStage?.phase === phase ? phaseColors[phase] : 'text-gray-600'}`}>{phase}</span>
              </div>
            ))}
          </div>

          <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-3">
            <motion.div className="h-full bg-gradient-to-r from-zn-500 via-ai-500 to-zn-400 rounded-full" animate={{ width: `${currentStage?.pct || 0}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
          </div>

          <div className="flex items-center justify-between">
            <motion.p key={stageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-300 text-sm">{currentStage?.label}</motion.p>
            <span className="text-zn-300 text-sm font-mono">{currentStage?.pct}%</span>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/5 max-h-32 overflow-y-auto font-mono text-xs">
            {stages.slice(0, stageIndex + 1).map((stage, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 py-0.5">
                <span className="text-ai-500 mr-2">$</span>{stage.label}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Results (appended dynamically) */}
      <AnimatePresence>
        {showResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold text-sm">Results</h4>
              <span className="text-ai-500 text-xs font-medium">✓ {visibleLeads.length} leads found</span>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {visibleLeads.map((lead, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zn-500 to-ai-500 flex items-center justify-center text-white text-xs font-bold">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div><p className="text-white text-sm font-medium">{lead.name}</p><p className="text-gray-500 text-xs">{lead.title} · {lead.company}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.linkedin && <span className="text-blue-400 text-xs">in</span>}
                    <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${lead.score >= 90 ? 'bg-ai-500/20 text-ai-500' : lead.score >= 80 ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'}`}>{lead.score}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        {!isRunning && !showResults ? (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startScrape}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-zn-500 to-ai-500 text-white font-semibold cursor-pointer flex items-center gap-2">🔍 Start Lead Scrape</motion.button>
        ) : showResults ? (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-zn-500 to-zn-600 text-white font-semibold cursor-pointer">↻ Run Again</motion.button>
        ) : (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <motion.div className="w-4 h-4 border-2 border-zn-500/30 border-t-zn-500 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
            Scraping in progress...
          </div>
        )}
      </div>
    </GlassCard>
  );
}
