import { Gamepad2, User, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Gamepad2 className="w-8 h-8 text-[var(--neon-cyan)] relative z-10" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              CROSSPLAY
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('landing')}
              className={`transition-colors ${currentPage === 'landing' ? 'text-[var(--neon-cyan)]' : 'text-gray-400 hover:text-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`transition-colors ${currentPage === 'dashboard' ? 'text-[var(--neon-cyan)]' : 'text-gray-400 hover:text-white'}`}
            >
              Book Now
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`transition-colors ${currentPage === 'admin' ? 'text-[var(--neon-cyan)]' : 'text-gray-400 hover:text-white'}`}
            >
              Admin
            </button>
            <button className="p-2 rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] hover:shadow-lg hover:shadow-[var(--neon-cyan)]/50 transition-all">
              <User className="w-5 h-5 text-[#0a0a0f]" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-3 border-t border-[var(--glass-border)]">
            <button
              onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:text-[var(--neon-cyan)] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:text-[var(--neon-cyan)] transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:text-[var(--neon-cyan)] transition-colors"
            >
              Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
