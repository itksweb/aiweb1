import React, { useState, useEffect } from 'react';
import { RoofLogo } from './RoofLogo';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface HeaderProps {
  activeTab: 'home' | 'properties' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'properties' | 'about' | 'contact') => void;
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: 'home' | 'properties' | 'about' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: 'home' | 'properties' | 'about' | 'contact') => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
            : 'bg-white/90 backdrop-blur-xs border-b border-slate-100 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: 3 zones separated by gap-8 */}
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1b5e43] rounded-sm transition-opacity hover:opacity-90 cursor-pointer"
              aria-label="Roof Real Estate Home"
            >
              <RoofLogo variant="dark" size="md" />
            </button>

            {/* Zone 2: Navigation Links (single-line, clean text with hover underline) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'text-[#0e382c] font-semibold'
                      : 'text-slate-600 hover:text-[#0e382c]'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1b5e43] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Zone 3: 1 Primary Action & Call link */}
            <div className="hidden lg:flex items-center gap-5 shrink-0">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#0e382c] transition-colors"
                title="Direct Phone Line"
              >
                <div className="w-8 h-8 rounded-full bg-[#f0f5f2] text-[#1b5e43] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Direct Line</span>
                  <span className="font-semibold text-slate-900 tabular-nums">{COMPANY_INFO.phone}</span>
                </div>
              </a>

              <button
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0e382c] hover:bg-[#1b5e43] rounded-lg transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>Get In Touch</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => handleNavClick('contact')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0e382c] rounded-md"
              >
                Contact
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#0e382c] focus:outline-hidden cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-xl z-30 transition-all">
          <div className="px-6 py-5 space-y-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-base py-2 font-medium transition-colors cursor-pointer border-b border-slate-100 flex items-center justify-between ${
                    activeTab === item.id ? 'text-[#1b5e43] font-bold' : 'text-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#f0f5f2] text-[#0e382c]"
              >
                <Phone className="w-4 h-4 text-[#1b5e43]" />
                <div className="text-xs">
                  <span className="block text-slate-500">Call Us Anytime</span>
                  <span className="font-bold text-slate-900 tabular-nums">{COMPANY_INFO.phone}</span>
                </div>
              </a>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-[#0e382c] hover:bg-[#1b5e43] rounded-lg transition-colors cursor-pointer"
            >
              Get In Touch With Owner
            </button>
          </div>
        </div>
      )}
    </>
  );
};
