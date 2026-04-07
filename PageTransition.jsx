// =============================================================
// RevenueChart — ZAIN branded revenue area chart
// =============================================================
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg p-3 border border-white/10">
        <p className="text-white font-semibold text-sm mb-1">{label}</p>
        <p className="text-zn-300 text-sm">Revenue: ${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ data }) {
  return (
    <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-heading font-semibold text-lg">Revenue Overview</h3>
          <p className="text-gray-400 text-sm mt-1">Monthly revenue trend</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-ai-500/10 border border-ai-500/20 text-ai-500 text-xs font-medium">+23.4% YoY</div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0A84FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#0A84FF" strokeWidth={2} fill="url(#revenueGradient)" dot={{ fill: '#0A84FF', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#1a8cff', stroke: '#0A84FF', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
