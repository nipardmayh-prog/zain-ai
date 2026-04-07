// =============================================================
// AdminPanel — ZAIN branded admin management panel
// =============================================================
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';
import GlassCard from '../ui/GlassCard';

function AutomationToggle({ automation, onToggle }) {
  return (
    <button
      onClick={() => onToggle(automation.id)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${automation.status ? 'bg-ai-500' : 'bg-gray-700'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${automation.status ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  );
}

function EditableField({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  const [tempVal, setTempVal] = useState(value);

  const save = () => { setEditing(false); if (tempVal !== value) onChange(tempVal); };

  if (editing) return (
    <input autoFocus value={tempVal} onChange={(e) => setTempVal(e.target.value)}
      onBlur={save} onKeyDown={(e) => e.key === 'Enter' && save()}
      className="bg-white/10 border border-zn-500/30 rounded px-2 py-0.5 text-white text-sm w-24 focus:outline-none" />
  );
  return (
    <span onClick={() => { setTempVal(value); setEditing(true); }}
      className="text-white text-sm cursor-pointer hover:text-zn-300 transition-colors border-b border-dashed border-white/20 hover:border-zn-500">{value}</span>
  );
}

export default function AdminPanel() {
  const { automations, automationsLoading, fetchAutomations, toggleAutomation, updateAutomation, stats, fetchStats, updateStats } = useStore();

  useEffect(() => { fetchAutomations(); fetchStats(); }, []);

  const typeColors = { chatbot: 'bg-zn-500/20 text-zn-300', voice: 'bg-ai-500/20 text-ai-500', leadgen: 'bg-yellow-500/20 text-yellow-400' };

  return (
    <div className="space-y-8">
      {/* Stats Editor */}
      <GlassCard hover={false}>
        <h3 className="text-white font-heading font-semibold text-lg mb-4">Dashboard Stats</h3>
        <p className="text-gray-400 text-sm mb-6">Click any value to edit it</p>
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { key: 'leadsGenerated', label: 'Leads' },
              { key: 'activeChatbots', label: 'Chatbots' },
              { key: 'revenue', label: 'Revenue ($)' },
              { key: 'conversionRate', label: 'Conv Rate (%)' },
            ].map(({ key, label }) => (
              <div key={key} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <EditableField value={String(stats[key])} onChange={(val) => updateStats({ [key]: isNaN(Number(val)) ? val : Number(val) })} />
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Automations Table */}
      <GlassCard hover={false}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-heading font-semibold text-lg">Automations</h3>
            <p className="text-gray-400 text-sm mt-1">Toggle services on/off and manage settings</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-ai-500/10 border border-ai-500/20 text-ai-500 text-xs font-medium">
            {automations.filter(a => a.status).length} Active
          </div>
        </div>

        {automationsLoading ? (
          <div className="flex items-center justify-center py-12"><div className="w-8 h-8 border-2 border-zn-500/20 border-t-zn-500 rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-gray-400 text-xs font-medium py-3 px-4">Status</th>
                  <th className="text-left text-gray-400 text-xs font-medium py-3 px-4">Name</th>
                  <th className="text-left text-gray-400 text-xs font-medium py-3 px-4">Type</th>
                  <th className="text-left text-gray-400 text-xs font-medium py-3 px-4 hidden sm:table-cell">Description</th>
                  <th className="text-right text-gray-400 text-xs font-medium py-3 px-4">Leads</th>
                  <th className="text-right text-gray-400 text-xs font-medium py-3 px-4 hidden sm:table-cell">Conv %</th>
                </tr>
              </thead>
              <tbody>
                {automations.map((a, i) => (
                  <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4"><AutomationToggle automation={a} onToggle={toggleAutomation} /></td>
                    <td className="py-3 px-4"><span className="text-white text-sm font-medium">{a.name}</span></td>
                    <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[a.type]}`}>{a.type}</span></td>
                    <td className="py-3 px-4 hidden sm:table-cell"><span className="text-gray-400 text-xs">{a.description}</span></td>
                    <td className="py-3 px-4 text-right"><span className="text-zn-300 text-sm font-medium">{a.leads.toLocaleString()}</span></td>
                    <td className="py-3 px-4 text-right hidden sm:table-cell"><span className="text-ai-400 text-sm">{a.conversionRate}%</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
