// =============================================================
// Footer — ZAIN branded site footer
// =============================================================
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-950/80 backdrop-blur-xl">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zn-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zn-500 to-ai-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">ZAIN</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              The future of business automation. AI-powered chatbots, voice agents, and lead generation
              that works 24/7 so you don't have to.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Showcase', 'Demos', 'Admin'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 text-sm hover:text-zn-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>hello@zain.agency</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ZAIN. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-2 md:mt-0">Built with React, Three.js & ❤️</p>
        </div>
      </div>
    </footer>
  );
}
