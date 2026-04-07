// =============================================================
// App.jsx — ZAIN main application with global ChatWidget
// =============================================================
import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import CTAModal from './components/ui/CTAModal';

// Lazy load pages for performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ShowcasePage = lazy(() => import('./pages/ShowcasePage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Lazy load ChatWidget
const ChatWidget = lazy(() => import('./components/chat/ChatWidget'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark-950 relative">
      {/* Background glow effects */}
      <div className="page-glow" />

      {/* Navigation */}
      <Navbar />

      {/* Global Chat Widget (lazy loaded) */}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>

      {/* CTA Modal (conversion layer) */}
      <CTAModal />

      {/* Page Content */}
      <main className="relative z-10">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/demos" element={<DemoPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
