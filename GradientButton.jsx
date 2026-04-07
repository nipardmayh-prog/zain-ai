// =============================================================
// CTASection — ZAIN branded CTA
// =============================================================
import { motion } from 'framer-motion';
import GradientButton from '../ui/GradientButton';
import useStore from '../../store/useStore';

export default function CTASection() {
  const { setCtaModalOpen } = useStore();

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-800/20 to-dark-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zn-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-ai-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="w-20 h-1 bg-gradient-to-r from-zn-500 to-ai-500 mx-auto mb-8 rounded-full" />

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Ready to </span>
            <span className="gradient-text-alt">10x Your Growth</span>
            <span className="text-white">?</span>
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Join 500+ businesses that have automated their operations with ZAIN.
            Start for free, scale when you're ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton size="lg" variant="brand" className="shadow-glow-green" onClick={() => setCtaModalOpen(true)}>
              🎯 Get Your AI System
            </GradientButton>
            <GradientButton size="lg" variant="outline" onClick={() => window.location.href = '/showcase'}>
              See How It Works
            </GradientButton>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
            <span>✓ No credit card required</span>
            <span>✓ 14-day free trial</span>
            <span>✓ Cancel anytime</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
