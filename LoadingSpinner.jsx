// =============================================================
// HeroSection — ZAIN branded landing page hero
// =============================================================
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GradientButton from '../ui/GradientButton';
import useStore from '../../store/useStore';

// Lazy load 3D scene for performance
const HeroScene = lazy(() => import('../3d/HeroScene'));

export default function HeroSection() {
  const { setCtaModalOpen } = useStore();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background (lazy loaded) */}
      <Suspense fallback={<div className="absolute inset-0 bg-dark-950" />}>
        <HeroScene />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-transparent to-dark-950 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center mb-8 px-4 py-2 rounded-full glass border border-zn-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-ai-500 mr-2 animate-pulse" />
          <span className="text-sm text-zn-200">Powered by Advanced AI</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-white">AI</span>{' '}
          <span className="gradient-text">Automation</span>
          <br />
          <span className="text-white">Agency</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Deploy intelligent chatbots, voice agents, and lead generation systems
          that work 24/7. Scale your business with the power of AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/demos">
            <GradientButton size="lg" variant="brand" className="shadow-glow-blue">
              🚀 Try Live Demo
            </GradientButton>
          </Link>
          <GradientButton
            variant="outline"
            size="lg"
            onClick={() => setCtaModalOpen(true)}
          >
            Get Your AI System →
          </GradientButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { label: 'Active Bots', value: '34+' },
            { label: 'Leads/Month', value: '12K+' },
            { label: 'Revenue', value: '$284K' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold gradient-text">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zn-400" />
        </div>
      </motion.div>
    </section>
  );
}
