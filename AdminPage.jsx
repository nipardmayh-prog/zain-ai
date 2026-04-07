// =============================================================
// ServicesSection — ZAIN branded services showcase
// =============================================================
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from '../ui/GlassCard';
import { HiChatAlt2, HiPhone, HiLightningBolt, HiChartBar, HiCog, HiGlobe } from 'react-icons/hi';

const services = [
  { icon: <HiChatAlt2 className="text-3xl" />, title: 'AI Chatbots', description: 'Deploy intelligent conversational agents that capture leads, handle support, and book appointments automatically.', color: 'from-zn-500 to-zn-700', stats: '12,800 conversations/mo' },
  { icon: <HiPhone className="text-3xl" />, title: 'Voice Agents', description: 'Human-like voice AI that handles inbound and outbound calls, sets appointments, and qualifies leads.', color: 'from-ai-500 to-ai-700', stats: '5,600 calls handled' },
  { icon: <HiLightningBolt className="text-3xl" />, title: 'Lead Generation', description: 'AI-powered lead scraping and qualification from LinkedIn, email outreach, and social platforms.', color: 'from-zn-400 to-ai-500', stats: '4,200 leads/mo' },
  { icon: <HiChartBar className="text-3xl" />, title: 'Analytics Dashboard', description: 'Real-time insights into your automation performance with actionable metrics and reporting.', color: 'from-ai-600 to-ai-800', stats: 'Real-time tracking' },
  { icon: <HiCog className="text-3xl" />, title: 'Workflow Automation', description: 'Connect your tools and automate repetitive tasks with intelligent workflow builders.', color: 'from-zn-600 to-zn-800', stats: '89% time saved' },
  { icon: <HiGlobe className="text-3xl" />, title: 'Multi-Channel', description: 'Deploy across web, WhatsApp, Instagram, Facebook, SMS, and phone — all from one platform.', color: 'from-zn-500 to-ai-500', stats: '6+ channels' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zn-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-zn-400 font-semibold text-sm uppercase tracking-widest">Our Services</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">Everything You Need to </span>
            <span className="gradient-text">Automate</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">From chatbots to voice agents, our AI solutions handle your entire customer journey.</p>
        </motion.div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants}>
              <GlassCard className="h-full group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zn-300">{service.stats}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
