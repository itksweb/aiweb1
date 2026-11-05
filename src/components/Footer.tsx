import React from 'react';
import { RoofLogo } from './RoofLogo';
import { COMPANY_INFO } from '../data/company';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'home' | 'properties' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#09261e] text-slate-300 border-t border-[#134e4a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <RoofLogo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed max-w-sm">
              {COMPANY_INFO.aboutText}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={COMPANY_INFO.socialUrls.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1b5e43] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialUrls.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1b5e43] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialUrls.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1b5e43] text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialUrls.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1b5e43] text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[11px] text-slate-400">
              Social Media: <span className="text-emerald-300 font-medium">{COMPANY_INFO.socialHandle}</span> (Flyer placeholder)
            </div>
          </div>

          {/* Quick Navigation (Col 5-7) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Owner
                </button>
              </li>
            </ul>
          </div>

          {/* Property Types (Col 8-9) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Residential Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavClick('properties')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>Modern Hillside Villas</span>
                  <ArrowRight className="w-3 h-3 text-[#1b5e43] group-hover:text-white transition-colors" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('properties')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>Duplex Models from $50,000</span>
                  <ArrowRight className="w-3 h-3 text-[#1b5e43] group-hover:text-white transition-colors" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('properties')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>Skyline & Coast Penthouses</span>
                  <ArrowRight className="w-3 h-3 text-[#1b5e43] group-hover:text-white transition-colors" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('properties')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>Architectural Courtyard Homes</span>
                  <ArrowRight className="w-3 h-3 text-[#1b5e43] group-hover:text-white transition-colors" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="tabular-nums font-semibold">{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Roof Real Estate. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            website by{' '}
            <a
              href="https://wa.me/234806071998"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2 transition-colors font-medium"
            >
              itksweb
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
