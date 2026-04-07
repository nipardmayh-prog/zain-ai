// =============================================================
// LeadsChart — ZAIN branded leads bar chart
// =============================================================
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg p-3 border border-white/10">
        <p className="text-white font-semibold text-sm mb-1">{label}</p>
        <p className="text-ai-500 text-sm">Leads: {payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function LeadsChart({ data }) {
  return (
    <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-heading font-semibold text-lg">Leads Generated</h3>
          <p className="text-gray-400 text-sm mt-1">Monthly lead acquisition</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-ai-500/10 border border-ai-500/20 text-ai-500 text-xs font-medium">+18.7% MoM</div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FFB2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00FFB2" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="leads" fill="url(#leadsGradient)" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
