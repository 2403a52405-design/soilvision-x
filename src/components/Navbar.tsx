import React, { useState } from 'react';
import { Sprout, Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Project' },
    { id: 'classify', label: 'Soil Classification' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'model-info', label: 'Model Information' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left text-emerald-950 font-bold text-xl tracking-tight whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-100 flex items-center justify-center shadow-xs">
              <Sprout className="w-5 h-5 text-emerald-100" />
            </div>
            <span className="font-semibold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors">
              SoilVision<span className="text-emerald-700 font-extrabold">-X</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (single line, clean text links) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 text-sm ${
                    isActive
                      ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                      : 'hover:text-slate-900 text-slate-600'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('classify')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 active:bg-emerald-950 transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <Cpu className="w-4 h-4 text-emerald-200" />
              <span>Start Classification</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-stone-200/60 focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-stone-100 rounded-md"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('classify')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900"
            >
              <Cpu className="w-4 h-4" />
              <span>Start Classification</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
