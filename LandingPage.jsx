// =============================================================
// Navbar — ZAIN branded top navigation with glass effect
// =============================================================
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import useStore from '../../store/useStore';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/showcase', label: 'Showcase' },
  { path: '/demos', label: 'Demos' },
  { path: '/admin', label: 'Admin' },
];

const industries = [
  { value: 'default', label: '🌐 All Industries' },
  { value: 'restaurant', label: '🍽️ Restaurant' },
  { value: 'gym', label: '💪 Gym' },
  { value: 'clinic', label: '🏥 Clinic' },
  { value: 'realestate', label: '🏠 Real Estate' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { selectedIndustry, setIndustry } = useStore();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zn-500 to-ai-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="font-heading font-bold text-xl text-white group-hover:text-zn-300 transition-colors">
              ZAIN
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-zn-500/20 rounded-lg border border-zn-500/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Industry Selector + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <select
              value={selectedIndustry}
              onChange={(e) => setIndustry(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-zn-500/50 appearance-none cursor-pointer"
            >
              {industries.map(ind => (
                <option key={ind.value} value={ind.value} className="bg-gray-900">{ind.label}</option>
              ))}
            </select>

            <Link
              to="/demos"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-zn-500 to-ai-500 text-white text-sm font-semibold hover:shadow-glow-blue transition-all duration-300 hover:-translate-y-0.5"
            >
              Try Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Industry selector mobile */}
              <select
                value={selectedIndustry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-2 cursor-pointer"
              >
                {industries.map(ind => (
                  <option key={ind.value} value={ind.value} className="bg-gray-900">{ind.label}</option>
                ))}
              </select>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-white bg-zn-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
